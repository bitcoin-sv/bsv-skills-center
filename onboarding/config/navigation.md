# Navigation Configuration

This document outlines the navigation structure for the BSV Developer Onboarding Pathway.

## Main Navigation Structure

```json
{
  "navigation": {
    "main": [
      {
        "title": "Getting Started",
        "path": "/01-getting-started/",
        "icon": "🚀",
        "description": "Your first steps with BSV"
      },
      {
        "title": "Choose Your Pathway",
        "path": "/02-pathways/",
        "icon": "🛤️",
        "description": "Select your learning journey"
      },
      {
        "title": "Developer Resources",
        "path": "/03-resources/",
        "icon": "📚",
        "description": "Tools and documentation"
      }
    ],
    "pathways": [
      {
        "id": "technical",
        "title": "Technical Pathway",
        "icon": "👨‍💻",
        "color": "#007bff",
        "description": "Build applications on BSV",
        "audience": "Developers, Engineers, Technical Architects"
      },
      {
        "id": "business",
        "title": "Business Pathway",
        "icon": "💼",
        "color": "#28a745",
        "description": "Evaluate BSV for your organization",
        "audience": "Business Leaders, Product Managers, Decision Makers"
      },
      {
        "id": "enterprise",
        "title": "Enterprise Pathway",
        "icon": "🏛️",
        "color": "#6f42c1",
        "description": "Enterprise integration and compliance",
        "audience": "Enterprise Architects, Compliance Teams, IT Directors"
      },
      {
        "id": "academic",
        "title": "Academic Pathway",
        "icon": "🎓",
        "color": "#fd7e14",
        "description": "Deep theoretical knowledge",
        "audience": "Researchers, Students, Academics"
      }
    ]
  }
}
```

## Breadcrumb Configuration

```json
{
  "breadcrumbs": {
    "separator": " > ",
    "showHome": true,
    "homeTitle": "BSV Onboarding",
    "maxDepth": 4
  }
}
```

## Cross-References

```json
{
  "crossReferences": {
    "technical": {
      "relatedBusiness": [
        "value-propositions/financial-services",
        "implementation-guide"
      ],
      "relatedEnterprise": [
        "integration-patterns",
        "security-audit"
      ]
    },
    "business": {
      "relatedTechnical": [
        "building-blocks",
        "examples"
      ],
      "relatedEnterprise": [
        "governance-risk",
        "deployment-strategies"
      ]
    },
    "enterprise": {
      "relatedTechnical": [
        "advanced-topics/scaling-patterns",
        "overlay-services"
      ],
      "relatedBusiness": [
        "case-studies",
        "implementation-guide"
      ]
    }
  }
}