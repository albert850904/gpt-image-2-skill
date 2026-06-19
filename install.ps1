# Install GPT-Image-2 Combined Skill for Claude Code (and optionally Codex)
# Run from the skill directory:  .\install.ps1

$ErrorActionPreference = "Stop"

$scriptDir  = Split-Path -Parent $MyInvocation.MyCommand.Path
$skillSrc   = Join-Path $scriptDir "agents\skills\gpt-image-2-combined"
$skillDst   = Join-Path $env:USERPROFILE ".claude\skills\gpt-image-2-combined"
$envDir     = Join-Path $env:USERPROFILE ".gpt-image-2"
$envFile    = Join-Path $envDir ".env"
$envExample = Join-Path $scriptDir ".env.example"
$claudeJson = Join-Path $env:USERPROFILE ".claude.json"

function Copy-Dir($src, $dst) {
    New-Item -ItemType Directory -Force -Path $dst | Out-Null
    foreach ($item in Get-ChildItem -Path $src -Force) {
        $target = Join-Path $dst $item.Name
        if ($item.PSIsContainer) { Copy-Dir $item.FullName $target }
        else { Copy-Item $item.FullName $target -Force }
    }
}

Write-Host ""
Write-Host "  GPT-Image-2 Combined -- install" -ForegroundColor Cyan
Write-Host ""

# 1. Skill files -> ~/.claude/skills/
Write-Host "1/4  Copying Skill files..."
if (-not (Test-Path $skillSrc)) {
    Write-Host "  [ERROR] Skill source not found: $skillSrc" -ForegroundColor Red
    Write-Host "          Re-clone the repo and try again." -ForegroundColor Red
    exit 1
}
Copy-Dir $skillSrc $skillDst
Write-Host "  [OK] Skill installed -> $skillDst" -ForegroundColor Green

# 2. Register MCP server in ~/.claude.json
Write-Host "2/4  Registering MCP server in ~/.claude.json..."
$cfg = @{}
if (Test-Path $claudeJson) {
    try { $cfg = (Get-Content $claudeJson -Raw | ConvertFrom-Json) } catch {}
}
if (-not $cfg.PSObject.Properties["mcpServers"]) {
    $cfg | Add-Member -NotePropertyName "mcpServers" -NotePropertyValue ([PSCustomObject]@{}) -Force
}
$mcpEntry = [PSCustomObject]@{
    command = "npx"
    args    = @("-y", "gpt-image-2-combined", "mcp")
}
$cfg.mcpServers | Add-Member -NotePropertyName "gpt-image-2-combined" -NotePropertyValue $mcpEntry -Force
$cfg | ConvertTo-Json -Depth 10 | Set-Content $claudeJson -Encoding utf8
Write-Host "  [OK] MCP registered in $claudeJson" -ForegroundColor Green

# 3. Create ~/.gpt-image-2/.env if missing
Write-Host "3/4  Setting up API key file..."
New-Item -ItemType Directory -Force -Path $envDir | Out-Null
if (-not (Test-Path $envFile)) {
    if (Test-Path $envExample) { Copy-Item $envExample $envFile -Force }
    else { Set-Content $envFile "OPENAI_API_KEY=`n# GPT_IMAGE_MODEL=gpt-image-alpha`n# GPT_IMAGE_OUTPUT_DIR=`n" -Encoding utf8 }
    Write-Host "  [OK] Created $envFile" -ForegroundColor Green
    Write-Host "  [!!] Add your OPENAI_API_KEY to that file before generating images." -ForegroundColor Yellow
} else {
    Write-Host "  [OK] Env file already exists: $envFile" -ForegroundColor Green
    Write-Host "       Make sure OPENAI_API_KEY is set."
}

# 4. Codex skill (optional -- only if ~/.codex exists)
Write-Host "4/4  Checking for Codex..."
$codexBase = Join-Path $env:USERPROFILE ".codex"
if (Test-Path $codexBase) {
    $codexDst = Join-Path $codexBase "skills\gpt-image-2-combined"
    Copy-Dir $skillSrc $codexDst
    Write-Host "  [OK] Codex skill installed -> $codexDst" -ForegroundColor Green
} else {
    Write-Host "       ~/.codex not found -- skipping Codex skill (install Codex CLI first if needed)."
}

Write-Host ""
Write-Host "  Done!" -ForegroundColor Green
Write-Host ""
Write-Host "  Restart Claude Code, then type:"
Write-Host "    /gpt-image-2-combined    <- Skill (prompt engineering)"
Write-Host "    generate_image(...)      <- MCP tool (actual image generation)"
Write-Host ""
Write-Host "  API key file: $envFile"
Write-Host ""
