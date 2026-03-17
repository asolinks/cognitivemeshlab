# Running Cognitive Mesh Lab Locally with Docker

## Your project path
```
/home/samaechi22/my_projects/PhD_resources/cognitive_mesh_lab_ecosystem_bundle/Cognitivemeshlabv1.1/cognitivemeshlab/
```

---

## Option A — Automated setup (recommended, does everything)

```bash
# 1. Navigate to the project
cd /home/samaechi22/my_projects/PhD_resources/cognitive_mesh_lab_ecosystem_bundle/Cognitivemeshlabv1.1/cognitivemeshlab

# 2. Make the setup script executable
chmod +x setup.sh

# 3. Run it — installs Docker if needed, builds, starts the site
./setup.sh
```

Then open **http://localhost:3000** in your browser.

---

## Option B — Manual step by step

### Step 1 — Install Docker (if not installed)

```bash
# Remove old versions
sudo apt-get remove -y docker docker-engine docker.io containerd runc 2>/dev/null || true

# Install prerequisites
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg lsb-release

# Add Docker GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Add Docker repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine + Compose
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io \
  docker-buildx-plugin docker-compose-plugin

# Add yourself to the docker group (no sudo needed after this)
sudo usermod -aG docker $USER

# IMPORTANT: Log out and back in, OR run this to apply group now:
newgrp docker

# Verify
docker --version
docker compose version
```

### Step 2 — Copy your logo

```bash
cd /home/samaechi22/my_projects/PhD_resources/cognitive_mesh_lab_ecosystem_bundle/Cognitivemeshlabv1.1/cognitivemeshlab

# Find your logo file
find /home/samaechi22/my_projects -name "cognitive_mesh_lab_embossed.png" 2>/dev/null

# Copy it to the public folder (replace the path with what you found above)
cp /path/to/cognitive_mesh_lab_embossed.png public/logo.png
```

### Step 3 — Start the development server

```bash
cd /home/samaechi22/my_projects/PhD_resources/cognitive_mesh_lab_ecosystem_bundle/Cognitivemeshlabv1.1/cognitivemeshlab

docker compose up dev --build
```

**First run** downloads the Node.js Docker image (~180MB) — takes 3-4 minutes once.
**Subsequent runs** start in under 10 seconds.

### Step 4 — Open in browser

```
http://localhost:3000
```

---

## Daily usage — once Docker is set up

```bash
# Start (foreground — see logs in terminal)
docker compose up dev

# Start (background — terminal is free)
docker compose up dev -d

# View logs when running in background
docker compose logs -f dev

# Stop
docker compose stop

# Stop and remove containers (clean slate)
docker compose down
```

---

## Hot reload — editing files

With the dev container running, open the project in VS Code:

```bash
code /home/samaechi22/my_projects/PhD_resources/cognitive_mesh_lab_ecosystem_bundle/Cognitivemeshlabv1.1/cognitivemeshlab
```

Edit any file in `app/` or `components/` → save → the browser at `http://localhost:3000` updates **instantly**. No refresh needed.

---

## Production preview (mirrors the live site exactly)

```bash
# Build and run the production version (served by Nginx, same as live server)
docker compose --profile prod up prod --build

# Open at a different port so it doesn't conflict with dev
http://localhost:8080
```

This is the exact same build that gets deployed to cognitivemeshlab.fi.

---

## All pages

| Page | URL |
|------|-----|
| Homepage | http://localhost:3000 |
| Research | http://localhost:3000/research |
| Lab | http://localhost:3000/lab |
| Learn | http://localhost:3000/learn |
| Projects | http://localhost:3000/projects |
| Blog | http://localhost:3000/blog |
| Contact | http://localhost:3000/contact |

---

## Troubleshooting

### "Permission denied" on docker commands
```bash
sudo usermod -aG docker $USER
newgrp docker
# Then try again without sudo
```

### "Port 3000 already in use"
```bash
# Find what's using port 3000
sudo lsof -i :3000

# Kill it
sudo kill -9 $(sudo lsof -t -i:3000)

# Or change the port in docker-compose.yml:
# ports:
#   - "3001:3000"   ← change 3001 to any free port
# Then open http://localhost:3001
```

### Hot reload not working (edits not showing)
```bash
# Already handled — WATCHPACK_POLLING=true is set in docker-compose.yml
# If still not working, force rebuild:
docker compose up dev --build --force-recreate
```

### Container won't start
```bash
# See the full error
docker compose logs dev

# Clean everything and start fresh
docker compose down
docker system prune -f
docker compose up dev --build
```

### "Cannot connect to Docker daemon"
```bash
# Docker service not running — start it
sudo systemctl start docker
sudo systemctl enable docker  # auto-start on boot

# Verify
sudo systemctl status docker
```

---

## Useful Docker commands for this project

```bash
# See running containers
docker ps

# See all containers (including stopped)
docker ps -a

# Enter the running container (useful for debugging)
docker exec -it cognitivemeshlab-dev sh

# See how much space Docker is using
docker system df

# Clean up unused images/containers (frees disk space)
docker system prune -f
```

---

## Container structure

```
Your Ubuntu machine
└── Docker Engine
    └── cognitivemeshlab-dev container
        ├── Node.js 20 Alpine
        ├── /app/                    ← mounted from your project folder
        │   ├── app/                 ← your pages (editable, hot reloads)
        │   ├── components/          ← navbar, footer, canvas (editable)
        │   ├── public/logo.png      ← your logo
        │   └── ...
        └── /app/node_modules/       ← lives ONLY inside container
                                        (not on your Ubuntu system)
```

Your Ubuntu system stays completely clean — no Node.js, no npm packages installed globally.

---

*Cognitive Mesh Lab · Stanley Ogechi Amaechi · Helsinki, Finland*
