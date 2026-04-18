## Quick Start for Production Deployment

### 1. Initialize Git Repository
```bash
cd d:\NEWBRAND\website
git init
git add .
git commit -m "Initial commit - production ready"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/website.git
git push -u origin main
```

### 2. Create GitHub Secrets
Go to your GitHub repo → Settings → Secrets and variables → Actions → Add:
- **Name:** `DIGITALOCEAN_TOKEN` | **Value:** Your DigitalOcean API token
- **Name:** `VITE_API_URL` | **Value:** Your production API endpoint

### 3. Create DigitalOcean App
1. Go to [DigitalOcean Dashboard](https://cloud.digitalocean.com)
2. Click **Create** → **Apps** (App Platform)
3. Select **GitHub** → Connect your repository
4. Choose the "website" repository
5. Select the plan and create
6. Copy your **App ID** from the URL or app settings

### 4. Update Configuration Files

**Update `.github/workflows/deploy.yml` (line ~43)**
```yaml
doctl apps update YOUR_APP_ID --spec app.yaml
```

**Update `app.yaml` (line ~3)**
```yaml
repo: YOUR_GITHUB_USERNAME/website
```

**Update `app.production.yaml` (for custom domain)**
```yaml
- exact: https://yourdomain.com
- exact: https://www.yourdomain.com
```

### 5. Test Build Locally
```bash
npm install
npm run build:prod
npm run preview
```

### 6. Push & Deploy
```bash
git add .
git commit -m "Add production configuration"
git push origin main
```

GitHub Actions will automatically:
- ✅ Install dependencies
- ✅ Run linter
- ✅ Build the application
- ✅ Deploy to DigitalOcean

### 7. Monitor Deployment
- Check GitHub Actions: Repository → Actions
- Log view on DigitalOcean: Apps → Your App → Deployments → Logs

### 8. Set Environment Variables in DigitalOcean
App Settings → Web Component → Edit Environment Variables:
```
NODE_ENV = production
VITE_APP_ENV = production
VITE_API_URL = https://api.yourdomain.com
```

### 9. Configure Custom Domain (Optional)
App Settings → Domains → Add Domain

---

## Architecture Overview

```
GitHub (Repository)
        ↓
GitHub Actions (CI/CD Pipeline)
        ↓ (on push to main)
DigitalOcean App Platform
        ↓
nginx (Web Server)
        ↓
React App (SPA)
```

## Files Created

| File | Purpose |
|------|---------|
| `.github/workflows/deploy.yml` | GitHub Actions CI/CD pipeline |
| `app.yaml` | DigitalOcean App configuration |
| `app.production.yaml` | Production environment config |
| `Dockerfile` | Docker image for production |
| `.dockerignore` | Files to exclude from Docker |
| `docker-compose.yml` | Local production testing |
| `nginx.conf` | nginx web server config |
| `vite.config.prod.ts` | Production build configuration |
| `.env.example` | Environment variables template |
| `PRODUCTION_SETUP.md` | Detailed setup guide |
| `DEPLOYMENT_CHECKLIST.md` | Pre/post deployment checklist |
| `QUICK_START.md` | This file |

---

## Verify Deployment

✅ Everything is configured. Next steps:

1. **Test locally first:**
   ```bash
   docker-compose up
   ```
   Visit http://localhost:8080

2. **Push to GitHub:**
   ```bash
   git push origin main
   ```

3. **Monitor in GitHub Actions** for build status

4. **Access your live app** at the DigitalOcean URL provided

---

## Get Help

- [DigitalOcean Docs](https://docs.digitalocean.com/products/app-platform/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Vite Guide](https://vitejs.dev/)
