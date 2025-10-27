FROM alpine:3.19

# Install system dependencies
RUN apk add --no-cache \
    bash \
    curl \
    git \
    darkhttpd \
    nodejs \
    npm

# Install Biome
RUN curl -fsSL https://github.com/biomejs/biome/releases/latest/download/biome-linux-x64-musl -o /tmp/biome && \
    chmod 755 /tmp/biome && \
    mv /tmp/biome /usr/local/bin/biome

# Verify installation
RUN /usr/local/bin/biome --version

# Set up git safe directory (will be overridden by postCreateCommand if needed)
RUN git config --global --add safe.directory '*'

# Create a non-root user for better security
RUN adduser -D -s /bin/bash vscode && \
    echo 'vscode ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

# Switch to non-root user
USER vscode
WORKDIR /home/vscode
