# BSV MCP Server: Comprehensive Setup & Usage Guide

The BSV Model Context Protocol (MCP) server provides AI-powered assistance for Bitcoin SV development by offering specialized tools and prompts accessible through MCP-compatible clients like Windsurf, Claude Desktop, and Continue.

## 🎯 What is the BSV MCP Server?

The BSV MCP server is an AI development assistant that provides:

- **BRC Lookup**: Instant access to Bitcoin Request for Comment documents
- **Code Search**: Intelligent search across BSV repositories using ripgrep
- **Function Discovery**: Locate function definitions across the BSV ecosystem
- **Contextual Prompts**: Pre-built prompts for common BSV development tasks

## 🚀 Quick Start (5 Minutes)

### Prerequisites Check
```bash
# Verify required tools
node --version  # Should be v16+
npm --version   # Should be 8+
git --version   # Any recent version
```

### Step 1: Clone BSV Repositories

Create a dedicated directory for BSV repositories:

```bash
# Create BSV development directory
mkdir -p ~/bsv-development/repositories
cd ~/bsv-development/repositories
```

Use this automated setup script:

```bash
#!/usr/bin/env bash
# save as setup_bsv_repos.sh

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

TARGET_DIR="$1"
if [ -z "$TARGET_DIR" ]; then
  echo "Usage: $0 <target_directory>"
  echo "Example: $0 ~/bsv-development/repositories"
  exit 1
fi

echo "Creating directory: $TARGET_DIR"
mkdir -p "$TARGET_DIR"
cd "$TARGET_DIR"

echo "Cloning BSV repositories..."
for repo_url in "${REPOS[@]}"; do
  subdir_name=$(basename "$repo_url" .git)
  echo "Processing: $repo_url"
  if [ -d "$subdir_name" ]; then
    echo "Directory '$subdir_name' exists. Skipping."
  else
    echo "Cloning into '$subdir_name'..."
    git clone --depth 1 "$repo_url" "$subdir_name"
  fi
done

echo "✅ BSV repositories setup complete!"
echo "📁 Repositories location: $TARGET_DIR"
```

Run the setup:
```bash
chmod +x setup_bsv_repos.sh
./setup_bsv_repos.sh ~/bsv-development/repositories
```

### Step 2: Configure Your MCP Client

#### For Windsurf Editor

1. Open Windsurf settings (Cmd/Ctrl + ,)
2. Search for "MCP" 
3. Add this configuration to your MCP settings:

```json
{
  "mcpServers": {
    "bsv-filesystem-context": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/YOUR_USERNAME/bsv-development/repositories"
      ]
    },
    "@bsv/mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@bsv/mcp"
      ],
      "env": {
        "BSV_REPOS_DIR": "/Users/YOUR_USERNAME/bsv-development/repositories"
      }
    }
  }
}
```

**Important**: Replace `/Users/YOUR_USERNAME/bsv-development/repositories` with your actual path.

#### For Claude Desktop

1. Locate your Claude Desktop config file:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

2. Add the same configuration as above to the file.

#### For Continue (VS Code Extension)

1. Install Continue from VS Code marketplace
2. Open Continue settings
3. Add MCP server configuration in the Continue config file

### Step 3: Restart Your Client

Close and reopen your MCP client to load the BSV MCP server.

## 🛠️ Available Tools

### 1. BRC Lookup Tool

Retrieve Bitcoin Request for Comment documents directly from the BSV BRCs repository.

**Usage Examples:**
```
Find BRC-0100 wallet standard
Look up BRC-62 for payment protocols
Get BRC-0001 for basic standards
```

**Tool Parameters:**
- `brc_identifier`: BRC number (e.g., "0100", "62") or keyword (e.g., "wallet", "payment")

### 2. Code Search Tool

Search for code patterns across all BSV repositories using ripgrep (recommended) or grep fallback.

**Usage Examples:**
```
Search for "createTransaction" in ts-sdk
Find wallet integration examples
Look for "BRC-100" implementations
Search for "overlay" in all repositories
```

**Tool Parameters:**
- `query`: Search term or pattern
- `repository_name`: (optional) Specific repository to search
- `file_extension`: (optional) File type filter (e.g., "*.ts", "*.js")

### 3. Function Definition Finder

Locate function or method definitions across BSV repositories.

**Usage Examples:**
```
Find definition of "signTransaction"
Locate "createWallet" function
Search for "broadcastTransaction" method
```

**Tool Parameters:**
- `function_name`: Name of function to find
- `repository_name`: (optional) Specific repository to search

## 🎯 Available Prompts

### 1. Summarize BRC (`/summarize_brc`)

Get AI-generated summaries of specific BRC documents.

**Usage:**
```
/summarize_brc 0100
/summarize_brc wallet
/summarize_brc payment
```

### 2. Explain Code (`/explain_code`)

Get detailed explanations of code snippets with BSV context.

**Usage:**
```
/explain_code file:///path/to/repo/transaction.ts#L10-L20
```

### 3. Generate Usage Example (`/generate_usage_example`)

Create code examples for BSV features with optional SDK preference.

**Usage:**
```
/generate_usage_example "wallet integration with BRC-100"
/generate_usage_example "transaction signing" ts-sdk
```

### 4. Find Related Code (`/find_related_code`)

Use code search to find implementations related to a concept.

**Usage:**
```
/find_related_code "overlay services"
/find_related_code "SPV proofs"
/find_related_code "identity management"
```

