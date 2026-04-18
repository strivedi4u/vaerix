# Production Deployment Checklist

## Pre-Deployment ✅

- [ ] All code committed and pushed to main branch
- [ ] TypeScript builds without errors: `npm run type-check`
- [ ] ESLint passes: `npm run lint`
- [ ] Tests pass (if applicable): `npm test`
- [ ] Build succeeds: `npm run build:prod`
- [ ] No console errors in production build
- [ ] .env.example is up to date with all required variables

## GitHub Setup ✅

- [ ] Repository created and code pushed
- [ ] `.gitignore` configured properly
- [ ] GitHub Secrets added:
  - [ ] `DIGITALOCEAN_TOKEN`
  - [ ] `VITE_API_URL` (if needed)
- [ ] Branch protection rules enabled for main

## DigitalOcean Setup ✅

- [ ] DigitalOcean account created
- [ ] App created in App Platform
- [ ] GitHub repository connected
- [ ] App ID noted and added to CI/CD config
- [ ] Environment variables configured in app
- [ ] Domain connected (if using custom domain)

## Local Testing ✅

- [ ] Build locally: `npm run build:prod`
- [ ] Preview build: `npm run preview`
- [ ] Test with Docker: `docker build -t website . && docker run -p 3000:3000 website`
- [ ] Test with docker-compose: `docker-compose up`

## Security & Performance ✅

- [ ] HTTPS enabled (automatic with DigitalOcean)
- [ ] Security headers configured in nginx.conf
- [ ] Cache headers set for static assets
- [ ] Sourcemaps disabled in production
- [ ] Console logs removed in production
- [ ] API endpoints use HTTPS
- [ ] Environmental variables never committed

## Monitoring ✅

- [ ] Set up log monitoring
- [ ] Configure uptime alerts
- [ ] Test health check endpoint
- [ ] Monitor initial deployment

## Post-Deployment ✅

- [ ] Test live application
- [ ] Verify all pages load correctly
- [ ] Test API connections
- [ ] Check console for errors (dev tools)
- [ ] Test on mobile devices
- [ ] Verify SSL certificate is valid
- [ ] Check performance metrics
- [ ] Monitor error logs for 24 hours

## Rollback Plan ✅

- [ ] Previous deployment snapshot available
- [ ] Rollback process documented
- [ ] Emergency contact information available
- [ ] Team communication plan in place

## Regular Maintenance ✅

- [ ] Weekly log review
- [ ] Monthly security updates
- [ ] Quarterly performance audit
- [ ] Error monitoring active
