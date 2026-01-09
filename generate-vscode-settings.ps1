<#
generate-vscode-settings.ps1
────────────────────────────────────────────────────────────
Creates a recommended .vscode/settings.json for consistent
MkDocs, Python, and line-ending behavior.

USAGE:
  .\generate-vscode-settings.ps1
#>

$settingsDir = ".vscode"
$settingsFile = "$settingsDir\settings.json"

# Settings JSON block
$recommended = @'
{
  "files.eol": "\n",
  "editor.trimAutoWhitespace": true,
  "editor.renderWhitespace": "boundary",
  "python.defaultInterpreterPath": "${env:USERPROFILE}/venv/Scripts/python.exe",
  "python.terminal.activateEnvironment": true
}
'@

# Ensure .vscode folder exists
if (-not (Test-Path $settingsDir)) {
  New-Item -ItemType Directory -Path $settingsDir | Out-Null
  Write-Host "📁 Created .vscode folder" -ForegroundColor Green
}

# Check if settings.json already exists
if (Test-Path $settingsFile) {
  Write-Host "⚠️ .vscode/settings.json already exists." -ForegroundColor Yellow
  $overwrite = Read-Host "❓ Overwrite existing settings.json? (y/n)"
  if ($overwrite -ne "y") {
    Write-Host "⏭️ Skipping settings.json creation." -ForegroundColor Yellow
    exit 0
  }
}

# Write the recommended settings
$recommended | Set-Content -Path $settingsFile -Encoding UTF8
Write-Host "✅ .vscode/settings.json created with recommended settings." -ForegroundColor Cyan
