@echo off
echo Testing LuxeGems Dependencies...
echo.

echo Testing JSON Server...
npx json-server --version
if %errorlevel% neq 0 (
    echo ❌ JSON Server not working
    exit /b 1
) else (
    echo ✅ JSON Server OK
)

echo.
echo Testing Vite...
npx vite --version
if %errorlevel% neq 0 (
    echo ❌ Vite not working
    exit /b 1
) else (
    echo ✅ Vite OK
)

echo.
echo Testing Node modules...
node -e "console.log('Node.js version:', process.version)"
if %errorlevel% neq 0 (
    echo ❌ Node.js not working
    exit /b 1
) else (
    echo ✅ Node.js OK
)

echo.
echo Testing image server dependencies...
node -e "import('express').then(() => console.log('Express OK')).catch(e => console.log('Express Error:', e.message))"
if %errorlevel% neq 0 (
    echo ❌ Express not working
    exit /b 1
) else (
    echo ✅ Express OK
)

echo.
echo ✅ All dependencies are working!
echo You can now run: npm start
pause


