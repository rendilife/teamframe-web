@echo off
setlocal EnableExtensions DisableDelayedExpansion

set "REPO=C:\Users\Acer\Desktop\teamframe_web"
set "LAUNCHER=public\sektor_nula\SEKTOR_NULA_Launcher.zip"

cd /d "%REPO%" || goto :fail

git rev-parse --is-inside-work-tree >nul 2>&1 || goto :fail

if not exist "%LAUNCHER%" (
    echo ERROR: Launcher ZIP not found:
    echo %REPO%\%LAUNCHER%
    goto :fail
)

echo [1/5] Stage all website changes...
git add -A || goto :fail

rem A ZIP may be excluded by .gitignore. Explicitly include just this launcher.
git add -f -- "%LAUNCHER%" || goto :fail

echo [2/5] Review staged files...
git diff --cached --stat || goto :fail

git diff --cached --quiet
if errorlevel 2 goto :fail
if errorlevel 1 (
    echo [3/5] Commit changes...
    git commit -m "Website update - Sektor Nula launcher" || goto :fail
) else (
    echo [3/5] Nothing new to commit.
)

echo [4/5] Fetch and integrate latest GitHub main...
git fetch origin main || goto :fail
git rebase origin/main || goto :fail

echo [5/5] Push to GitHub main, including detached HEAD...
git push origin HEAD:refs/heads/main || goto :fail

echo.
echo ===== GITHUB PUSH SUCCESS =====
echo Website deployment must still be verified separately.
echo Target URL: https://teamframe.cz/sektor_nula/SEKTOR_NULA_Launcher.zip
pause
exit /b 0

:fail
echo.
echo ===== DEPLOY FAILED - NOT PUBLISHED =====
echo Do not force-push. Copy the exact error output for diagnosis.
pause
exit /b 1
