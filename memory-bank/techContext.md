# Technical Context

## Technology Stack

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Markup** | HTML5 | Semantic structure, SEO-optimized metadata, OpenGraph tags, ARIA roles |
| **Styling** | CSS3 + CSS Custom Properties | Custom tokens, dark/night mode palette, responsive Flexbox/Grid layouts |
| **Logic** | Vanilla JavaScript (ES6+) | No framework overhead, native DOM APIs, event delegation |
| **Typography**| Google Fonts | Inter (Body text) and Plus Jakarta Sans (Display headings) |
| **Documents** | PDF | `Eric-Diamante-CV.pdf` for direct download and browser preview |
| **Runtime** | Static HTTP Server | Built-in Python `http.server` or any static host (GitHub Pages, Vercel, Netlify) |

## Development & Runtime Environment

### Local Server Launch
Run local server without requiring Node.js or npm:
```powershell
python -m http.server 8080 --bind 127.0.0.1
```
Access at: `http://127.0.0.1:8080`

### File Structure Map
```text
eric-developer-portfolio/
├── .agents/
│   └── rules/
│       └── memory-bank.md       # Memory bank operational workflow rules
├── memory-bank/
│   ├── projectbrief.md          # Core requirements and project goals
│   ├── productContext.md        # User experience and rationale
│   ├── systemPatterns.md        # Architecture and design patterns
│   ├── techContext.md           # Technologies, setup, and constraints
│   ├── activeContext.md         # Current state and next steps
│   └── progress.md              # Feature completion checklist
├── AGENTS.md                    # Root instructions for agent memory bank
├── README.md                    # Public documentation
├── index.html                   # Core single-page markup
├── style.css                    # Main style tokens, layout, and components
├── features.css                 # Night mode overrides and modal styling
├── script.js                    # Interaction, carousel, modal, and contact controller
├── motion.js                    # Progressive scroll reveals and portrait micro-interaction
├── theme.js                     # Early theme evaluation script
├── Eric-Diamante-CV.pdf         # Resume artifact
├── email-template.html          # Notification template design
├── email-autoreply-template.html# Autoresponder template design
└── assets / *.png / *.jpg       # Visual media and screenshots
```

## Technical Constraints & Standards
1. **Zero External Build Step**: Do not introduce bundlers (Webpack, Vite, Rollup) unless explicitly requested. The site must remain purely static.
2. **Standard-Compliant HTML**: Comply with W3C HTML5 validator rules (avoid obsolete tags or invalid attributes).
3. **Cross-Browser Styling**:
   - Ensure flex containers account for Firefox min-height defaults (`min-height: 0`).
   - Validate touch targets on mobile devices (minimum 44x44px).
   - Ensure dark mode variables maintain WCAG AA contrast (minimum 4.5:1 for body text).
