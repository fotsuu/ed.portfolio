# Eric Diamante — Developer Portfolio

A responsive HTML, CSS, and JavaScript portfolio featuring DENR land inventory work and the FeedWise platform.

## Run locally

From this directory:

```powershell
python -m http.server 8080 --bind 127.0.0.1
```

Open http://127.0.0.1:8080 in your browser. Stop the server with Ctrl+C. No build step or package installation is required.

## Features

- Sequenced hero entrance, staggered scroll reveals, subtle pointer-driven portrait movement, and button hover feedback. Motion respects device accessibility preferences.
- Light/night mode with device-theme detection and a saved preference.
- Expandable project screenshot galleries with arrow-key navigation and full-size links.
- A floating back-to-top button after scrolling.
- Project-first layout, experience highlights, and direct CV download.
- Individual DENR and FeedWise case studies with screenshots.
- Manually controlled FeedWise screenshot carousel.
- Responsive navigation, active section tracking, and browser history support.
- Keyboard-accessible dialogs with focus trapping, Escape dismissal, and focus restoration.
- Reduced-motion support and visible keyboard focus styles.
- CV preview with open-in-new-tab and download alternatives.
- Email copy and a contact form that prepares an email draft.

## Contact behavior

The form opens the visitor's email application with a prepared message. The visitor reviews and sends it there; this site does not send email itself. Input stays in the form after preparing a draft. A configured email service or backend would be needed for direct delivery. No email credentials are included.

## Main files

- `index.html`: content and semantic markup.
- `style.css`: design and responsive layouts.
- `script.js`: navigation, case studies, dialogs, carousel, and contact interactions.
- `theme.js`: theme initialization before rendering and saved preference handling.
- `motion.js`: progressive scroll reveals and restrained portrait movement.
- `features.css`: night-mode colors, theme controls, and screenshot gallery styling.
- `Eric-Diamante-CV.pdf`: downloadable CV.
- `assets/`: portrait and supporting assets.

Changes are local until explicitly committed and published.
