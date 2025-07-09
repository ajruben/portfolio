# VSCode Dev Container Setup

This project is configured to work with [VSCode Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers), providing a consistent development environment across different machines.

## Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/)
- [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Quick Start

1. **Install the Dev Containers extension** in VSCode
2. **Open the project** in VSCode
3. **Click "Reopen in Container"** when prompted, or:
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type "Dev Containers: Reopen in Container"
   - Select the command

VSCode will automatically:
- Build the development container
- Install all dependencies
- Start the development server
- Configure all necessary extensions

## What's Included

### 🛠️ Development Tools
- Node.js 18 (Alpine Linux)
- npm with global dev packages
- Git and GitHub CLI
- Zsh with Oh My Zsh
- Python 3 and build tools

### 🔧 VSCode Extensions
- **TailwindCSS IntelliSense** - Tailwind CSS autocomplete
- **Prettier** - Code formatting
- **ESLint** - Code linting
- **TypeScript** - Enhanced TypeScript support
- **Auto Rename Tag** - Automatically rename paired HTML tags
- **Path Intellisense** - File path autocomplete
- **MDX** - MDX file support
- **Error Lens** - Inline error highlighting
- **Pretty TypeScript Errors** - Better error messages

### ⚙️ Pre-configured Settings
- Format on save enabled
- ESLint auto-fix on save
- TypeScript import preferences
- Tailwind CSS class regex patterns
- File associations for MDX
- Terminal configured with Zsh

### 🚀 Port Forwarding
- **Port 3000** - Main Next.js application
- **Port 3001** - Development server (if needed)

## Container Features

### Automatic Setup
When the container starts, it automatically:
1. Installs all npm dependencies
2. Starts the Next.js development server
3. Forwards ports to your local machine

### File Synchronization
- Your local workspace is mounted into the container
- Changes are reflected immediately (hot reloading)
- Node modules are stored in a named volume for performance

### Debugging
Pre-configured debug configurations are available:
- **Server-side debugging** - Debug Next.js server code
- **Client-side debugging** - Debug in Chrome
- **Full-stack debugging** - Debug both server and client

## Usage

### Starting Development
The dev server starts automatically when the container launches. You can access:
- **Application**: http://localhost:3000
- **Development tools**: Available in VSCode terminal

### Terminal Access
- Open VSCode integrated terminal (`Ctrl+`` ` or `Cmd+`` `)
- Uses Zsh with Oh My Zsh for enhanced experience
- All npm commands work as expected

### Running Commands
```bash
# Install new dependencies
npm install package-name

# Run tests
npm test

# Build for production
npm run build

# Lint code
npm run lint
```

### Debugging
1. Set breakpoints in your code
2. Go to Run and Debug panel (`Ctrl+Shift+D`)
3. Select a debug configuration
4. Start debugging (`F5`)

## Customization

### Adding Extensions
Edit `.devcontainer/devcontainer.json` and add extension IDs to the `extensions` array:

```json
"extensions": [
  "existing.extension",
  "new.extension.id"
]
```

### Modifying Settings
Edit `.devcontainer/devcontainer.json` to add or modify VSCode settings:

```json
"settings": {
  "editor.fontSize": 16,
  "newSetting": "value"
}
```

### Installing Additional Tools
Modify `.devcontainer/Dockerfile` to add system packages or global npm packages:

```dockerfile
RUN apk add --no-cache new-package
RUN npm install -g new-global-package
```

## Troubleshooting

### Container Won't Start
1. **Check Docker is running**: Ensure Docker Desktop is running
2. **Check disk space**: Ensure you have enough disk space
3. **Rebuild container**: `Ctrl+Shift+P` → "Dev Containers: Rebuild Container"

### Port Conflicts
If port 3000 is already in use:
1. Stop other services using port 3000
2. Or modify the port in `.devcontainer/devcontainer.json`

### Performance Issues
- **On Windows**: Ensure files are in WSL2 filesystem
- **On Mac**: Check Docker Desktop resource allocation
- **General**: Try rebuilding the container

### Extension Issues
If extensions don't work properly:
1. **Reload window**: `Ctrl+Shift+P` → "Developer: Reload Window"
2. **Reinstall extension**: Disable and re-enable the extension
3. **Check logs**: View VSCode output panel for errors

## Commands Reference

### Dev Container Commands
- `Ctrl+Shift+P` → "Dev Containers: Reopen in Container"
- `Ctrl+Shift+P` → "Dev Containers: Rebuild Container"
- `Ctrl+Shift+P` → "Dev Containers: Open Folder in Container"

### Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run docker:build # Build Docker image
```

## Benefits

### ✅ Consistent Environment
- Same Node.js version across all machines
- Identical dependencies and tools
- Pre-configured settings and extensions

### ✅ Easy Onboarding
- New developers can start immediately
- No manual setup required
- All tools pre-installed

### ✅ Isolated Development
- No conflicts with local installations
- Clean, reproducible environment
- Easy to reset and rebuild

### ✅ Enhanced Productivity
- Optimized VSCode configuration
- Debugging ready out of the box
- Integrated terminal with Zsh
