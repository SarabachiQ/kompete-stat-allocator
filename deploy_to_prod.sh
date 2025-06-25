#!/bin/bash
echo "Deploying to kompete-stat-allocator..."
rsync -av --exclude='.git' --exclude='node_modules' ./ ../kompete-stat-allocator/
echo "✅ Deployment complete."
