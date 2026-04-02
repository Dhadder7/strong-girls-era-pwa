# Strong Girls Era Phone App

This package is already set up for you.

You do **not** need to copy and paste code.

## What this is
This is a **phone-installable web app**.

That means:
- you build it on your desktop computer
- you upload it to a website
- people open the link on their phones
- they save it to their home screen
- it shows up like an app icon

It is **not** an App Store app. It is a **PWA**.

## What you need
1. A computer
2. Internet
3. A free GitHub account
4. A free Vercel account
5. Node.js installed on your computer

## Step 1: Install Node.js
1. Go to the Node.js website.
2. Download the **LTS** version.
3. Install it with the normal default options.

Check that it installed:
```bash
node -v
npm -v
```

## Step 2: Extract this folder
1. Download the zip file.
2. Right-click it.
3. Click **Extract All**.
4. Open the extracted folder.

## Step 3: Open Command Prompt in this folder
1. Open the extracted folder.
2. Click the address bar at the top.
3. Type:
```text
cmd
```
4. Press Enter.

## Step 4: Install the project
```bash
npm install
```

## Step 5: Test it on your computer
```bash
npm run dev
```
Open the local link it shows in the browser.

## Step 6: Create a GitHub account
Create a free GitHub account if you do not already have one.

## Step 7: Install Git
Install Git for Windows, then test it:
```bash
git --version
```

## Step 8: Create a GitHub repository
1. Log into GitHub.
2. Click **+**
3. Click **New repository**
4. Name it `strong-girls-era`
5. Click **Create repository**

## Step 9: Upload this project to GitHub
Run these commands one at a time:

```bash
git init
git add .
git commit -m "Initial upload"
git branch -M main
git remote add origin YOUR-REPO-URL-HERE
git push -u origin main
```

Replace `YOUR-REPO-URL-HERE` with your real GitHub repo URL.

## Step 10: Create a Vercel account
1. Go to Vercel.
2. Sign up with GitHub.

## Step 11: Deploy the app
1. In Vercel, click **Add New Project**
2. Select your GitHub repository
3. Click **Import**
4. Click **Deploy**

When it finishes, Vercel gives you your app link.

## Step 12: Put it on a phone
Send the Vercel link to the phone.

### iPhone
1. Open the link in **Safari**
2. Tap **Share**
3. Tap **Add to Home Screen**
4. Tap **Add**

### Android
1. Open the link in **Chrome**
2. Tap the menu
3. Tap **Install app** or **Add to Home screen**
4. Confirm

## Important note
This app saves data on each individual device using local storage.
That means each person has their own saved data on their own phone.

## Main commands
```bash
npm install
npm run dev
npm run build
```
