ARG VARIANT=ubuntu-22.04
FROM mcr.microsoft.com/vscode/devcontainers/base:0-${VARIANT}
                         
ENV HUGO_VERSION 0.111.3

RUN : INSTALL HUGO \
    && curl -fsSLO https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_linux-amd64.deb \
    && dpkg -i hugo*_linux-amd64.deb \
    && rm ./hugo_${HUGO_VERSION}_linux-amd64.deb

RUN : CLEANUP \
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* 
