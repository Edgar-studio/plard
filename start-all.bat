@echo off
title LuxeGems Jewelry Store - Server Manager
color 0A

echo.
echo ========================================
echo    🚀 LuxeGems Jewelry Store
echo ========================================
echo.

REM Kill any existing Node processes
echo 🧹 Cleaning up existing processes...
taskkill /f /im node.exe >nul 2>&1
timeout /t 2 >nul

echo.
echo 📦 Starting JSON Server (Port 4000)...
start "JSON Server" cmd /k "title JSON Server - Port 4000 && npm run server"

echo 📸 Starting Image Server (Port 4001)...
start "Image Server" cmd /k "title Image Server - Port 4001 && npm run image-server"

echo ⚡ Starting Vite Dev Server (Port 5174)...
start "Vite Dev Server" cmd /k "title Vite Dev Server - Port 5174 && npm run dev"

echo.
echo ✅ All servers are starting...
echo.
echo 🌐 Application URLs:
echo    Main App:     http://localhost:5174
echo    JSON API:     http://localhost:4000
echo    Image Upload: http://localhost:4001
echo.
echo 🔐 Admin Login:
echo    Email:    samvel1973@seznam.cz
echo    Password: edgarek73
echo.
echo 📝 Instructions:
echo    1. Wait for all servers to start (about 10-15 seconds)
echo    2. Open http://localhost:5174 in your browser
echo    3. Login with admin credentials above
echo    4. Click "Админ" button to access admin panel
echo.
echo Press any key to open the application in browser...
pause >nul

start http://localhost:5174

echo.
echo Press any key to exit this manager...
pause >nul