## 💡 Practical Usage Scenarios

### For Curriculum Development

**Research BSV Standards:**
```
/summarize_brc 0100
Find all BRC documents related to wallets
Search for "BRC-100" implementation examples
```

**Find Code Examples:**
```
Search for "wallet integration" in wallet-toolbox-examples
Find "transaction building" examples in ts-sdk
Look for "overlay service" implementations
```

**Verify Technical Details:**
```
Find definition of "createTransaction" in ts-sdk
Search for "SPV proof" implementations
Locate "identity" related functions
```

### For Student Learning

**Understanding Concepts:**
```
/explain_code file:///path/to/ts-sdk/src/transaction.ts
/summarize_brc 62
/generate_usage_example "basic wallet setup"
```

**Finding Examples:**
```
/find_related_code "payment processing"
Search for "beginner" examples in wallet-toolbox-examples
Find "tutorial" content across repositories
```

### For Development Work

**API Discovery:**
```
Find definition of "broadcastTransaction"
Search for "error handling" patterns
Locate "configuration" examples
```

**Integration Patterns:**
```
/find_related_code "frontend integration"
Search for "React" examples in repositories
Find "authentication" implementations
```

## 🔧 Advanced Configuration

### Optional: Install ripgrep for Better Performance

**macOS:**
```bash
brew install ripgrep
```

**Ubuntu/Debian:**
```bash
sudo apt install ripgrep
```

**Windows:**
```bash
choco install ripgrep
```

### Environment Variables

You can customize the BSV MCP server behavior:

```bash
export BSV_REPOS_DIR="/path/to/your/bsv-repositories"
export RG_PATH="/usr/local/bin/rg"  # Custom ripgrep path
```

### Multiple Repository Locations

If you have BSV repositories in multiple locations:

```json
{
  "mcpServers": {
    "bsv-main-repos": {
      "command": "npx",
      "args": ["-y", "@bsv/mcp"],
      "env": {
        "BSV_REPOS_DIR": "/path/to/main/repos"
      }
    },
    "bsv-experimental": {
      "command": "npx",
      "args": ["-y", "@bsv/mcp"],
      "env": {
        "BSV_REPOS_DIR": "/path/to/experimental/repos"
      }
    }
  }
}
```

## 🚨 Troubleshooting

### Common Issues

**"Configuration Error / Request Failed":**
1. Verify absolute paths in configuration are correct
2. Ensure `BSV_REPOS_DIR` environment variable is set
3. Check that Node.js/npm are in your PATH
4. Try running server manually: `export BSV_REPOS_DIR=... && npx @bsv/mcp`

**"code_search not working":**
1. Install ripgrep for better performance
2. Verify repository names match directory names
3. Check file permissions on repository directories

**"brc_lookup fails":**
1. Check internet connection
2. Verify BRC identifier format (e.g., "0100", not "BRC-0100")
3. Try with different BRC numbers

**"Server won't start":**
1. Check MCP client logs for detailed errors
2. Verify npm can install packages globally
3. Try clearing npm cache: `npm cache clean --force`

### Manual Testing

Test the server manually:

```bash
# Set environment variable
export BSV_REPOS_DIR="/path/to/your/bsv-repositories"

# Run server directly
npx @bsv/mcp

# Test with curl (if server supports HTTP)
curl -X POST http://localhost:3000/tools/brc_lookup \
  -H "Content-Type: application/json" \
  -d '{"brc_identifier": "0100"}'
```

### Getting Help

1. **Check server logs** in your MCP client
2. **Verify configuration** matches examples exactly
3. **Test with simple queries** first
4. **Ask in BSV Developer communities** for support

## 📚 Integration with Learning Pathways

### Foundation Level
- Use BRC lookup to understand BSV standards
- Search for basic examples and tutorials
- Get explanations of fundamental concepts

### Technical Development
- Find advanced implementation patterns
- Discover API usage examples
- Locate testing and debugging code

### Hackathon/Rapid Development
- Quick access to working code examples
- Fast lookup of API methods and parameters
- Instant access to documentation and standards

### Enterprise Development
- Find enterprise integration patterns
- Locate security and compliance examples
- Discover scalability and performance patterns

## 🔄 Keeping Updated

### Repository Updates
```bash
cd ~/bsv-development/repositories
for dir in */; do
  echo "Updating $dir"
  cd "$dir"
  git pull origin master 2>/dev/null || git pull origin main 2>/dev/null
  cd ..
done
```

### MCP Server Updates
The server is automatically updated when using `npx -y @bsv/mcp`. For manual updates:
```bash
npm install -g @bsv/mcp@latest
```

## 🎯 Best Practices

### Effective Prompting
1. **Be specific** in your queries
2. **Use repository names** when searching specific codebases
3. **Combine tools** for comprehensive research
4. **Iterate** on queries to refine results

### Development Workflow
1. **Start with BRC lookup** to understand standards
2. **Use code search** to find implementation examples
3. **Generate examples** for your specific use case
4. **Verify with function definitions** for API details

### Learning Strategy
1. **Begin with prompts** for guided learning
2. **Explore with search** for deeper understanding
3. **Practice with examples** for hands-on experience
4. **Reference documentation** for authoritative information

---

**Ready to start?** Configure your MCP client and begin exploring the BSV ecosystem with AI assistance!

*This guide provides comprehensive setup and usage instructions for the BSV MCP server. For additional support, consult the [BSV Developer Resources](README.md) or join the BSV developer community.*