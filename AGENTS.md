# AGENTS.md

Repository guide for coding agents working in `themes/hago`.

## Project Scope

- This is a Hugo theme repository, not a standalone web app.
- It is often used as a git submodule under `/Users/gyuha/workspace/blog`.
- Main technologies: Hugo templates, SCSS, JavaScript, YAML i18n files.
- There is no formal unit-test or lint pipeline in this theme repo.

## Authoritative Files

- `package.json`: only npm scripts for local styling workflow.
- `CLAUDE.md`: operational notes for this theme and parent blog workflow.
- `layouts/`: Hugo template structure (`_default`, taxonomy pages, partials).
- `scss/`: source styles.
- `static/js/active.js`: jQuery-based runtime behavior.
- `i18n/en.yaml`, `i18n/kr.yaml`: translation dictionaries.

## Cursor / Copilot Rules Status

- `.cursorrules`: not found.
- `.cursor/rules/`: not found.
- `.github/copilot-instructions.md`: not found.
- Use this file plus existing repository patterns as guidance.

## Commands: Build / Lint / Test

Run from `/Users/gyuha/workspace/blog/themes/hago` unless specified.

### Install dependencies

```bash
npm install
```

### SCSS compile/watch

```bash
npm run sass
npm start
```

- `npm run sass` runs `node-sass --watch scss/style.scss static/css/style.css`.
- `npm start` is an alias to `npm run sass`.
- These are watch-mode commands; they do not exit automatically.

### Theme integration preview (from parent blog)

```bash
# run in /Users/gyuha/workspace/blog
task dev
```

- This workflow is documented in `CLAUDE.md`.
- Use it to validate pages rendered with this theme.

## Test and Lint Reality

- No `npm test` script in `package.json`.
- No `npm run lint` script in `package.json`.
- No ESLint, Prettier, Stylelint config files found.
- No CI workflow files detected in this repo snapshot.

### Single test execution

- Not available (no test runner configured).
- Closest equivalent for a "single test":
  1. Run `task dev` in the parent blog.
  2. Navigate to only the affected route/page.
  3. Verify behavior and rendering manually.

## Architecture Notes

- `layouts/_default/baseof.html` defines the two-column frame.
- Keep Hugo blocks unchanged unless explicitly requested:
  - `block "main"`
  - `block "side"`
- Sidebar functionality is composed via `layouts/partials/side_*.html`.
- Reuse existing partial boundaries before introducing new template files.

## Hugo Template Conventions

- Follow nearby formatting style; files mix compact and expanded formatting.
- Use Hugo partial idiom: `{{ partial "name.html" . }}`.
- Use i18n idiom: `{{ i18n "key_name" }}`.
- Preserve whitespace-trim markers where used (`{{-`, `-}}`).
- Keep URL helpers consistent with nearby code (`relURL`, `absURL`).
- Avoid renaming template blocks, core selectors, or section IDs.

## SCSS Conventions

- Edit SCSS sources only; avoid hand-editing compiled CSS unless requested.
- Maintain the import order in `scss/style.scss`:
  1. `theme_color`
  2. `variables`
  3. `mixin`
  4. `responsive`
- Prefer existing variables/mixins over new declarations.
- Naming patterns in existing code:
  - Variables: kebab-case with `$` (`$post-line-height`).
  - Mixins: kebab-case (`trans-duration`).
- Keep responsive logic tied to existing breakpoint variables in `_responsive.scss`.

## JavaScript Conventions

- Match style to the file being edited:
  - `static/js/active.js`: jQuery IIFE, `var`, plugin-style checks.
  - Inline scripts in `layouts/partials/footer.html`: modern `const`/`let` + DOM API.
- Do not perform style-wide modernization unless explicitly requested.
- Keep selector and class names stable (`.header-area`, `.post-sidebar-area`, `#TableOfContents`).
- Preserve explicit async success/failure handling (clipboard copy flow logs failures).

## i18n and Content Keys

- Keep `en.yaml` and `kr.yaml` key sets aligned.
- Preserve the list-of-maps schema:

```yaml
- id: menu_search_keyword
  translation: "Keyword"
```

- Keep translation key naming stable and underscore-based.
- Preserve date translations that use Go template format strings.

## Naming and File Placement

- Partial template naming style is lowercase with underscores (example: `side_recent.html`).
- Taxonomy templates belong in `layouts/categories/` and `layouts/tags/`.
- Keep behavior close to current ownership:
  - sticky header/sidebar logic: `static/js/active.js`
  - TOC highlighting, copy button, analytics script: `layouts/partials/footer.html`

## Safe Change Rules

- Make minimal, focused edits.
- Do not add dependencies unless the task requires it.
- Do not invent commands not present in scripts or repo docs.
- Prefer consistency with nearby files over broad refactoring.
- Preserve external behavior and selectors used by existing CSS/JS.

## Verification Checklist

1. If SCSS changed, run `npm run sass` (or `npm start`) and confirm CSS updates.
2. Run `task dev` in `/Users/gyuha/workspace/blog`.
3. Validate only affected pages/features (desktop and mobile):
   - header stickiness
   - sidebar sticky behavior on post pages
   - TOC active state updates
   - code block copy button behavior
4. If i18n keys changed, confirm both `i18n/en.yaml` and `i18n/kr.yaml` are updated.
