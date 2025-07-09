# Docker Setup for Portfolio Project

This document explains how to use Docker with your Next.js portfolio project.

## Prerequisites

- Docker installed on your system
- Docker Compose installed (usually comes with Docker Desktop)

## Files Overview

- `Dockerfile` - Production-optimized multi-stage build
- `Dockerfile.dev` - Development environment with hot reloading
- `docker-compose.yml` - Container orchestration for both environments
- `.dockerignore` - Excludes unnecessary files from Docker build context
- `.devcontainer/` - VSCode Dev Container configuration (see below)

## Quick Start

### Production Build

```bash
# Build and run production container
npm run docker:prod

# Or manually:
docker-compose up --build
```

The application will be available at `http://localhost:3000`

### Development Environment

```bash
# Build and run development container with hot reloading
npm run docker:dev

# Or manually:
docker-compose --profile dev up --build
```

The development server will be available at `http://localhost:3001`

## Available Docker Scripts

```bash
# Build production image
npm run docker:build

# Run production container
npm run docker:run

# Start development environment
npm run docker:dev

# Start production environment
npm run docker:prod

# Stop all containers
npm run docker:stop
```

## Manual Docker Commands

### Production

```bash
# Build the image
docker build -t portfolio-app .

# Run the container
docker run -p 3000:3000 portfolio-app

# Run in detached mode
docker run -d -p 3000:3000 --name portfolio-app portfolio-app
```

### Development

```bash
# Build development image
docker build -f Dockerfile.dev -t portfolio-app-dev .

# Run with volume mounts for hot reloading
docker run -p 3001:3000 -v $(pwd):/app -v /app/node_modules portfolio-app-dev
```

## Docker Compose Services

### `portfolio-app` (Production)
- Port: 3000
- Environment: production
- Optimized multi-stage build
- Standalone Next.js output

### `portfolio-dev` (Development)
- Port: 3001
- Environment: development
- Hot reloading enabled
- Volume mounts for live code changes
- Activated with `--profile dev`

## Environment Variables

You can add environment variables to the docker-compose.yml file:

```yaml
environment:
  - NODE_ENV=production
  - CUSTOM_VAR=value
```

Or use an environment file:

```yaml
env_file:
  - .env.local
```

## Troubleshooting

### Common Issues

1. **Port already in use**: Change the port mapping in docker-compose.yml
2. **Build fails**: Make sure all dependencies are in package.json
3. **Hot reloading not working**: Check volume mounts in development service

### Useful Commands

```bash
# View running containers
docker ps

# View logs
docker logs portfolio-app

# Stop and remove containers
docker-compose down

# Remove images
docker image rm portfolio-app

# Clean up unused Docker resources
docker system prune
```

## Production Deployment

For production deployment, you can use the production image:

```bash
# Build for production
docker build -t portfolio-app .

# Tag for registry
docker tag portfolio-app your-registry/portfolio-app:latest

# Push to registry
docker push your-registry/portfolio-app:latest
```

## VSCode Dev Container (Recommended for Development)

For the best development experience, use the VSCode Dev Container setup:

### Prerequisites
- [Visual Studio Code](https://code.visualstudio.com/)
- [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
- Docker Desktop

### Quick Start with Dev Container
1. **Install the Dev Containers extension** in VSCode
2. **Open the project** in VSCode
3. **Click "Reopen in Container"** when prompted

### Benefits of Dev Container
- ✅ **Consistent Environment** - Same setup across all machines
- ✅ **Pre-configured Extensions** - All necessary VSCode extensions installed
- ✅ **Automatic Setup** - Dependencies and dev server start automatically
- ✅ **Debugging Ready** - Debug configurations pre-configured
- ✅ **Hot Reloading** - File changes reflected immediately
- ✅ **Integrated Terminal** - Zsh with Oh My Zsh

### What's Included
- Node.js 18 with all dependencies
- VSCode extensions (ESLint, Prettier, Tailwind CSS, etc.)
- Debug configurations for Next.js
- Port forwarding (3000, 3001)
- Zsh terminal with Oh My Zsh

For detailed dev container documentation, see [`.devcontainer/README.md`](.devcontainer/README.md).

## Next Steps

- Add environment-specific configurations
- Set up CI/CD pipeline with Docker
- Consider using Docker secrets for sensitive data
- Add health checks to the containers
