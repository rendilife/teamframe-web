@echo off
cd /d C:\Users\Acer\Desktop\teamframe_web

echo Syncing with GitHub...
git pull origin main --rebase

echo Adding changes...
git add .

echo Committing...
git commit -m "Website update"

echo Pushing...
git push

echo.
echo ===== DEPLOY COMPLETE =====
pause