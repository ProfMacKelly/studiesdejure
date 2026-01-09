<#
fix-yaml.ps1
────────────────────────────────────────────────────────────
Normalizes mkdocs.yml formatting:
- CRLF → LF
- Removes trailing whitespace
- Preserves UTF-8
#>

$yamlPath = "mkdocs.yml"

if (-not (Test-Path $yamlPath)) {
  Write-Host "❌ mkdocs.yml not found." -ForegroundColor Red
  exit 1
}

Write-Host "`n🧹 Cleaning mkdocs.yml..." -ForegroundColor Cyan

$raw = Get-Content $yamlPath -Raw -Encoding UTF8
$raw = $raw -replace "`r", ""
$lines = $raw -split "`n" | ForEach-Object { $_.TrimEnd() }

Set-Content -Path $yamlPath -Value ($lines -join "`n") -Encoding UTF8 -NoNewline

Write-Host "✅ mkdocs.yml cleaned successfully." -ForegroundColor Green
