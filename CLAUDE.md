# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with the hago Hugo theme.

## Project Overview

Hago is a minimal Hugo blog theme with a two-column layout. It's used as a git submodule in the parent blog repository at `/Users/gyuha/workspace/blog`.

## Common Commands

### SCSS Compilation (Development)

```bash
npm run sass    # Watch mode - auto-compiles scss/style.scss to static/css/style.css
npm start        # Alias for npm run sass
```

The theme uses `node-sass` for SCSS compilation. Run this from the theme root when making CSS changes.

### Testing Changes

Since this theme is a submodule:
1. Make changes in the theme directory
2. Run `task dev` from the parent blog (`/Users/gyuha/workspace/blog`) to see changes live
3. Changes are immediately reflected (no build step needed for Hugo)

### Publishing Theme Changes

The theme has its own git repository. After making changes:
```bash
git add .
git commit -m "description"
git push
```

Then update in the parent blog: `git submodule update --remote --merge`

## Theme Architecture

### Layout Structure

The theme uses Hugo's block system for flexible layouts:

```
layouts/
├── _default/
│   ├── baseof.html      # Base template with two-column grid
│   ├── single.html       # Single post page
│   ├── list.html        # List pages (tags, categories, homepage)
│   └── summary.html     # Post summary cards for listings
├── partials/
│   ├── head.html        # HTML head, Open Graph, CSS links
│   ├── header.html      # Navigation with search
│   ├── footer.html      # Scripts, code copying, TOC, Vanta.js, Analytics
│   ├── title_bar.html   # Dynamic title bar with video background
│   ├── post.html        # Full post with metadata, nav, comments
│   ├── side_*.html      # Sidebar widgets
│   └── pagination.html  # Pagination controls
├── categories/taxonomy.html  # Category listing
├── tags/taxonomy.html        # Tag listing
└── index.html               # Homepage
```

### Two-Column Layout Pattern

`baseof.html` establishes a Bootstrap grid:
- **Main column** (col-12 col-lg-8): `{{ block "main" . }}`
- **Sidebar column** (col-12 col-md-8 col-lg-4): `{{ block "side" . }}`

Templates override these blocks:
- **index.html**: Main=paginated summaries, Side=categories+tags
- **single.html**: Main=post.html, Side=toc+post_tags
- **list.html**: Main=summaries, Side=categories+tags

### Sidebar Widget Partials

Each widget wraps content in a `sidebar-widget-area` div:
- `side_recent.html`: Recent posts (uses `widgets.recent_num` config)
- `side_toc.html`: Table of contents (`.TableOfContents`)
- `side_category.html`: Categories list
- `side_tags.html`: Tag cloud
- `side_post_tags.html`: Post-specific tags (`.Params.tags`)

### SCSS Architecture

```scss
@import "theme_color";    // Color variables
@import "variables";      // Fonts (Noto Sans KR, Ubuntu)
@import "mixin";          // Vendor prefixing utilities
@import "responsive";     // Breakpoint definitions
```

Edit files in `scss/` - the watch script will auto-compile to `static/css/style.css`.

## Key Features

### Code Block Copying

Located in `layouts/partials/footer.html` (lines 106-146):
- Adds "복사" (Copy) buttons to all `pre` blocks with class `post-content`
- Uses `navigator.clipboard.writeText()` API
- Changes button text to "복사됨!" for 2 seconds on success

### Sticky Elements

In `static/js/active.js`:
- Header becomes sticky after 20px scroll (`.header-area` adds `.sticky`)
- Sidebar becomes sticky after 157px scroll (`.post-sidebar-area` adds `.sticky`)
- Only applies to single post pages (checks for `#post-toc` element)

### TOC Auto-Highlight

In `footer.html` (lines 55-103):
- Adds IDs to headers without them (`section-N` format)
- Highlights current section in TOC on scroll
- Adds `toc-item` class to TOC links for styling

### Vanta.js Background

In `footer.html` (lines 42-54):
- Particle animation on `#waves` element in title bar
- Uses Three.js + Vanta.NET
- Color: `0x3fa4ff` (blue accent)

## Internationalization (i18n)

Translation files in `i18n/`:
- `kr.yaml`: Korean (default)
- `en.yaml`: English

Format:
```yaml
- id: key_name
  translation: "Translated text"
```

Usage in templates: `{{ i18n "key_name" }}`

Date formatting example uses Go template syntax:
```yaml
- id: post_date_time
  translation: "{{ .Format \"2006년 01월 02일 15시 04분\" }}"
```

## Dependencies

### Vendor Libraries (static/vendor/)

- jQuery 2.2.4
- Bootstrap 4.4.1 (CSS + JS + Popper)
- Font Awesome 5.8.2
- Magnific Popup
- WOW animate.js
- jQuery.easing.1.3
- jQuery.scrollUp

### CDN Dependencies

Loaded in `footer.html`:
- highlight.js 9.15.6 (code syntax highlighting)
- Three.js r121
- Vanta.js (latest)

### NPM Dependencies

- `node-sass`: SCSS compilation

## Theme Components

### Title Bar (title_bar.html)

Displays above main content with:
- Video background (`#waves` div for Vanta.js)
- Dynamic H1: page title on pages, site title + subtitle on homepage
- Adds `top-video-small` class when page has a title

### Post Meta (post.html, summary.html)

Shows:
- Date with clock icon (`far fa-clock`)
- Category links with folder icon (`far fa-folder`)
- Next/Prev navigation on single posts
- Disqus comments (if `comments: true` in config)

### Pagination (pagination.html)

Bootstrap pagination with:
- First/Last page buttons (double arrows)
- Prev/Next buttons
- Ellipsis for large page counts
- Active page highlighting

## Configuration Reference

Theme expects these `config.toml` settings:

```toml
baseURL = "https://example.com/"
languageCode = "ko-KR"
theme = "hago"
metaDataFormat = "yaml"
disqusShortname = "your-disqus"
[pagination]
  pagerSize = 7
[Params]
  logo = "/img/logo-title.png"
  favicon = "/favicon.ico"
  comments = true
[markup.goldmark.renderer]
  unsafe = true  # Allow HTML in markdown
[markup.highlight]
  style = "fruity"
  lineNumbersInTable = true
[Services.GoogleAnalytics]
  ID = "G-XXXXXXXXXX"
```
