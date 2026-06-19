# gpt-image-2-combined

GPT-Image-2 prompt skill + MCP server for Claude Code and Codex.

Synthesized from three community repos:
- [YouMind-OpenLab/awesome-gpt-image-2](https://github.com/YouMind-OpenLab/awesome-gpt-image-2)
- [ZeroLu/awesome-gpt-image](https://github.com/ZeroLu/awesome-gpt-image)
- [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2)

## Install

```bash
npx gpt-image-2-combined install
```

Then add your API key:

```
# ~/.gpt-image-2/.env
OPENAI_API_KEY=sk-...
```

Restart Claude Code. Done.

## Usage

In Claude Code:

```
/gpt-image-2-combined    ← craft a prompt from your intent
generate_image(...)      ← generate the actual image via MCP
```

## What's inside

| Component | Path | Purpose |
|-----------|------|---------|
| Claude Skill | `agents/skills/gpt-image-2-combined/SKILL.md` | Prompt engineering engine (13 categories, 20+ templates) |
| Codex Agent | `agents/skills/gpt-image-2-combined/agents/openai.yaml` | Codex CLI agent spec |
| MCP Server | `mcp/src/index.js` | Calls OpenAI Images API, saves output locally |
| Template Library | `agents/skills/gpt-image-2-combined/references/combined-tricks.md` | All prompting tricks |

## Requirements

- Node.js ≥ 18
- OpenAI API key with Images API access

## Publish a new version

```bash
git tag v1.0.1 && git push --tags
```

GitHub Actions will publish to npm automatically.

## License

MIT
