# Λογιστικό Site (Στατικό, Δωρεάν)
Ένα απλό, μοντέρνο, μονοσέλιδο site για λογιστικό γραφείο — έτοιμο για δωρεάν φιλοξενία.

## Πώς το ανεβάζεις δωρεάν
### Επιλογή A: GitHub Pages (συνιστάται)
1. Φτιάξε λογαριασμό στο GitHub και νέο repository (π.χ. `logistiko-site`).
2. Ανέβασε τα αρχεία `index.html`, `styles.css`, `script.js` και τον φάκελο `assets/` στη ρίζα.
3. Από **Settings → Pages**: Build and deployment → Deploy from a branch, branch `main` και `/ (root)`.
4. Το site θα είναι διαθέσιμο σε URL μορφής `https://το-username-σου.github.io/logistiko-site`.

### Επιλογή B: Netlify
1. Κάνε λογαριασμό στο Netlify και επίλεξε “Add new site → Deploy manually”.
2. Σύρε όλο τον φάκελο στο παράθυρο (drag & drop).
3. Παίρνεις άμεσα ένα δωρεάν URL (π.χ. `https://brave-sun-1234.netlify.app`).

### Επιλογή Γ: Firebase Hosting ή Cloudflare Pages
Παρόμοια λογική, δωρεάν επίπεδα για στατικά sites.

## Εξατομίκευση
- Άλλαξε τίτλους/κείμενα στο `index.html` (π.χ. επωνυμία, τηλέφωνο, email).
- Βάλε το δικό σου email στο `action="mailto:..."` της φόρμας επικοινωνίας.
- Το λογότυπο είναι στο `assets/logo.svg` — αντικατάστησέ το με δικό σου SVG/PNG.
- Τα χρώματα/στυλ βρίσκονται στο `styles.css` (μεταβλητές CSS στην αρχή).

## Domain (π.χ. .gr)
Μπορείς αργότερα να αγοράσεις domain (π.χ. από Papaki/GoDaddy) και να το συνδέσεις στο GitHub Pages ή Netlify με οδηγό τους.

## SEO/Απόδοση
- Περιλαμβάνει meta description και γρήγορη φόρτωση (χωρίς βαριά scripts).
- Πρόσθεσε Google Analytics αργότερα αν θες (script στο `<head>`).

## Συχνές αλλαγές που ίσως θες
- Προσθήκη ενότητας “Πελάτες / Testimonials” (βλέπε σχόλια στο `index.html`).
- Προσθήκη Αγγλικής μετάφρασης (διγλωσσία) με δεύτερη σελίδα ή toggle.
