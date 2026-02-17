@echo off
echo ========================================
echo Starting Communication Service...
echo ========================================
echo.

cd /d "E:\IUC\API\communication-service\backend"

echo Checking dependencies...
call npm install

echo.
echo Starting server...
echo.

node server.js

pause