# Use the official Node.js runtime as a parent image
FROM node:18-alpine

# Install system dependencies
RUN apk add --no-cache \
    git \
    curl \
    bash \
    zsh \
    openssh \
    libc6-compat \
    python3 \
    make \
    g++

# Install global npm packages for development
RUN npm install -g \
    @next/codemod \
    npm-check-updates \
    prettier \
    eslint

# Create a non-root user
ARG USERNAME=node
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Create the user with home directory
RUN if [ "$USER_GID" != "1000" ] || [ "$USER_UID" != "1000" ]; then \
        groupmod --gid $USER_GID $USERNAME \
        && usermod --uid $USER_UID --gid $USER_GID $USERNAME \
        && chown -R $USER_UID:$USER_GID /home/$USERNAME; \
    fi

# Set the working directory
WORKDIR /workspace

# Change ownership of the workspace to the node user
RUN chown -R $USERNAME:$USERNAME /workspace

# Switch to the non-root user
USER $USERNAME

# Install Oh My Zsh for better terminal experience
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended

# Set zsh as the default shell
ENV SHELL=/bin/zsh

# Copy package files for dependency installation
COPY --chown=$USERNAME:$USERNAME package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Expose the port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1

# Start development server by default
CMD ["npm", "run", "dev"]
