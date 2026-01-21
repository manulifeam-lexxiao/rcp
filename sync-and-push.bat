@echo off
chcp 65001 >nul
echo ========================================
echo 数据同步并推送脚本
echo ========================================
echo.

echo [1/4] 正在执行数据同步...
call npm run sync
if %errorlevel% neq 0 (
    echo 错误: npm run sync 执行失败
    pause
    exit /b %errorlevel%
)
echo 数据同步完成!
echo.

echo [2/4] 正在添加更改到 Git...
git add .
if %errorlevel% neq 0 (
    echo 错误: git add 执行失败
    pause
    exit /b %errorlevel%
)
echo Git add 完成!
echo.

echo [3/4] 正在提交更改...
for /f "tokens=1-6 delims=/-:. " %%a in ("%date% %time%") do (
    set "timestamp=%%a-%%b-%%c %%d:%%e:%%f"
)
git commit -m "* data %timestamp%"
if %errorlevel% neq 0 (
    if %errorlevel% equ 1 (
        echo 提示: 没有更改需要提交
    ) else (
        echo 错误: git commit 执行失败
        pause
        exit /b %errorlevel%
    )
) else (
    echo Git commit 完成!
)
echo.

echo [4/4] 正在推送到远程仓库...
git push
if %errorlevel% neq 0 (
    echo 错误: git push 执行失败
    pause
    exit /b %errorlevel%
)
echo Git push 完成!
echo.

echo ========================================
echo 所有操作已成功完成!
echo ========================================
pause
