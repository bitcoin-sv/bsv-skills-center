# BSV MCP Server: Immediate Setup Instructions

This guide provides step-by-step instructions to get the BSV MCP server running immediately for curriculum development work.

## 🚀 Quick Setup (10 Minutes)

### Step 1: Create BSV Repositories Directory

```bash
# Create the directory structure
mkdir -p ~/bsv-development/repositories
cd ~/bsv-development/repositories
```

### Step 2: Clone BSV Repositories

Copy and run this script to clone all BSV repositories:

```bash
#!/usr/bin/env bash
# BSV Repository Setup Script

REPOS=(
  "https://github.com/bitcoin-sv/wallet-toolbox.git"
  "https://github.com/bitcoin-sv/wallet-toolbox-examples.git"
  "https://github.com/bitcoin-sv/wui.git"
  "https://github.com/bitcoin-sv/ts-sdk.git"
  "https://github.com/bitcoin-sv/BRCs.git"
  "https://github.com/bitcoin-sv/metanet-desktop.git"
  "https://github.com/bitcoin-sv/arc.git"
  "https://github.com/bitcoin-sv/bdk.git"
  "https://github.com/bitcoin-sv/py-sdk.git"
  "https://github.com/bitcoin-sv/p2p.git"
  "https://github.com/bitcoin-sv/authsocket.git"
  "https://github.com/bitcoin-sv/authsocket-client.git"
)

TARGET_DIR="$HOME/bsv-development/repositories"

echo "🚀 Setting up BSV repositories in: $TARGET_DIR"
mkdir -p "$TARGET_DIR"
cd "$TARGET_DIR"

echo "📦 Cloning BSV repositories..."
for repo_url in "${REPOS[@]}"; do
  subdir_name=$(basename "$repo_url" .git)
  echo "Processing: $repo_url"
  if [ -d "$subdir_name" ]; then
    echo "✅ Directory '$subdir_name' already exists. Skipping."
  else
    echo "⬇️  Cloning into '$subdir_name'..."
    if git clone --depth 1 "$repo_url" "$subdir_name"; then
      echo "✅ Successfully cloned '$subdir_name'"
    else
      echo "❌ Failed to clone '$repo_url'"
    fi
  fi
done

echo ""
echo "🎉 BSV repositories setup complete!"
echo "📁 Location: $TARGET_DIR"
echo "📊 Total repositories: ${#REPOS[@]}"
echo ""
echo "Next step: Configure your MCP client (Windsurf/Claude Desktop)"
```

**To run this script:**

1. Save the script above to a file called `setup_bsv_repos.sh`
2. Make it executable: `chmod +x setup_bsv_repos.sh`
3. Run it: `./setup_bsv_repos.sh`

**Or run commands directly:**

```bash
cd ~/bsv-development/repositories

git clone --depth 1 https://github.com/bitcoin-sv/wallet-toolbox.git
git clone --depth 1 https://github.com/bitcoin-sv/wallet-toolbox-examples.git
git clone --depth 1 https://github.com/bitcoin-sv/wui.git
git clone --depth 1 https://github.com/bitcoin-sv/ts-sdk.git
git clone --depth 1 https://github.com/bitcoin-sv/BRCs.git
git clone --depth 1 https://github.com/bitcoin-sv/metanet-desktop.git
git clone --depth 1 https://github.com/bitcoin-sv/arc.git
git clone --depth 1 https://github.com/bitcoin-sv/bdk.git
git clone --depth 1 https://github.com/bitcoin-sv/py-sdk.git
git clone --depth 1 https://github.com/bitcoin-sv/p2p.git
git clone --depth 1 https://github.com/bitcoin-sv/authsocket.git
git clone --depth 1 https://github.com/bitcoin-sv/authsocket-client.git
```

### Step 3: Configure Windsurf MCP Settings

