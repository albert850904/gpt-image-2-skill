#!/usr/bin/env node
/**
 * Entry point for `npx gpt-image-2-combined <command>`
 *
 *   install   — install Skill + register MCP in Claude Code config
 *   mcp       — start the MCP server (used by Claude Code)
 */
const command = process.argv[2];

if (command === "install") {
  const { install } = await import("./install.mjs");
  await install();
} else if (command === "mcp") {
  // Delegate to the MCP server; keep import path relative so npx resolves it
  await import("../mcp/src/index.js");
} else {
  console.log(`
Usage:
  npx gpt-image-2-combined install   Install Skill + register MCP server
  npx gpt-image-2-combined mcp       Start MCP server (called by Claude Code)
`);
  process.exit(1);
}
