#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import os from "os";

// ── Load ~/.gpt-image-2/.env ─────────────────────────────────────────────────
const envFile = path.join(os.homedir(), ".gpt-image-2", ".env");
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const eq = line.indexOf("=");
    if (eq > 0 && !line.trimStart().startsWith("#")) {
      const key = line.slice(0, eq).trim();
      const val = line.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
      if (key && !(key in process.env)) process.env[key] = val;
    }
  }
}

// ── Config ───────────────────────────────────────────────────────────────────
// Verify exact model name at: https://platform.openai.com/docs/models
const MODEL      = process.env.GPT_IMAGE_MODEL      ?? "gpt-image-alpha";
const OUTPUT_DIR = process.env.GPT_IMAGE_OUTPUT_DIR ?? path.join(os.homedir(), "Pictures", "gpt-image-2");

// ── Helpers ───────────────────────────────────────────────────────────────────
function getClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error(
      "OPENAI_API_KEY not set.\n" +
      `Add it to ${path.join(os.homedir(), ".gpt-image-2", ".env")}`
    );
  }
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
}

async function downloadImage(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: ${res.status} ${res.statusText}`);
  const buf = await res.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(buf));
}

// ── MCP Server ────────────────────────────────────────────────────────────────
const server = new Server(
  { name: "gpt-image-2-combined", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "generate_image",
      description:
        "Generate an image with GPT-Image-2. " +
        "Use /gpt-image-2-combined first to craft a production-ready prompt, " +
        "then call this tool to produce the actual image. " +
        "Returns the saved local file path and the CDN URL.",
      inputSchema: {
        type: "object",
        properties: {
          prompt: {
            type: "string",
            description: "Full image-generation prompt (production-ready).",
          },
          size: {
            type: "string",
            enum: ["1024x1024", "1536x1024", "1024x1536"],
            description: "Output dimensions. Default: 1024x1024.",
          },
          quality: {
            type: "string",
            enum: ["standard", "hd"],
            description: "Image quality. Default: standard.",
          },
          filename: {
            type: "string",
            description: "Optional base filename (no extension). Auto-timestamped if omitted.",
          },
        },
        required: ["prompt"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== "generate_image") {
    throw new Error(`Unknown tool: ${request.params.name}`);
  }

  const {
    prompt,
    size = "1024x1024",
    quality = "standard",
    filename,
  } = request.params.arguments;

  const client = getClient();

  const response = await client.images.generate({
    model: MODEL,
    prompt,
    n: 1,
    size,
    quality,
    response_format: "url",
  });

  const url          = response.data[0].url;
  const revisedPrompt = response.data[0].revised_prompt ?? null;

  // Save locally
  ensureDir(OUTPUT_DIR);
  const baseName = filename ?? `img-${timestamp()}`;
  const dest     = path.join(OUTPUT_DIR, `${baseName}.png`);
  await downloadImage(url, dest);

  const lines = [
    `Image generated successfully.`,
    ``,
    `File : ${dest}`,
    `URL  : ${url}`,
    `Size : ${size}   Quality: ${quality}`,
  ];
  if (revisedPrompt && revisedPrompt !== prompt) {
    lines.push(``, `Revised prompt: ${revisedPrompt}`);
  }

  return { content: [{ type: "text", text: lines.join("\n") }] };
});

const transport = new StdioServerTransport();
await server.connect(transport);
