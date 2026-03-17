# cognitivemeshlab.fi — Website

**Stanley Amaechi | Cognitive Mesh Lab | Helsinki, Finland**

Live site: [cognitivemeshlab.fi](https://cognitivemeshlab.fi)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router, static export) |
| Styling | Tailwind CSS + CSS variables |
| Language | TypeScript |
| Hosting | Louhi cPanel (`77.240.19.63`) |
| CI/CD | GitHub Actions → FTP deploy |
| Domains | cognitivemeshlab.fi · .com · .org |

---

## Local Development

```bash
# Clone the repo
git clone https://github.com/asolinks/cognitivemeshlab.git
cd cognitivemeshlab

# Install dependencies
npm install

# Start dev server (hot reload)
npm run dev
# → http://localhost:3000

# Build for production
npm run build
# → generates out/ folder (static HTML/CSS/JS)
```

---

## Deployment — Fully Automated

Every `git push` to `main` automatically deploys to [cognitivemeshlab.fi](https://cognitivemeshlab.fi).

**Workflow:**
```
git add .
git commit -m "your message"
git push origin main
# → GitHub Actions builds and deploys in ~2 minutes
```

Monitor deployments: GitHub → Actions tab → "Deploy to cognitivemeshlab.fi"

---

## One-Time GitHub Secrets Setup

You only need to do this **once** to connect GitHub Actions to your Louhi server.

### Step 1 — Create an FTP account in Louhi cPanel

1. Log into `whm62.louhi.net:2083`
2. Go to **FTP Accounts**
3. Create a new FTP account:
   - Username: `deploy` (will become `deploy@cognitivemeshlab.fi`)
   - Directory: `/public_html` (give access only to this folder)
   - Password: create a strong password and save it
4. Note the **FTP server hostname** — use `77.240.19.63` (the IP is more reliable than the hostname)

### Step 2 — Add secrets to GitHub

1. Go to `github.com/asolinks/cognitivemeshlab`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** for each:

| Secret name | Value |
|-------------|-------|
| `FTP_SERVER` | `77.240.19.63` |
| `FTP_USERNAME` | `deploy@cognitivemeshlab.fi` |
| `FTP_PASSWORD` | the password you set in step 1 |

### Step 3 — Push and watch it deploy

```bash
git push origin main
```

Go to GitHub → Actions → watch the workflow run live. First deploy takes ~3 minutes. After that, only changed files are uploaded so it's ~1 minute.

---

## Project Structure

```
cognitivemeshlab/
├── .github/
│   └── workflows/
│       ├── deploy.yml          # Auto-deploy on push to main
│       └── build-check.yml     # Build verify on pull requests
├── app/
│   ├── layout.tsx              # Root layout, fonts, global metadata
│   ├── globals.css             # Design system (variables, animations)
│   ├── page.tsx                # Homepage
│   ├── research/               # PhD research, prototype, UBICOMP
│   ├── lab/                    # Venture arm, roadmap, services
│   ├── learn/                  # Tutorial tracks, courses
│   ├── projects/               # Open source showcase
│   ├── blog/                   # Blog listing + posts
│   └── contact/                # Inquiry form
├── components/
│   ├── MeshCanvas.tsx          # Animated mesh background
│   ├── Navbar.tsx              # Navigation
│   └── Footer.tsx              # Footer
├── public/
│   └── .htaccess               # Apache routing + HTTPS + cache headers
├── next.config.js              # Static export config
├── tailwind.config.js          # Custom theme
└── tsconfig.json               # TypeScript config
```

---

## Adding a Blog Post

1. Add post metadata to the `posts` array in `app/blog/BlogClient.tsx`
2. Add full post content to `app/blog/[slug]/page.tsx` in the `postContent` object
3. Add the slug to `generateStaticParams()` in the same file
4. `git push` → auto-deploys

---

## Connecting Your Social Channels (Content Distribution)

The professional workflow for syndicating content from your site to social media:

### Option A — Manual (simple, fine to start)
Write blog post → publish on site → share link on LinkedIn, Twitter/X, YouTube description

### Option B — RSS + Zapier/Make (semi-automated, free tier)
Your site generates an RSS feed at `cognitivemeshlab.fi/feed.xml`
Connect RSS → Zapier → auto-post to LinkedIn, Twitter/X when new post publishes

### Option C — Buffer or Hypefury (fully scheduled)
Queue posts across LinkedIn, Twitter/X, YouTube from one dashboard
Costs ~€15/month but saves hours per week

---

## Environment Variables

For local development, create `.env.local` (never commit this):

```bash
# Example — add when you connect a contact form backend
NEXT_PUBLIC_SITE_URL=https://cognitivemeshlab.fi
# RESEND_API_KEY=re_...         (for contact form emails)
# NEXT_PUBLIC_GA_ID=G-...       (for Google Analytics)
```

---

## Domain Setup (already done)

| Domain | Registrar | DNS | Server |
|--------|-----------|-----|--------|
| cognitivemeshlab.fi | Louhi | dns1.louhi.net | 77.240.19.63 |
| cognitivemeshlab.com | Namecheap | Louhi nameservers | 77.240.19.63 |
| cognitivemeshlab.org | Namecheap | Louhi nameservers | 77.240.19.63 |

SSL is active on the Louhi cPanel account.

---

*Stanley Ogechi Amaechi — Cognitive Mesh Lab, Helsinki*
