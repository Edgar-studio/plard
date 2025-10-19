@echo off
echo 🧹 Cleaning up existing processes...
taskkill /f /im node.exe >nul 2>&1
timeout /t 2 >nul

echo 🚀 Starting all servers with concurrently...
npm start


