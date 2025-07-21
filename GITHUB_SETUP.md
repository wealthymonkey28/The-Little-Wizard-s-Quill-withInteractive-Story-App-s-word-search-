# 🐙 GitHub Repository Setup Guide

Follow these exact steps to create your Interactive Story Explorer repository on GitHub.

## 📋 What You'll Need
- Your GitHub username
- About 5 minutes

## 🔧 Step 1: Create Repository on GitHub

1. **Go to GitHub.com** and log in to your account
2. **Click the "+" icon** in the top right corner
3. **Select "New repository"**
4. **Fill in the details**:
   - **Repository name**: `interactive-story-explorer`
   - **Description**: `An interactive story explorer with word search and quiz modes featuring magical stories for educational entertainment`
   - **Visibility**: Public ✅ (required for free GitHub Pages)
   - **Initialize**: Leave unchecked ❌ (we already have files)
5. **Click "Create repository"**

## 🔗 Step 2: Connect Your Local Project

Copy your GitHub username and run these commands in your terminal:

```bash
# Replace YOUR_GITHUB_USERNAME with your actual username
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/interactive-story-explorer.git

# Verify the remote was added
git remote -v
```

## 📝 Step 3: Update Package.json

**IMPORTANT**: Update the homepage URL in `package.json`:

1. Open `package.json` file
2. Find the line: `"homepage": "https://yourusername.github.io/interactive-story-explorer"`
3. Replace `yourusername` with your actual GitHub username
4. Save the file

Example:
```json
{
  "homepage": "https://johnsmith.github.io/interactive-story-explorer",
  // ... rest of package.json
}
```

## 📤 Step 4: Push to GitHub

```bash
# Add the package.json change
git add package.json
git commit -m "📝 Update homepage URL for GitHub Pages"

# Push everything to GitHub
git push -u origin main
```

## ⚙️ Step 5: Enable GitHub Pages

1. **Go to your repository** on GitHub.com
2. **Click the "Settings" tab**
3. **Scroll down to "Pages"** in the left sidebar
4. **Under "Source"**, select **"GitHub Actions"**
5. **Click "Save"**

## 🎉 Step 6: Wait for Deployment

1. **Click the "Actions" tab** in your repository
2. **You should see a workflow running** (yellow circle 🟡)
3. **Wait 2-5 minutes** for it to complete
4. **Look for the green checkmark** ✅

## 🌐 Step 7: Visit Your Live Site

Your site will be available at:
```
https://YOUR_GITHUB_USERNAME.github.io/interactive-story-explorer
```

## 🔍 Quick Commands Reference

```bash
# Check if you're in the right directory
pwd
ls -la

# Check your GitHub username in the remote URL
git remote -v

# Check the status of your repository
git status

# Push future changes
git add .
git commit -m "Your change description"
git push origin main
```

## 🛠️ Troubleshooting

### If you get "repository not found" error:
- Double-check your GitHub username spelling
- Make sure the repository was created successfully on GitHub.com
- Verify you're logged into the correct GitHub account

### If GitHub Pages shows 404:
- Wait 5-10 minutes after first deployment
- Check that GitHub Pages is enabled in Settings
- Verify the homepage URL in package.json is correct

### If build fails:
- Check the "Actions" tab for error details
- Make sure package.json homepage URL matches your GitHub username
- Try pushing again: `git push origin main`

## 📱 Test Your Live Site

Once deployed, test these features:
- [ ] All 5 stories load correctly
- [ ] Word search mode works
- [ ] Quiz mode with timer functions
- [ ] Mobile responsiveness
- [ ] Achievement system

## 🎯 What Happens Next

Every time you push changes to the main branch:
1. **GitHub Actions automatically triggers**
2. **Builds your React app**
3. **Deploys to GitHub Pages**
4. **Your live site updates in 2-3 minutes**

## 📞 Need Help?

If you run into issues:
1. Check the **Actions** tab for build logs
2. Review this guide step-by-step
3. Create an **Issue** in your repository
4. The error messages usually tell you exactly what's wrong

---

**🎉 Your Interactive Story Explorer will be live and ready to share!**

Example live URL: `https://yourusername.github.io/interactive-story-explorer`