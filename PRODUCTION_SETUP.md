# Production Deployment Guide

This guide walks you through deploying your website to DigitalOcean App Platform with GitHub Actions CI/CD.

## Prerequisites

- GitHub account with the repository created
- DigitalOcean account
- `doctl` CLI installed (optional, for local testing)

## Step 1: Create GitHub Repository

1. Go to GitHub and create a new repository
2. Clone your local project and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/website.git
   git push -u origin main
   ```

## Step 2: Setup GitHub Secrets

GitHub Actions needs access to DigitalOcean. Add these secrets to your repository:

1. Go to **Settings → Secrets and variables → Actions**
2. Add the following secrets:
   - `DIGITALOCEAN_TOKEN`: Your DigitalOcean API token
     - Get this from DigitalOcean Dashboard → API → Tokens → Generate New
   - `VITE_API_URL`: Your production API endpoint (if needed)

## Step 3: Create DigitalOcean App

1. Log in to DigitalOcean
2. Go to **Apps** → **Create App**
3. Select **GitHub** as the source
4. Authorize GitHub and select your repository
5. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Run Command**: `npx serve -s dist -l 8080`
6. Choose a plan and deploy

## Step 4: Update Configuration Files

### Update `app.yaml`

Replace `YOUR_GITHUB_USERNAME` and `YOUR_APP_ID` with your actual values:

```yaml
name: website
services:
- name: web
  github:
    branch: main
    repo: YOUR_GITHUB_USERNAME/website  # Update this
```

### Update `.github/workflows/deploy.yml`

Replace `YOUR_APP_ID` with your actual DigitalOcean App ID:

```yml
doctl apps update YOUR_APP_ID --spec app.yaml  # Update this
```

To find your App ID:
```bash
doctl apps list
```

## Step 5: Environment Variables

Set production environment variables in DigitalOcean:

1. Go to your App → **Settings**
2. Click **Edit** on the Web component
3. Add environment variables:
   - `NODE_ENV`: `production`
   - `VITE_API_URL`: Your production API URL
   - `VITE_APP_ENV`: `production`

## Step 6: Custom Domain (Optional)

1. In DigitalOcean App → **Settings → Domains**
2. Add your custom domain
3. Update DNS records as instructed

## Type of Deployment

This setup uses **DigitalOcean App Platform** which provides:

- ✅ Automatic deployments on `git push`
- ✅ Built-in SSL/TLS certificates
- ✅ CDN included
- ✅ Automatic scaling
- ✅ No server management needed
- ✅ Pay only for compute/bandwidth used

## Monitoring & Logs

### View Logs in DigitalOcean
```bash
doctl apps logs YOUR_APP_ID --follow
```

### View Deployment Status
Monitor from DigitalOcean Dashboard → Apps → Your App → Deployments

## Rollback

To rollback to a previous deployment:

1. Go to DigitalOcean Dashboard → Apps → Your App → Deployments
2. Click the deployment you want to revert to
3. Click **Re-deploy**

## Manual Deployment (if CI/CD fails)

```bash
# Install doctl
curl -L https://github.com/digitalocean/doctl/releases/download/v1.102.0/doctl-1.102.0-linux-x64.tar.gz | tar xz -C ~

# Authenticate
doctl auth init

# Trigger deployment
doctl apps update YOUR_APP_ID --spec app.yaml
```

## Performance Optimization

The production build includes:

- **Code Splitting**: Separate chunks for vendor, animations, and icons
- **Minification**: terser with console/debugger removal
- **Tree Shaking**: Removes unused code
- **Compression**: GZIP enabled in nginx
- **Security Headers**: XSS, CSRF, CSP protections
- **Caching**: Long-lived cache for static assets

## Security Checklist

- ✅ HTTPS enabled by default
- ✅ Security headers configured in nginx
- ✅ No console logs in production
- ✅ Source maps disabled
- ✅ API tokens in GitHub Secrets only
- ✅ `.env.local` excluded from git

## Troubleshooting

### App fails to build
- Check GitHub Actions logs: Repository → Actions
- View build output in DigitalOcean: App → Deployments → Latest

### App crashes after deployment
- Check logs: `doctl apps logs YOUR_APP_ID`
- Ensure `NODE_ENV=production` is set
- Verify `dist` folder is not empty after build

### Deployment takes too long
- First deployment takes longer due to npm install
- Subsequent deployments should be faster (~2-3 minutes)

### Domain not working
- Wait 24-48 hours for DNS propagation
- Check DNS settings in DigitalOcean console

## Next Steps

1. Test the deployment by making a small change
2. Push to GitHub: `git push origin main`
3. Watch automatic deployment: GitHub Actions → Deployments
4. Verify live at your DigitalOcean domain
5. Monitor performance and logs regularly

## Documentation Links

- [DigitalOcean Apps Documentation](https://docs.digitalocean.com/products/app-platform/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Production Guide](https://vitejs.dev/guide/ssr.html)
