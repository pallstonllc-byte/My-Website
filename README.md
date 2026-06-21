# Pallston LLC — Website Sample (Source Files)

This is a static, front-end-only prototype of the Pallston LLC marketing site,
built to demonstrate the visual direction and site architecture described in
the Pallston strategy playbook. It is not wired to a backend — the contact
form does not submit anywhere, and the "Download Capability Statement" link
is a placeholder.

## How to view it

Open `index.html` directly in any modern browser (Chrome, Safari, Firefox,
Edge). No build step, server, or install is required — it's plain HTML/CSS/JS.

If double-clicking doesn't work well in your environment, you can also run a
quick local server from this folder and open the printed URL:

    python3 -m http.server 8000
    # then visit http://localhost:8000

## File structure

    index.html          All page markup (nav, hero, three pillar sections,
                         about, capability statement, insights, contact, footer)
    styles.css           All styling — color tokens, type scale, layout,
                         responsive breakpoints, animations
    script.js            Nav scroll state, mobile menu toggle, hero logo
                         animation trigger, scroll-spy for the side rail,
                         smooth-scroll for in-page links
    assets/
      pallston-logo-white.png     Logo recolored white, transparent
                                   background — used on navy sections
      pallston-logo-navy.png      Logo in original navy, transparent
                                   background — for white sections
      pallston-logo-original.jpg  The logo file as originally provided

## Design tokens (for editing in styles.css)

    --navy:    #0A2342   anchor color, dark sections and headlines
    --navy-80: #16365C   gradient depth variant
    --navy-deep: #071A33 darkest background variant
    --teal:    #0FA18E   signature accent — buttons, links, highlights
    --paper:   #FAFAF8   warm off-white for section breaks
    --ink:     #16222B   body text
    --ink-soft:#5C6B73   secondary/muted text
    --hairline:#E2E6E2   borders and dividers on light backgrounds

Fonts are loaded from Google Fonts in the `<head>` of index.html:
PT Serif (headlines), Inter (body/UI), JetBrains Mono (labels and data).

## Known limitations / next steps for a real build

- This is a single conceptual page; the real site architecture calls for
  separate pages per pillar (Execute / Analyze / Transform), About, Insights,
  and Contact — currently these all live as sections on one page for ease
  of review.
- The contact form, newsletter signup, and capability statement download
  need a backend or form service (e.g. Formspree, a serverless function,
  or your CMS of choice) before they're functional.
- Insight article cards link to "#" placeholders and need real URLs once
  articles exist.
- Replace the placeholder NAICS codes / UEI / CAGE mockup text in the
  capability statement preview with real values before using publicly.
- No analytics, cookie consent, or SEO meta tags are included yet.
