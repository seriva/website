ARG VARIANT=ubuntu-22.04
FROM mcr.microsoft.com/vscode/devcontainers/base:0-${VARIANT}
                         
ENV HUGO_VERSION 0.92.2

RUN : INSTALL HUGO \
    && curl -fsSLO https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.deb \
    && dpkg -i hugo*_Linux-64bit.deb \
    && rm ./hugo_extended_${HUGO_VERSION}_Linux-64bit.deb

RUN : CLEANUP \
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* 
