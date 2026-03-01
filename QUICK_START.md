# 🚀 Quick Start Guide for GitHub Integration

Follow these steps to get your Interactive Story Explorer running on GitHub with automatic deployment.

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (version 14+)
- [Git](https://git-scm.com/)
- [GitHub account](https://github.com/)

## 🔧 Step 1: Clone or Download the Project

### Option A: If you have the project locally
```bash
cd your-project-directory
```

### Option B: If you need to clone from an existing repository
```bash
git clone https://github.com/yourusername/interactive-story-explorer.git
cd interactive-story-explorer
```

## 📦 Step 2: Install Dependencies

```bash
npm install
```

## 🧪 Step 3: Test Locally

```bash
# Start development server
npm start

# Open http://localhost:3000 in your browser
# Test both word search and quiz modes
```

## 🐙 Step 4: Create GitHub Repository

1. **Go to GitHub.com** and click "New repository"
2. **Repository name**: `interactive-story-explorer` (or your preferred name)
3. **Description**: "An interactive story explorer with word search and quiz modes"
4. **Set to Public** (for GitHub Pages to work on free accounts)
5. **Don't initialize** with README (we already have files)
6. **Click "Create repository"**

## 🔗 Step 5: Connect Local Project to GitHub

```bash
# Add GitHub repository as origin
git remote add origin https://github.com/YOURUSERNAME/interactive-story-explorer.git

# Update the homepage in package.json
# Replace "yourusername" with your actual GitHub username
# File: package.json
# "homepage": "https://YOURUSERNAME.github.io/interactive-story-explorer",
```

**Important**: Edit `package.json` and update the homepage URL with your actual GitHub username!

## 📤 Step 6: Push to GitHub

```bash
# Push to GitHub
git push -u origin main
```

## ⚙️ Step 7: Enable GitHub Pages

1. **Go to your repository** on GitHub
2. **Click "Settings"** tab
3. **Scroll down to "Pages"** in the left sidebar
4. **Source**: Select "GitHub Actions"
5. **Click "Save"**

## 🎉 Step 8: Automatic Deployment

The GitHub Actions workflow will automatically:

1. **Trigger on push** to main branch
2. **Install dependencies**
3. **Build the React app**
4. **Deploy to GitHub Pages**

**Your site will be available at**: `https://YOURUSERNAME.github.io/interactive-story-explorer`

## ⏱️ Step 9: Wait for Deployment

- **Check the "Actions" tab** in your GitHub repository
- **First deployment** takes 2-5 minutes
- **Look for green checkmarks** ✅
- **Visit your live site** once deployment completes

## 🔄 Step 10: Making Updates

For future updates:

```bash
# Make your changes to the code
git add .
git commit -m "Your commit message"
git push origin main

# GitHub Actions will automatically rebuild and deploy!
```

## 🛠️ Troubleshooting

### Common Issues:

1. **Site showing 404**
   - Wait 5-10 minutes for initial deployment
   - Check Actions tab for build status
   - Verify GitHub Pages is enabled

2. **Build failing**
   - Check Actions tab for error details
   - Ensure all dependencies are installed
   - Verify package.json homepage URL is correct

3. **Assets not loading**
   - Confirm homepage field in package.json matches your GitHub Pages URL
   - Clear browser cache

### Build Status:
- **Green checkmark** ✅ = Deployed successfully
- **Red X** ❌ = Build failed (check Actions for details)
- **Yellow circle** 🟡 = Currently building

## 📱 Testing Your Live Site

Once deployed, test these features:

### Word Search Mode:
- [ ] Select a story
- [ ] Type words in the search box
- [ ] Verify scoring works
- [ ] Test spelling correction
- [ ] Check hints functionality

### Quiz Mode:
- [ ] Switch to quiz mode
- [ ] Answer questions with timer
- [ ] Verify correct/incorrect feedback
- [ ] Test "Next Question" functionality

### General:
- [ ] Mobile responsiveness
- [ ] All stories load correctly
- [ ] Achievement system works
- [ ] Reset functionality

## 🎯 Next Steps

1. **Customize the stories** - Add your own content
2. **Share the link** with friends and family
3. **Star the repository** ⭐ if you find it useful
4. **Contribute** new stories or features
5. **Report issues** if you find any bugs

## 📞 Need Help?

- **Check the full [README.md](README.md)** for detailed documentation
- **Review [DEPLOYMENT.md](DEPLOYMENT.md)** for advanced deployment options
- **Create an issue** on GitHub if you encounter problems
- **Check [CONTRIBUTING.md](CONTRIBUTING.md)** if you want to contribute

---

**🎉 Congratulations! Your Interactive Story Explorer is now live on GitHub Pages!**

Share your live site: `https://YOURUSERNAME.github.io/interactive-story-explorer`