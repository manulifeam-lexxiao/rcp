# 设置错误时停止执行
$ErrorActionPreference = "Stop"

Write-Host "========================================"
Write-Host "数据同步并推送脚本"
Write-Host "========================================"
Write-Host ""

try {
    Write-Host "[1/4] 正在执行数据同步..." -ForegroundColor Cyan
    npm run sync
    if ($LASTEXITCODE -ne 0) {
        throw "npm run sync 执行失败"
    }
    Write-Host "数据同步完成!" -ForegroundColor Green
    Write-Host ""

    Write-Host "[2/4] 正在添加更改到 Git..." -ForegroundColor Cyan
    git add .
    if ($LASTEXITCODE -ne 0) {
        throw "git add 执行失败"
    }
    Write-Host "Git add 完成!" -ForegroundColor Green
    Write-Host ""

    Write-Host "[3/4] 正在提交更改..." -ForegroundColor Cyan
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $commitMessage = "* data $timestamp"
    git commit -m $commitMessage
    if ($LASTEXITCODE -eq 1) {
        Write-Host "提示: 没有更改需要提交" -ForegroundColor Yellow
    } elseif ($LASTEXITCODE -ne 0) {
        throw "git commit 执行失败"
    } else {
        Write-Host "Git commit 完成!" -ForegroundColor Green
    }
    Write-Host ""

    Write-Host "[4/4] 正在推送到远程仓库..." -ForegroundColor Cyan
    git push
    if ($LASTEXITCODE -ne 0) {
        throw "git push 执行失败"
    }
    Write-Host "Git push 完成!" -ForegroundColor Green
    Write-Host ""

    Write-Host "========================================"
    Write-Host "所有操作已成功完成!" -ForegroundColor Green
    Write-Host "========================================"
} catch {
    Write-Host ""
    Write-Host "错误: $_" -ForegroundColor Red
    Write-Host "操作已中止" -ForegroundColor Red
    exit 1
}
