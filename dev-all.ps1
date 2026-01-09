<#
dev-all.ps1
USAGE:
  .\dev-all.ps1                    # Runs everything (YAML fix, plugin check, serve)
  .\dev-all.ps1 --skip-lint        # Skip YAML cleanup + linting
  .\dev-all.ps1 --no-serve         # Don't start local server
  .\dev-all.ps1 --quick            # Skip plugin check + linting (just serve)
  .\dev-all.ps1 --strict           # Run mkdocs build --strict before serve
#>

param (
  [switch]$skipLint,
  [switch]$noServe,
  [switch]$quick,
  [switch]$strict
)

Write-Host "`n[🚀] Starting MkDocs dev-all pipeline..." -ForegroundColor Cyan

# 🧼 YAML Fixing (unless skipped)
if (-not $skipLint -and -not $quick) {
  Write-Host "`n🧹 Fixing mkdocs.yml line endings and whitespace..." -ForegroundColor Yellow
  $yamlPath = "mkdocs.yml"
  if (Test-Path $yamlPath) {
    $content = Get-Content $yamlPath | ForEach-Object { $_.TrimEnd() }
    $content | Set-Content -Encoding utf8 $yamlPath
    Write-Host "✅ YAML fix complete." -ForegroundColor Green
  } else {
    Write-Host "❌ mkdocs.yml not found." -ForegroundColor Red
  }
}

# ✅ Venv activation
$venvPath = "$env:USERPROFILE\venv"
$activate = "$venvPath\Scripts\Activate.ps1"

if (-not ($env:VIRTUAL_ENV) -and (Test-Path $activate)) {
  Write-Host "`n💡 Activating virtual environment..." -ForegroundColor Cyan
  & $activate
} else {
  Write-Host "🔍 Venv already active or activation script missing." -ForegroundColor Gray
}

# 🔍 Plugin check
if (-not $quick) {
  $requiredPlugins = @(
    "quizdown",
    "search",
    "literate-nav",
    "mkdocs-video",
    "autolinks"
  )

  Write-Host "`n🔎 Validating MkDocs plugin registration..." -ForegroundColor Cyan
  $registeredPlugins = python -c "import pkg_resources; print([ep.name for ep in pkg_resources.iter_entry_points('mkdocs.plugins')])"

  foreach ($plugin in $requiredPlugins) {
    if ($registeredPlugins -match $plugin) {
      Write-Host "✅ Plugin '$plugin' is registered." -ForegroundColor Green
    } else {
      Write-Host "❌ Plugin '$plugin' is MISSING!" -ForegroundColor Red
    }
  }
}

# 🧪 Lint mkdocs.yml
if (-not $skipLint -and -not $quick) {
  if (Get-Command yamllint -ErrorAction SilentlyContinue) {
    Write-Host "`n📘 Running yamllint on mkdocs.yml..." -ForegroundColor Cyan
    yamllint ./mkdocs.yml
  } else {
    Write-Host "`n⚠️ yamllint not installed. Skipping lint." -ForegroundColor Yellow
  }
}

# 🧱 Strict build check
if ($strict) {
  Write-Host "`n🔍 Running mkdocs build --strict..." -ForegroundColor Yellow
  mkdocs build --strict
  if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Strict build failed. Aborting." -ForegroundColor Red
    exit 1
  } else {
    Write-Host "✅ Strict build passed." -ForegroundColor Green
  }
}

# 🚀 Serve site
if (-not $noServe) {
  Write-Host "`n🚀 Starting local dev server at http://127.0.0.1:8000 ..." -ForegroundColor Green
  mkdocs serve
} else {
  Write-Host "`n⏭️ Skipping server launch as requested." -ForegroundColor Yellow
}
