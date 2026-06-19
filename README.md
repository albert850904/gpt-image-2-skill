# gpt-image-2-skill

> GPT-Image-2 prompt skill + MCP server for Claude Code and Codex.  
> Describe your intent → get a production-ready prompt → generate the image, all in one conversation.

Synthesized from three community repos:
- [YouMind-OpenLab/awesome-gpt-image-2](https://github.com/YouMind-OpenLab/awesome-gpt-image-2) — 2000+ curated prompts
- [ZeroLu/awesome-gpt-image](https://github.com/ZeroLu/awesome-gpt-image) — top creator picks from X/Twitter
- [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2) — 470+ reverse-engineered cases, 20+ industrial templates

---

## Requirements

- [Node.js](https://nodejs.org) ≥ 18
- [Claude Code](https://claude.ai/code) (CLI or desktop)
- OpenAI API key with Images API access

---

## Installation

### Step 1 — Run the installer

```bash
npx gpt-image-2-combined install
```

This one command will:
- Copy the Skill to `~/.claude/skills/gpt-image-2-combined/`
- Register the MCP server in `~/.claude.json`
- Create `~/.gpt-image-2/.env` for your API key

### Step 2 — Add your OpenAI API key

Open `~/.gpt-image-2/.env` and fill in your key:

```bash
# ~/.gpt-image-2/.env
OPENAI_API_KEY=sk-...
```

> Don't have a key? Get one at [platform.openai.com/api-keys](https://platform.openai.com/api-keys).

### Step 3 — Restart Claude Code

The Skill and MCP server load on startup. Restart once after installation.

That's it. Verify the Skill is available by typing `/gpt-image-2-combined` in Claude Code.

---

## Usage

### Full flow (prompt → image in one conversation)

**1. Invoke the Skill to craft a prompt**

```
/gpt-image-2-combined 幫我做一張章魚的 Apple keynote 風格科普海報
```

The Skill will:
- Detect your intent and language
- Match the best template (`poster-nature-science` in this case)
- Fill in the 6-block structure (subject, composition, style, text, format, constraints)
- Output a production-ready, copyable prompt

**2. Generate the image via MCP**

Once you have the prompt, ask Claude to generate it:

```
用這個 prompt 生成圖片
```

Claude calls the `generate_image` MCP tool, which:
- Sends the prompt to OpenAI Images API (GPT-Image-2)
- Downloads the result
- Saves it to `~/Pictures/gpt-image-2/`
- Returns the local file path and CDN URL

**3. Done**

```
✅ Image generated and saved.

File : ~/Pictures/gpt-image-2/img-2025-06-19T10-30-00.png
URL  : https://...
Size : 1024x1536   Quality: standard
```

---

### Skill only (prompt engineering without image generation)

If you only need a well-crafted prompt to paste into ChatGPT or another tool:

```
/gpt-image-2-combined make a sports campaign poster for a running shoe brand
```

Copy the output prompt and use it anywhere.

---

### Template categories

| Category | Templates | Examples |
|----------|-----------|---------|
| UI & Interfaces | App, Dashboard, Social Screenshot, Live Stream | `ui-app-standard`, `ui-social-screenshot` |
| Infographics | Standard, Scale Diagram | `infographic-standard`, `infographic-scale-diagram` |
| Posters & Typography | Campaign, Sports, Typography, Ink Double Exposure, Science | `poster-sports-campaign`, `poster-nature-science` |
| Products & E-commerce | Hero shot, Detail page, Packaging | `product-commerce` |
| Brand & Logos | Identity, Touchpoint board | `brand-identity` |
| Photography | Realism, RAW phone, Candid street, 360 Panorama | `photo-raw-phone`, `photo-360-panorama` |
| Illustration & Art | Anime, Watercolor, Ink, Decorative | `illustration-art` |
| Characters | Design sheet, 3D collectible toy | `character-design-sheet` |
| Scenes & Storytelling | Storyboard, Narrative, Worldbuilding | `scene-storytelling` |
| Games & Entertainment | Game screenshot, Pixel art grid | `game-screenshot` |
| History & Classical | Scroll, Dynasty, Poetry visual | `history-classical` |
| Documents | White paper, Manual, Report page | `document-publishing` |
| Special Tricks | Micro text, Screen-shot effect, JSON agent format | `trick-micro-text` |

---

### MCP tool reference

The MCP server exposes one tool: `generate_image`.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `prompt` | string | required | Full image-generation prompt |
| `size` | string | `1024x1024` | `1024x1024` / `1536x1024` / `1024x1536` |
| `quality` | string | `standard` | `standard` or `hd` |
| `filename` | string | auto | Base filename without extension |

---

## Configuration

All config lives in `~/.gpt-image-2/.env`:

```bash
# Required
OPENAI_API_KEY=sk-...

# Optional — verify exact model name at platform.openai.com/docs/models
GPT_IMAGE_MODEL=gpt-image-alpha

# Optional — where generated images are saved
GPT_IMAGE_OUTPUT_DIR=/Users/you/Pictures/gpt-image-2
```

---

## What's inside

```
gpt-image-2-skill/
├── agents/skills/gpt-image-2-combined/
│   ├── SKILL.md                 ← Claude Skill (prompt engine)
│   ├── agents/
│   │   ├── openai.yaml          ← Codex agent spec
│   │   └── claude.yaml          ← Claude agent spec
│   └── references/
│       └── combined-tricks.md   ← All templates and tricks
├── mcp/
│   └── src/index.js             ← MCP server (calls OpenAI API)
├── scripts/
│   ├── cli.mjs                  ← npx entry point
│   └── install.mjs              ← install logic
├── .claude-plugin/
│   └── marketplace.json         ← Claude Code marketplace registration
├── .github/workflows/
│   ├── publish.yml              ← auto npm publish on git tag
│   └── test.yml                 ← cross-platform install test
└── .env.example                 ← API key template
```

---

## Manual installation (alternative)

If you prefer to clone and install locally:

```bash
git clone https://github.com/albert850904/gpt-image-2-skill.git
cd gpt-image-2-skill
npm install
npm run install:skill
```

---

## Releasing a new version

```bash
# bump version in package.json, then:
git tag v1.0.1 && git push --tags
```

GitHub Actions publishes to npm automatically on every tag push.

---

## Credits

| Repo | Contribution |
|------|-------------|
| [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2) | Industrial templates, 6-block structure, JSON agent format, Skill architecture |
| [ZeroLu/awesome-gpt-image](https://github.com/ZeroLu/awesome-gpt-image) | RAW photo tricks, game screenshot tricks, special effect prompts |
| [YouMind-OpenLab/awesome-gpt-image-2](https://github.com/YouMind-OpenLab/awesome-gpt-image-2) | Full category coverage, multi-language prompt examples |

---

## License

MIT
