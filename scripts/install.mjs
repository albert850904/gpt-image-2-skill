import fs   from "fs";
import path from "path";
import os   from "os";
import { fileURLToPath } from "url";

const ROOT      = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HOME      = os.homedir();
const SKILL_SRC = path.join(ROOT, "agents", "skills", "gpt-image-2-combined");
const SKILL_DST = path.join(HOME, ".claude", "skills", "gpt-image-2-combined");
const ENV_DIR   = path.join(HOME, ".gpt-image-2");
const ENV_FILE  = path.join(ENV_DIR, ".env");

// Claude Code config location (cross-platform)
const CLAUDE_CONFIG = path.join(HOME, ".claude.json");

// ── Utils ─────────────────────────────────────────────────────────────────────
function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dst, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function readJson(file) {
  try { return JSON.parse(fs.readFileSync(file, "utf8")); }
  catch { return {}; }
}

function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n", "utf8");
}

function ok(msg)   { console.log(`  ✓  ${msg}`); }
function info(msg) { console.log(`     ${msg}`); }
function warn(msg) { console.log(`  ⚠  ${msg}`); }

// ── The npx command that starts the MCP server ──────────────────────────────
// Claude Code runs this whenever a conversation uses the MCP tool.
function mcpCommand() {
  // After `npm install -g` or `npx`, the package is resolvable by name.
  // For a local clone, fall back to the absolute path of cli.mjs.
  return {
    command: "npx",
    args: ["-y", "gpt-image-2-combined", "mcp"],
  };
}

// ── Install steps ─────────────────────────────────────────────────────────────
export async function install() {
  console.log("\n🚀  GPT-Image-2 Combined — install\n");

  // 1. Skill files → ~/.claude/skills/
  console.log("1/4  Copying Skill files…");
  if (!fs.existsSync(SKILL_SRC)) {
    warn(`Skill source not found: ${SKILL_SRC}`);
    warn("Re-clone the repo and try again.");
    process.exit(1);
  }
  copyDir(SKILL_SRC, SKILL_DST);
  ok(`Skill installed → ${SKILL_DST}`);

  // 2. Register MCP in ~/.claude.json
  console.log("2/4  Registering MCP server in ~/.claude.json…");
  const cfg = readJson(CLAUDE_CONFIG);
  cfg.mcpServers = cfg.mcpServers ?? {};
  cfg.mcpServers["gpt-image-2-combined"] = mcpCommand();
  writeJson(CLAUDE_CONFIG, cfg);
  ok(`MCP registered in ${CLAUDE_CONFIG}`);

  // 3. Create ~/.gpt-image-2/.env if missing
  console.log("3/4  Setting up API key file…");
  fs.mkdirSync(ENV_DIR, { recursive: true });
  if (!fs.existsSync(ENV_FILE)) {
    const example = path.join(ROOT, ".env.example");
    if (fs.existsSync(example)) fs.copyFileSync(example, ENV_FILE);
    else fs.writeFileSync(ENV_FILE, "OPENAI_API_KEY=\n# GPT_IMAGE_MODEL=gpt-image-alpha\n# GPT_IMAGE_OUTPUT_DIR=\n");
    ok(`Created ${ENV_FILE}`);
    warn("Add your OPENAI_API_KEY to that file before generating images.");
  } else {
    ok(`Env file already exists: ${ENV_FILE}`);
    info("Make sure OPENAI_API_KEY is set.");
  }

  // 4. Codex skill (optional — only if ~/.codex exists)
  console.log("4/4  Checking for Codex…");
  const codexDir = path.join(HOME, ".codex", "skills", "gpt-image-2-combined");
  if (fs.existsSync(path.join(HOME, ".codex"))) {
    copyDir(SKILL_SRC, codexDir);
    ok(`Codex skill installed → ${codexDir}`);
  } else {
    info("~/.codex not found — skipping Codex skill (install Codex CLI first if needed).");
  }

  console.log(`
✅  Done!

  Restart Claude Code, then type:
    /gpt-image-2-combined    ← Skill (prompt engineering)
    generate_image(...)      ← MCP tool (actual image generation)

  API key file: ${ENV_FILE}
`);
}
