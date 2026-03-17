#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# Cognitive Mesh Lab — Complete Local Environment Setup Script
# Run this ONCE on your Ubuntu machine to install Docker and start the site
#
# Usage:
#   chmod +x setup.sh
#   ./setup.sh
# ─────────────────────────────────────────────────────────────────────────────

set -e  # Exit on any error

BLUE='\033[0;34m'
TEAL='\033[0;36m'
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No colour

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo ""
echo -e "${BLUE}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║       COGNITIVE MESH LAB — Local Environment Setup          ║${NC}"
echo -e "${BLUE}║       cognitivemeshlab.fi  |  Stanley Amaechi               ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""

# ── Step 1: Check Ubuntu ──────────────────────────────────────────────────────
echo -e "${TEAL}[1/6] Checking system...${NC}"
if ! grep -qi ubuntu /etc/os-release 2>/dev/null; then
  echo -e "${YELLOW}Warning: This script is optimised for Ubuntu. Continuing anyway.${NC}"
fi
echo -e "${GREEN}    ✓ System check passed${NC}"

# ── Step 2: Install Docker if not present ─────────────────────────────────────
echo ""
echo -e "${TEAL}[2/6] Checking Docker...${NC}"

if command -v docker &> /dev/null; then
  DOCKER_VER=$(docker --version)
  echo -e "${GREEN}    ✓ Docker already installed: ${DOCKER_VER}${NC}"
else
  echo "    Docker not found. Installing Docker Engine..."
  echo ""

  # Remove old versions
  sudo apt-get remove -y docker docker-engine docker.io containerd runc 2>/dev/null || true

  # Install prerequisites
  sudo apt-get update -qq
  sudo apt-get install -y -qq \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

  # Add Docker's official GPG key
  sudo mkdir -p /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
    sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

  # Add Docker repository
  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
    https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

  # Install Docker Engine
  sudo apt-get update -qq
  sudo apt-get install -y docker-ce docker-ce-cli containerd.io \
    docker-buildx-plugin docker-compose-plugin

  # Add current user to docker group (no sudo needed for docker commands)
  sudo usermod -aG docker $USER

  echo -e "${GREEN}    ✓ Docker installed successfully${NC}"
  echo -e "${YELLOW}    ⚠ You need to log out and back in for group changes to take effect.${NC}"
  echo -e "${YELLOW}      For now, the script will use 'sudo docker'. After relogin, you won't need sudo.${NC}"
fi

# ── Step 3: Install Docker Compose if not present ────────────────────────────
echo ""
echo -e "${TEAL}[3/6] Checking Docker Compose...${NC}"

if command -v docker compose &> /dev/null || command -v docker-compose &> /dev/null; then
  echo -e "${GREEN}    ✓ Docker Compose available${NC}"
else
  echo "    Installing Docker Compose..."
  sudo apt-get install -y docker-compose-plugin
  echo -e "${GREEN}    ✓ Docker Compose installed${NC}"
fi

# ── Step 4: Find the logo ─────────────────────────────────────────────────────
echo ""
echo -e "${TEAL}[4/6] Looking for logo...${NC}"

LOGO_PATH=$(find "$(dirname "$PROJECT_DIR")" -name "cognitive_mesh_lab_embossed.png" 2>/dev/null | head -1)

if [ -n "$LOGO_PATH" ]; then
  cp "$LOGO_PATH" "$PROJECT_DIR/public/logo.png"
  echo -e "${GREEN}    ✓ Logo found and copied: $LOGO_PATH${NC}"
else
  echo -e "${YELLOW}    ⚠ Logo not found automatically.${NC}"
  echo "      If you have the logo file, copy it manually:"
  echo "      cp /path/to/cognitive_mesh_lab_embossed.png $PROJECT_DIR/public/logo.png"
fi

# ── Step 5: Build and start ───────────────────────────────────────────────────
echo ""
echo -e "${TEAL}[5/6] Building container and starting dev server...${NC}"
echo "    (First build downloads Node.js image — takes 2-3 minutes once)"
echo ""

cd "$PROJECT_DIR"

# Use sudo if user not yet in docker group
DOCKER_CMD="docker"
if ! groups $USER | grep -q docker; then
  DOCKER_CMD="sudo docker"
fi

$DOCKER_CMD compose up dev --build -d

# Wait for server to be ready
echo ""
echo "    Waiting for dev server to start..."
for i in {1..30}; do
  if curl -s http://localhost:3000 > /dev/null 2>&1; then
    break
  fi
  sleep 1
  printf "."
done
echo ""

# ── Step 6: Done ──────────────────────────────────────────────────────────────
echo ""
echo -e "${TEAL}[6/6] Done!${NC}"
echo ""
echo -e "${GREEN}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  ✓  Cognitive Mesh Lab is running locally!                  ║${NC}"
echo -e "${GREEN}╠══════════════════════════════════════════════════════════════╣${NC}"
echo -e "${GREEN}║                                                              ║${NC}"
echo -e "${GREEN}║  Open in browser:  http://localhost:3000                     ║${NC}"
echo -e "${GREEN}║                                                              ║${NC}"
echo -e "${GREEN}║  Pages:                                                      ║${NC}"
echo -e "${GREEN}║    Home      →  http://localhost:3000                        ║${NC}"
echo -e "${GREEN}║    Research  →  http://localhost:3000/research               ║${NC}"
echo -e "${GREEN}║    Lab       →  http://localhost:3000/lab                    ║${NC}"
echo -e "${GREEN}║    Learn     →  http://localhost:3000/learn                  ║${NC}"
echo -e "${GREEN}║    Projects  →  http://localhost:3000/projects               ║${NC}"
echo -e "${GREEN}║    Blog      →  http://localhost:3000/blog                   ║${NC}"
echo -e "${GREEN}║    Contact   →  http://localhost:3000/contact                ║${NC}"
echo -e "${GREEN}║                                                              ║${NC}"
echo -e "${GREEN}║  Edit files in VS Code — browser updates instantly           ║${NC}"
echo -e "${GREEN}║                                                              ║${NC}"
echo -e "${GREEN}║  Stop:   docker compose stop                                 ║${NC}"
echo -e "${GREEN}║  Logs:   docker compose logs -f dev                          ║${NC}"
echo -e "${GREEN}║  Restart: docker compose restart dev                         ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""