**For your specific setup (Todd's machine):**

1. Open Windsurf
2. Go to Settings (Cmd + ,)
3. Search for "MCP"
4. Add this exact configuration:

```json
{
  "mcpServers": {
    "bsv-filesystem-context": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/toddprice/bsv-development/repositories"
      ]
    },
    "@bsv/mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@bsv/mcp"
      ],
      "env": {
        "BSV_REPOS_DIR": "/Users/toddprice/bsv-development/repositories"
      }
    }
  }
}
```

### Step 4: Restart Windsurf

Close and reopen Windsurf to load the MCP servers.

## 🧪 Test Your Setup

Once Windsurf restarts, test the MCP server with these commands:

### Test BRC Lookup
```
/summarize_brc 0100
```
This should return information about BRC-100 wallet standards.

### Test Code Search
```
Search for "createTransaction" in ts-sdk
```
This should find transaction creation methods in the TypeScript SDK.

### Test Function Discovery
```
Find definition of "signTransaction"
```
This should locate transaction signing functions across repositories.

## 🎯 Immediate Usage for Curriculum Development

### Research BSV Standards
- `/summarize_brc 0100` - Wallet standards
- `/summarize_brc 62` - Payment protocols
- `Search for "BRC" in BRCs repository` - Find all standards

### Find Code Examples
- `Search for "wallet integration" in wallet-toolbox-examples`
- `Find definition of "createTransaction" in ts-sdk`
- `Search for "overlay" in all repositories`

### Verify Technical Details
- `Find definition of "broadcastTransaction"`
- `Search for "SPV proof" implementations`
- `/explain_code` with specific file paths

### Generate Content
- `/generate_usage_example "wallet setup with BRC-100"`
- `/find_related_code "payment processing"`
- `/explain_code` for complex implementations

## 🔧 Alternative: Claude Desktop Setup

If you prefer Claude Desktop, configure it similarly:

**Claude Desktop Config Location:**
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`

**Configuration:**
```json
{
  "mcpServers": {
    "bsv-filesystem-context": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/toddprice/bsv-development/repositories"
      ]
    },
    "@bsv/mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@bsv/mcp"
      ],
      "env": {
        "BSV_REPOS_DIR": "/Users/toddprice/bsv-development/repositories"
      }
    }
  }
}
```

## 🚨 Troubleshooting

### If MCP servers don't load:
1. Check that Node.js is installed: `node --version`
2. Verify the path exists: `ls ~/bsv-development/repositories`
3. Test manual server start: `export BSV_REPOS_DIR=~/bsv-development/repositories && npx @bsv/mcp`

### If repositories fail to clone:
1. Check internet connection
2. Verify Git is installed: `git --version`
3. Try cloning individual repositories manually

### If searches return no results:
1. Verify repositories were cloned successfully
2. Check that `BSV_REPOS_DIR` environment variable is set correctly
3. Try installing ripgrep for better search: `brew install ripgrep`

## 📈 Expected Benefits for Curriculum Development

### Immediate Capabilities
- **Instant BRC lookup** for accurate standard references
- **Code search across all BSV repos** for finding examples
- **Function discovery** for API documentation
- **AI-generated explanations** of complex code

### Workflow Improvements
- **Faster research** when writing technical content
- **Accurate code examples** pulled from official repositories
- **Context-aware assistance** understanding BSV ecosystem
- **Verification of technical details** against source code

### Content Quality
- **Up-to-date references** from latest repository versions
- **Consistent terminology** based on official documentation
- **Working code examples** tested against real implementations
- **Comprehensive coverage** across all BSV components

## 🎯 Next Steps

1. **Complete this setup** (should take ~10 minutes)
2. **Test basic functionality** with the examples above
3. **Start using for curriculum development** immediately
4. **Integrate into curriculum** as documented in the comprehensive guide

Once you have this working, you'll have powerful AI assistance for both developing the curriculum and as a tool to teach students about BSV development!

---

**Ready to start?** Follow the steps above and you'll have AI-powered BSV development assistance in minutes.