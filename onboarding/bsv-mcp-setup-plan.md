# BSV MCP Server Setup & Integration Plan

This document outlines the setup and integration of the BSV MCP server for both curriculum development and as part of the onboarding curriculum itself.

## 🎯 Dual Purpose Integration

### 1. **Personal Development Setup** (For Curriculum Writing)
- Set up BSV MCP server for immediate use in Windsurf/Claude Desktop
- Clone BSV repositories locally for context
- Configure MCP client for curriculum development assistance

### 2. **Curriculum Integration** (For Students/Developers)
- Embed MCP server setup across multiple learning pathways
- Create comprehensive documentation for various user types
- Provide templates and quick-start guides

## 🚀 Phase 1: Personal Setup (Immediate)

### Step 1: Repository Cloning Setup

Create a dedicated directory for BSV repositories that will serve as context for the MCP server:

```bash
# Create BSV repositories directory
mkdir -p ~/bsv-development/repositories
cd ~/bsv-development/repositories

# Clone all BSV repositories for MCP context
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

### Step 2: Windsurf MCP Configuration

Configure Windsurf to use both the filesystem server and BSV MCP server:

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

### Step 3: Immediate Usage for Curriculum Development

Once configured, you'll have access to:

- **BRC Lookup**: `/summarize_brc 0100` for wallet standards
- **Code Search**: Find implementation examples across BSV repos
- **Function Discovery**: Locate specific API methods and usage patterns
- **Context-Aware Assistance**: AI understanding of BSV ecosystem

## 🎓 Phase 2: Curriculum Integration

### Integration Points

#### A. Tools Reference Enhancement
**File**: `packages/onboarding/03-resources/tools-reference.md`

Add new section:
```markdown
### AI Development Tools

| Tool | Type | Description | Repository/Website |
|------|------|-------------|-------------------|
| **BSV MCP Server** | AI Assistant | Model Context Protocol server for BSV development | [GitHub](https://github.com/bitcoin-sv/bsv-mcp) |
| **Windsurf Editor** | IDE | AI-powered development environment with MCP support | [Website](https://codeium.com/windsurf) |
| **Claude Desktop** | AI Assistant | Desktop AI assistant with MCP integration | [Website](https://claude.ai/desktop) |
| **Continue** | VS Code Extension | AI coding assistant with MCP support | [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Continue.continue) |
```

#### B. Hackathon Essentials Integration
**File**: `packages/onboarding/05-hackathon-essentials/quick-start-guide.md`

Add to 15-minute checklist:
```markdown
- [ ] **BSV MCP Server** (3 minutes) - AI assistance for rapid development
```

#### C. Technical Building Blocks Addition
**New File**: `packages/onboarding/02-pathways/technical/01-building-blocks/ai-development-assistant.md`

Complete module covering AI-assisted BSV development workflows.

#### D. Developer Resources Enhancement
**New File**: `packages/onboarding/03-resources/bsv-mcp-comprehensive-guide.md`

Detailed setup and usage guide for all MCP clients.

## 📋 Implementation Checklist

### Immediate Setup (For You)
- [ ] Create BSV repositories directory
- [ ] Clone all BSV repositories
- [ ] Configure Windsurf MCP settings
- [ ] Test MCP server functionality
- [ ] Verify BRC lookup and code search

### Curriculum Integration
- [ ] Update tools reference with AI development tools
- [ ] Create comprehensive MCP setup guide
- [ ] Add AI assistance to hackathon quick start
- [ ] Create AI development assistant building block
- [ ] Update navigation and cross-references
- [ ] Add AI capability callouts throughout existing content

## 🔧 Configuration Templates

### Windsurf Configuration
```json
{
  "mcpServers": {
    "bsv-filesystem-context": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "{{BSV_REPOS_PATH}}"]
    },
    "@bsv/mcp": {
      "command": "npx",
      "args": ["-y", "@bsv/mcp"],
      "env": {
        "BSV_REPOS_DIR": "{{BSV_REPOS_PATH}}"
      }
    }
  }
}
```

### Claude Desktop Configuration
```json
{
  "mcpServers": {
    "bsv-filesystem-context": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "{{BSV_REPOS_PATH}}"]
    },
    "@bsv/mcp": {
      "command": "npx",
      "args": ["-y", "@bsv/mcp"],
      "env": {
        "BSV_REPOS_DIR": "{{BSV_REPOS_PATH}}"
      }
    }
  }
}
```

## 🎯 Expected Benefits

### For Curriculum Development
- **Faster Research**: Instant access to BSV documentation and code examples
- **Accurate References**: AI-assisted fact-checking against official repositories
- **Context-Aware Writing**: Understanding of BSV ecosystem for better explanations
- **Code Example Generation**: AI assistance in creating accurate code samples

### For Students/Developers
- **Accelerated Learning**: AI assistance in understanding BSV concepts
- **Rapid Prototyping**: Quick access to code examples and patterns
- **Expert Guidance**: AI-powered recommendations based on BSV best practices
- **Troubleshooting Support**: Intelligent assistance with development issues

## 📁 File Structure After Integration

```
packages/onboarding/
├── 03-resources/
│   ├── tools-reference.md (UPDATED)
│   ├── bsv-mcp-comprehensive-guide.md (NEW)
│   └── ai-development-best-practices.md (NEW)
├── 05-hackathon-essentials/
│   ├── quick-start-guide.md (UPDATED)
│   └── ai-assisted-development.md (NEW)
├── 02-pathways/technical/01-building-blocks/
│   ├── ai-development-assistant.md (NEW)
│   └── README.md (UPDATED)
└── bsv-mcp-setup-plan.md (THIS FILE)
```

## 🚀 Next Steps

1. **Immediate**: Set up personal BSV MCP server configuration
2. **Phase 1**: Create comprehensive setup documentation
3. **Phase 2**: Integrate across all curriculum sections
4. **Phase 3**: Add advanced AI workflows and best practices

This dual approach ensures you have immediate access to AI assistance for curriculum development while also providing students with the same powerful tools for their BSV learning journey.