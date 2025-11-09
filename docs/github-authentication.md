# GitHub Authentication Guide

## Switching GitHub Accounts

### Method 1: Using GitHub CLI (Recommended)

#### Step 1: Log out of current account (optional)
```bash
gh auth logout
```

#### Step 2: Log in with a different account
```bash
gh auth login
```

This will prompt you to:
1. Choose GitHub.com
2. Choose authentication method:
   - **HTTPS** (recommended) - uses a token
   - **SSH** - uses SSH keys
3. Choose how to authenticate:
   - **Login with a web browser** (easiest)
   - **Paste an authentication token** (if you have one)

#### Step 3: Configure git to use GitHub CLI credentials
```bash
gh auth setup-git
```

### Method 2: Add Multiple Accounts (Keep Current + Add New)

#### Step 1: Log in with additional account
```bash
gh auth login -h github.com
```

This will add a new account without logging out the current one.

#### Step 2: Switch between accounts
```bash
gh auth switch
```

This will show a list of accounts to choose from.

#### Step 3: Set default account for this repository
```bash
gh auth switch --user <username>
```

### Method 3: Using Personal Access Token

#### Step 1: Create a Personal Access Token
1. Go to GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name (e.g., "AeroVista Player")
4. Select scopes: **repo** (full control of private repositories)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)

#### Step 2: Use the token to authenticate
```bash
git remote set-url origin https://<token>@github.com/aerocoreos/sound.git
```

Or configure git credential helper:
```bash
git config --global credential.helper manager
```

Then when you push, it will prompt for:
- Username: your GitHub username
- Password: paste the token (not your actual password)

### Method 4: Using SSH Keys

#### Step 1: Generate SSH key (if you don't have one)
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

#### Step 2: Add SSH key to GitHub
1. Copy your public key:
```bash
cat ~/.ssh/id_ed25519.pub
```

2. Go to GitHub.com → Settings → SSH and GPG keys → New SSH key
3. Paste your public key and save

#### Step 3: Change remote URL to SSH
```bash
git remote set-url origin git@github.com:aerocoreos/sound.git
```

## For This Repository (aerocoreos/sound)

Since you need to push to `aerocoreos/sound`, you need to authenticate with an account that has write access to that repository.

### Quick Steps:
1. **Log in with the correct account:**
   ```bash
   gh auth login
   ```
   Choose the account that has access to `aerocoreos/sound`

2. **Verify authentication:**
   ```bash
   gh auth status
   ```

3. **Push:**
   ```bash
   git push origin main
   ```

## Troubleshooting

### If you get "Permission denied":
- Make sure you're authenticated with the correct account
- Verify the account has write access to the repository
- Check repository settings: Settings → Collaborators

### If you get "403 Forbidden":
- Your token might be expired
- Your account might not have the right permissions
- Try refreshing: `gh auth refresh`

### Clear cached credentials (Windows):
```bash
cmdkey /list
cmdkey /delete:LegacyGeneric:target=git:https://github.com
```

