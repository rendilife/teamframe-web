@echo off
cd /d C:\Users\Acer\Desktop\teamframe_web

echo Adding changes...
git add .

echo Committing...
git commit -m "Website update"

echo Pushing to GitHub...
git push

echo.
echo ===== DEPLOY COMPLETE =====
pause