# Deploying Your 3D Portfolio to Vercel 🚀

This guide explains how to deploy your 3D portfolio website so you can showcase it live on your LinkedIn profile.

---

## Option A: GitHub + Vercel Dashboard (Highly Recommended)
This is the standard and most robust method. It connects your codebase to Vercel, meaning **every time you push changes to GitHub, your live website updates automatically!**

### Step 1: Create a GitHub Repository
1. Go to [github.com](https://github.com/) and log in.
2. Click **New** to create a new repository.
3. Name it something like `alfred-3d-portfolio`.
4. Leave it public (recommended for portfolios) and do **not** add a README, `.gitignore`, or license (we already created them locally).
5. Copy the remote URL (e.g., `https://github.com/your-username/alfred-3d-portfolio.git`).

### Step 2: Push Your Local Code to GitHub
Open your terminal (PowerShell, Git Bash, or VS Code terminal), navigate to this folder, and run:

```bash
# 1. Initialize git
git init

# 2. Add all files (the .gitignore we made will automatically exclude node_modules and builds)
git add .

# 3. Create initial commit
git commit -m "feat: complete interactive 3D portfolio website"

# 4. Set branch to main
git branch -M main

# 5. Link to your GitHub repository (replace with your actual URL)
git remote add origin https://github.com/your-username/alfred-3d-portfolio.git

# 6. Push to GitHub
git push -u origin main
```

### Step 3: Link Repository to Vercel
1. Go to [vercel.com](https://vercel.com/) and sign up or log in using your **GitHub account**.
2. On your Vercel Dashboard, click **Add New...** and select **Project**.
3. You will see a list of your GitHub repositories. Click **Import** next to your `alfred-3d-portfolio` repository.
4. Vercel will automatically detect **Vite** as the framework and configure the build settings.
5. Click **Deploy**. In under a minute, your portfolio will be live with a production-ready SSL link (e.g., `https://alfred-3d-portfolio.vercel.app`)!

---

## Option B: Vercel CLI (Instant Terminal Deploy)
If you do not want to use GitHub, you can deploy directly from your local terminal using the Vercel command line interface.

### Step 1: Install Vercel CLI
Run the following command globally on your machine:
```bash
npm install -g vercel
```

### Step 2: Deploy Locally
Run the `vercel` command inside the `Alfred_3D_Portfolio` folder:
```bash
cd Alfred_3D_Portfolio
vercel
```
1. It will ask you to log in to Vercel (or create an account).
2. Follow the terminal prompts:
   - *Set up and deploy?* Yes (`y`)
   - *Which scope?* (Select your personal account)
   - *Link to existing project?* No (`n`)
   - *What's your project's name?* `alfred-3d-portfolio`
   - *In which directory is your code located?* `./`
   - *Want to modify settings?* No (`n`)
3. Vercel will upload, build, and deploy your site instantly, returning a live **Preview URL**.

### Step 3: Promote to Production
To make your deployment permanent and get a clean final URL, run:
```bash
vercel --prod
```

---

## Custom Domains
Once deployed, Vercel lets you easily add a custom domain (e.g., `alfredjai.com` or `portfolio.alfredjai.com`) for free under **Project Settings > Domains** with automatic SSL certificates!
