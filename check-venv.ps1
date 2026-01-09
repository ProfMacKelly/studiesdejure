# check-venv.ps1

$expectedVenv = "$env:USERPROFILE\venv"

Write-Host "`n[🧪] Checking Python virtual environment..."

$pythonPath = python -c "import sys; print(sys.prefix)" 2>$null

Write-Host "Expected venv path: $expectedVenv"
Write-Host "Current Python path: $pythonPath"

if ($pythonPath -eq $expectedVenv) {
    Write-Host "`n✅ Virtual environment is active and correct."
    Write-Host "🚀 Launching MkDocs server at http://127.0.0.1:8000 ..."
    mkdocs serve
}
else {
    Write-Host "`n❌ You're NOT in the correct virtual environment!"
    Write-Host "👉 Expected: $expectedVenv"
    Write-Host "👉 Found:    $pythonPath"
    Write-Host "`n💡 To activate it, run:"
    Write-Host "   C:\Users\mmack.000\venv\Scripts\Activate.ps1"
}
