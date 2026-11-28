@echo off
setlocal EnableExtensions DisableDelayedExpansion

set "SOURCE=C:\Users\Acer\Desktop\teamframe_web\public\sektor_nula\SEKTOR_NULA_Launcher.zip"
set "GITHUB=https://github.com/rendilife/teamframe-web.git"
set "CLEAN=%TEMP%\teamframe_web_launcher_%RANDOM%_%RANDOM%"

if not exist "%SOURCE%" (
  echo ERROR: Nenalezen soubor:
  echo %SOURCE%
  goto :fail
)

for %%A in ("%SOURCE%") do echo Launcher ZIP size: %%~zA bytes

echo.
echo [1/5] Novy cisty klon GitHub main. Puvodni projekt se nemeni.
git clone --single-branch --branch main "%GITHUB%" "%CLEAN%"
if errorlevel 1 goto :fail

echo.
echo [2/5] Kopirovani launcher ZIP.
if not exist "%CLEAN%\public\sektor_nula" mkdir "%CLEAN%\public\sektor_nula"
if errorlevel 1 goto :fail
copy /Y "%SOURCE%" "%CLEAN%\public\sektor_nula\SEKTOR_NULA_Launcher.zip" >nul
if errorlevel 1 goto :fail

echo.
echo [3/5] Vynucene pridani ZIP i pres .gitignore.
git -C "%CLEAN%" add -f -- "public/sektor_nula/SEKTOR_NULA_Launcher.zip"
if errorlevel 1 goto :fail
git -C "%CLEAN%" diff --cached --stat
if errorlevel 1 goto :fail

git -C "%CLEAN%" diff --cached --quiet
if errorlevel 2 goto :fail
if not errorlevel 1 goto :unchanged

echo.
echo [4/5] Commit pouze launcher ZIP.
git -C "%CLEAN%" commit -m "Publish SEKTOR NULA launcher"
if errorlevel 1 goto :fail

echo.
echo [5/5] Push na GitHub main. Bez force.
git -C "%CLEAN%" push origin main
if errorlevel 1 goto :fail

echo.
echo ===== GITHUB PUSH SUCCESS =====
echo GitHub nahrani proslo. Nasazeni webu overit zvlast.
echo https://teamframe.cz/sektor_nula/SEKTOR_NULA_Launcher.zip
pause
exit /b 0

:unchanged
echo.
echo ===== FILE ALREADY IN REMOTE MAIN =====
echo ZIP je shodny s aktualni verzi v GitHub main.
echo Dostupnost na webu je potreba overit zvlast.
echo https://teamframe.cz/sektor_nula/SEKTOR_NULA_Launcher.zip
pause
exit /b 0

:fail
echo.
echo ===== GITHUB DEPLOY FAILED =====
echo Puvodni teamframe_web zustal beze zmen.
echo Nezobrazujte DEPLOY COMPLETE. Poslete presnou chybu.
pause
exit /b 1
