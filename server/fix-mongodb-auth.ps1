# fix-mongodb-auth.ps1
# Run this script ONCE as Administrator (Right-click -> Run with PowerShell as Admin)
# It will:
#   1. Stop MongoDB service
#   2. Temporarily disable auth in mongod.cfg
#   3. Start MongoDB without auth
#   4. Create the portfolio database user
#   5. Re-enable auth in mongod.cfg
#   6. Restart MongoDB normally

$cfgPath = "C:\Program Files\MongoDB\Server\8.0\bin\mongod.cfg"
$nodeScript = "$PSScriptRoot\createUser.js"
$serverDir = $PSScriptRoot

Write-Host "=== MongoDB Portfolio User Setup ===" -ForegroundColor Cyan

# Step 1: Stop MongoDB service
Write-Host "`n[1/6] Stopping MongoDB service..." -ForegroundColor Yellow
Stop-Service -Name MongoDB -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 3

# Step 2: Disable auth temporarily
Write-Host "[2/6] Temporarily disabling auth in mongod.cfg..." -ForegroundColor Yellow
$cfg = Get-Content $cfgPath -Raw
$cfgNoAuth = $cfg -replace 'security:\s*\r?\n\s*authorization:\s*enabled', "#security:`r`n  #authorization: enabled"
$cfgNoAuth | Set-Content $cfgPath -Encoding UTF8
Write-Host "      Auth disabled."

# Step 3: Start MongoDB without auth
Write-Host "[3/6] Starting MongoDB without auth..." -ForegroundColor Yellow
Start-Service -Name MongoDB
Start-Sleep -Seconds 5

# Step 4: Create portfolio user
Write-Host "[4/6] Creating portfolio database user..." -ForegroundColor Yellow
Push-Location $serverDir
$result = & node createUser.js 2>&1
Write-Host $result -ForegroundColor Green
Pop-Location

# Step 5: Re-enable auth
Write-Host "[5/6] Re-enabling auth in mongod.cfg..." -ForegroundColor Yellow
$cfgBack = Get-Content $cfgPath -Raw
$cfgBack = $cfgBack -replace '#security:\s*\r?\n\s*#authorization:\s*enabled', "security:`r`n  authorization: enabled"
$cfgBack | Set-Content $cfgPath -Encoding UTF8
Write-Host "      Auth re-enabled."

# Step 6: Restart MongoDB with auth
Write-Host "[6/6] Restarting MongoDB with auth..." -ForegroundColor Yellow
Stop-Service -Name MongoDB -Force
Start-Sleep -Seconds 3
Start-Service -Name MongoDB
Start-Sleep -Seconds 3

Write-Host "`n=== Done! ===" -ForegroundColor Green
Write-Host "Portfolio user created: portfolioUser / portfolioPass123" -ForegroundColor Cyan
Write-Host "`nNow update your server/.env file:" -ForegroundColor White
Write-Host "MONGO_URI=mongodb://portfolioUser:portfolioPass123@localhost:27017/portfolio" -ForegroundColor Yellow
Write-Host "`nThen run: npm run seed" -ForegroundColor White

Read-Host "`nPress Enter to exit"
