#!/bin/bash

echo "🚀 Starting LuxeGems Jewelry Store..."

echo "📦 Starting JSON Server (Port 4000)..."
npm run server &
SERVER_PID=$!

echo "📸 Starting Image Server (Port 4001)..."
npm run image-server &
IMAGE_PID=$!

echo "⚡ Starting Vite Dev Server (Port 5174)..."
npm run dev &
DEV_PID=$!

echo ""
echo "✅ All servers started successfully!"
echo ""
echo "🌐 Application URLs:"
echo "   Main App:     http://localhost:5174"
echo "   JSON API:     http://localhost:4000"
echo "   Image Upload: http://localhost:4001"
echo ""
echo "🔐 Admin Login:"
echo "   Email:    samvel1973@seznam.cz"
echo "   Password: edgarek73"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for any process to exit
wait

# Cleanup function
cleanup() {
    echo ""
    echo "🛑 Stopping all servers..."
    kill $SERVER_PID 2>/dev/null
    kill $IMAGE_PID 2>/dev/null
    kill $DEV_PID 2>/dev/null
    echo "✅ All servers stopped"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM


