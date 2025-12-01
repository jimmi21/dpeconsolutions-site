# CLAUDE.md - D.P. Accounting Solutions Website

## Project Overview

Static website for **D.P. Accounting Solutions** (Λογιστικές Υπηρεσίες), a Greek accounting services company. The site is hosted on GitHub Pages and serves Greek-speaking clients with accounting, tax, and payroll services.

**Live URL:** `https://jimmi21.github.io/dpeconsolutions-site/`

**Contact Info:**
- Email: dpeconsolutions@gmail.com
- Phone: +30 2431076222

## Architecture

This is a **static site with no build process**. Edit files directly - no compilation, bundling, or deployment scripts needed. Changes pushed to the main branch are automatically deployed via GitHub Pages.

### File Structure

```
dpeconsolutions-site/
├── index.html              # Main homepage (v5)
├── consulting.html         # Alternative minimal consulting page (v3.6)
├── 404.html                # Error page
├── thanks.html             # Form submission confirmation
├── faq.html                # FAQ page (placeholder)
├── case-studies.html       # Case studies page (placeholder)
├── funding.html            # Funding info page (placeholder)
├── privacy.html            # Privacy policy page (placeholder)
├── styles.css              # Main stylesheet with 4 themes
├── styles-consulting.css   # Consulting page styles
├── script.js               # Main site JavaScript (v5)
├── script-consulting.js    # Consulting page JavaScript (v3.6)
├── robots.txt              # SEO crawler directives
├── sitemap.xml             # XML sitemap
└── assets/
    ├── logo-dp-gold.png    # Primary logo (square, gold)
    ├── logo-wordmark*.svg  # Wordmark variants for themes
    ├── favicon.svg         # Browser favicon
    ├── og-image.jpg        # Open Graph social preview
    ├── hero-*.svg          # Hero section graphics
    └── ic-*.svg            # Service icons
```

## Page Variants

### Main Site (`index.html` + `styles.css` + `script.js`)
- Full-featured with theme switcher (4 themes)
- Tax calculator with print/CSV export
- Booking system with .ics download and email
- Services, contact, and footer sections

### Consulting Variant (`consulting.html` + `styles-consulting.css` + `script-consulting.js`)
- Minimal design with fixed "consulting" theme
- Same tax calculator functionality
- Standard contact form (no booking .ics)
- Header shrink animation on scroll

## Key Features

### 1. Theme System (Main Site Only)
Four themes stored in localStorage (`dpas_theme`):
- `dark` - Dark mode
- `greige` - Grey-beige (default)
- `grey` - Neutral grey
- `light` - Light mode

Themes are applied via `data-theme` attribute on `<html>` element.

### 2. Greek Tax Calculator
Calculates income tax for Greek individuals with:
- **Income types:** Employment/pensions, business activity, rental
- **Deductions:** Child credits (phased reduction), prepayments, tax credits
- **Advance tax:** 0%, 55%, or 100%
- **Business duty:** Professional license fee

Tax tables in JavaScript support years 2024-2025 with progressive brackets:
- Employment: 9%/22%/28%/36%/44%
- Rental: 15%/35%/45%

**Export options:** Print/PDF button opens new tab, CSV download button

### 3. Booking System (Main Site)
- Datetime picker with quick slot suggestions
- Generates downloadable `.ics` calendar file
- Sends email via FormSubmit.co
- Auto-reply enabled for email contacts

### 4. Contact Forms
Both variants use [FormSubmit.co](https://formsubmit.co) for form handling:
- No backend required
- Honeypot spam protection
- Redirects to `thanks.html` on success

## Development Guidelines

### Editing HTML
- **Language:** Greek (`lang="el"`)
- **Character encoding:** UTF-8
- Keep consistent header/footer structure across pages
- Update `<link rel="canonical">` and OpenGraph meta tags when adding pages

### Editing CSS
- Use CSS custom properties (variables) defined in `:root`
- Key variables: `--bg`, `--card`, `--ink`, `--muted`, `--line`, `--accent`
- Mobile breakpoint: `980px`
- Print styles hide everything except calculator (`@media print`)

### Editing JavaScript
- Vanilla JavaScript only (no frameworks)
- DOM elements fetched by ID at top of files
- Calculator functions: `calculate()`, `calcProg()`, `childrenCredit()`, `phasedCredit()`
- Use `fmt()` helper for currency formatting (el-GR locale)

### Cache Busting
Both CSS and JS files use version query strings:
```html
<link rel="stylesheet" href="styles.css?v=v5.0" />
<script src="script.js?v=v5.0" defer></script>
```
**Increment version number when making changes** to ensure browsers load updated files.

### Adding New Pages
1. Copy an existing page as template (e.g., `faq.html`)
2. Update `<title>`, meta description, canonical URL, OG tags
3. Keep header/footer/script includes consistent
4. Add to `sitemap.xml` if publicly accessible

## SEO & Accessibility

- **Structured data:** JSON-LD AccountingService schema in `index.html`
- **Skip link:** Present for keyboard navigation
- **ARIA labels:** Used on navigation and floating CTAs
- **Alt text:** Required on all images
- **Responsive:** Mobile-first with 980px breakpoint

## External Services

| Service | Purpose | Configuration |
|---------|---------|---------------|
| GitHub Pages | Hosting | Auto-deploy from main branch |
| Google Fonts | Typography | Inter, Source Serif 4 (main); Noto Sans/Serif (consulting) |
| FormSubmit.co | Form handling | Endpoint: dpeconsolutions@gmail.com |

## Common Tasks

### Update Tax Tables
Edit `TAX_TABLES` object in both `script.js` and `script-consulting.js`:
```javascript
const TAX_TABLES = {
  "2025": {
    EMP: [{upTo:10000, rate:.09}, ...],
    RENT: [{upTo:12000, rate:.15}, ...]
  }
};
```

### Change Contact Info
Update in multiple locations:
- `README.md`
- `index.html` (JSON-LD schema, contact section, .ics LOCATION)
- `consulting.html` (contact section)
- `script.js` (ICS file content)

### Add New Theme
1. Add new `[data-theme="name"]` ruleset in `styles.css`
2. Add `<option>` in theme select dropdown
3. Test all color variables for contrast

## Testing

No automated tests. Manual testing checklist:
- [ ] Theme switcher works and persists across refresh
- [ ] Calculator produces correct results
- [ ] Print/PDF opens new tab with formatted output
- [ ] CSV download triggers with correct data
- [ ] Booking generates valid .ics file
- [ ] Forms submit successfully (check email)
- [ ] Mobile menu toggle works
- [ ] All internal links resolve correctly

## Notes

- The site is entirely in Greek; all user-facing text should remain in Greek
- Business operates in Greece with nationwide support
- Tax calculator is for indicative purposes only (disclaimer present)
- Placeholder pages (FAQ, case-studies, funding, privacy) have minimal content
