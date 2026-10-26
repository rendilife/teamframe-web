@echo off
setlocal EnableExtensions

REM TeamFrame deployment via GitHub (Vercel deploys after successful push).
set "PROJECT_DIR=C:\Users\Acer\Desktop\teamframe_web"

cd /d "%PROJECT_DIR%"
if errorlevel 1 goto :wrong_folder

git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 goto :not_git

set "CURRENT_BRANCH="
for /f "delims=" %%B in ('git branch --show-current') do set "CURRENT_BRANCH=%%B"
if /I not "%CURRENT_BRANCH%"=="main" goto :wrong_branch

echo.
echo ===== TEAMFRAME - GITHUB SYNC =====
echo.

echo [1/4] Saving local changes...
git add -A
if errorlevel 1 goto :failed

git diff --cached --quiet
if errorlevel 2 goto :failed
if errorlevel 1 (
    git commit -m "Website update"
    if errorlevel 1 goto :failed
) else (
    echo No new local changes to commit.
)

echo.
echo [2/4] Fetching latest changes from GitHub...
git fetch origin main
if errorlevel 1 goto :failed

echo.
echo [3/4] Applying local commits on top of origin/main...
git rebase origin/main
if errorlevel 1 goto :rebase_conflict

echo.
echo [4/4] Pushing to GitHub...
git push origin main
if errorlevel 1 goto :push_failed

echo.
echo ===== GIT PUSH SUCCESSFUL =====
echo GitHub has received your changes.
echo Vercel deployment may still be in progress.
echo.
git status --short
pause
exit /b 0

:rebase_conflict
echo.
echo ===== STOP: REBASE NEEDS ATTENTION =====
echo No force push was attempted. Your commits are preserved.
echo Resolve the conflicts and then run:
echo   git add -A
echo   git rebase --continue
echo   git push origin main
echo Or cancel the rebase with: git rebase --abort
echo.
git status --short
pause
exit /b 1

:push_failed
echo.
echo ===== PUSH FAILED =====
echo Changes are saved locally. GitHub was NOT updated.
echo Check the error above before trying again.
echo Do NOT use force push.
echo.
pause
exit /b 1

:wrong_folder
echo ERROR: Cannot open project folder:
echo %PROJECT_DIR%
pause
exit /b 1

:not_git
echo ERROR: This folder is not a Git repository.
pause
exit /b 1

:wrong_branch
echo ERROR: Current branch is "%CURRENT_BRANCH%", not "main".
echo No commit, rebase or push was performed.
pause
exit /b 1

:failed
echo.
echo ===== OPERATION FAILED =====
echo GitHub was NOT updated by this run.
echo Check the error above. Your existing files were not deleted.
echo.
pause
exit /b 1
