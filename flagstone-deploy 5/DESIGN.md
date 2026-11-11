# Flagstone Review Bench — Design System (v2)

**Status note:** supersedes the v1 warm-paper system below this line only in spirit — kept here for history. Zac supplied two real reference images (Viedoc's marketing site, and a dark glassmorphic analytics dashboard) and approved a mockup built from them. This version is that direction, now built into the real app, not a placeholder.

## Direction

Two surfaces, two jobs:
- **Marketing landing page** (`/index.html`): light, matches Viedoc's structural pattern — sticky header with two CTAs, gradient-wash hero with a device mockup on the right, a capability/coverage section standing in for Viedoc's logo row (real content, not fabricated logos), honest build-status callout, dark CTA band, footer.
- **The actual tool** (`/bench/`): dark glass by default — this is "the AI" itself and needed to read as a real, confident product, not a generic light SaaS form. Light mode still exists as a toggle for anyone who wants it, using the same structure without the glass/glow effects.

## Color

| Role | Dark (tool default) | Light (fallback / landing page) | Use |
|---|---|---|---|
| `bg` | `#0a0a0d` | `#f6f2e8` | page background |
| `surface` | `rgba(255,255,255,.045)` glass | `#fffdf8` | cards, bubbles, sidebar |
| `surface-2` | `rgba(255,255,255,.075)` glass | `#eee8d9` | inputs, recessed tiles |
| `border` | `rgba(255,255,255,.09)` | `#ded5bd` | all hairlines |
| `ink` | `#f3f1ec` | `#201d17` | primary text |
| `ink-muted` | `#a0a0a8` | `#6e6554` | secondary text, labels |
| `primary` | `#b9a2ff` (soft violet) | `#55457d` / `#2f4a3d` (landing) | buttons, links, focus rings, assistant accent |
| `severity-high` | `#ff8a8a` | `#8c2f2f` | High flags only — never decorative |
| `severity-med` | `#ffce6b` | `#a67c1d` | Medium flags |
| `severity-low` | `#8bb6ff` | `#6e6554` | Low flags |

Background glow (dark/tool only): three large blurred radial blobs — violet `#7c5cff`, teal `#28d4c8`, amber `#ffb74d` — fixed behind the glass layer, `filter: blur(90–100px)`, low opacity. This is the one deliberate "gradient" in the whole system, confined to the app background; cards themselves stay flat glass, not gradient-filled.

## Typography

One family now, not two — General Sans (Fontshare, free/open), matched to the geometric rounded sans in the Viedoc reference rather than copying their actual licensed font file. Used for everything: brand, headings, UI, chat text. `JetBrains Mono` stays for quoted document text only, so a reader can still tell "this is the contract talking" from "this is the tool talking."

Headings use weight 600–700 with slightly tightened letter-spacing (-0.01 to -0.02em) to match the reference's tighter display setting; body stays default tracking.

## Shape and depth

- Radius: 8px (controls), 14px (bubbles/cards), 20px (large panels, pill buttons for CTAs).
- Glass cards (dark mode): `background: surface`, `border: 1px solid border`, `backdrop-filter: blur(20px)`. No shadow needed — the glow behind does the depth work.
- Light mode keeps the old flat/bordered treatment (no blur, no glow) since the glass effect only reads correctly over a dark/glow background.

## Components

- **Buttons**: pill-shaped now (999px radius), not the old small-radius rectangle. Primary = solid white (dark mode) / solid ink (light mode); secondary = glass/bordered outline.
- **Stat tiles** (new, sidebar): two small glass tiles showing *real* numbers computed from the device's own local review history — review count and total flags found (counted from stored output, never fabricated or hardcoded).
- **Severity tag**: unchanged in concept, recolored to the new palette, still a pill at 16–18% opacity fill.
- **Chat bubbles**: both roles now glass cards (`surface` / `surface-2`), assistant bubble keeps a 2px left accent border in `primary`.
- **Device mockup** (landing page only): a flat, original CSS-drawn laptop (bezel, camera dot, hinge line, base) — not a stock photo, not a literal clone of the reference's monitor-and-keyboard illustration — with a real screenshot of the actual dark-glass tool "open" on its screen.

## Imagery

Still no stock photography and no real people's photos anywhere, including in the dashboard-style hero — a flagged-clause preview tile stands in for where the reference used a person's photo.
