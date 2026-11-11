# Flagstone Review Bench — Design System

**Status note:** this is a placeholder visual direction, not based on real reference sites (no UXKIN connection in this session). It's reasoned from the category instead: legal/document-review tools sit between "law firm" (trust, restraint, paper) and "dev tool" (structured, dense, functional) — closer to Linear or Stripe's documentation than to a typical gradient-hero SaaS landing page. Zac is sending real brand images and a new name separately; swap the tokens below once those land, keep the structure.

## Color

Warm, paper-like neutrals instead of cold SaaS gray-blue. One serious primary, one accent reserved specifically for risk — which doubles as the product's own concept (this is a red-flag tool, so "red" should mean something, not be decoration).

| Role | Light | Dark | Use |
|---|---|---|---|
| `bg` | `#f6f2e8` | `#15181a` | page background, warm paper / true dark |
| `surface` | `#fffdf8` | `#1d2123` | cards, panels, message bubbles |
| `surface-2` | `#eee8d9` | `#262b2e` | inputs, recessed areas |
| `border` | `#ded5bd` | `#343b3e` | all hairlines |
| `ink` | `#201d17` | `#e8e5dc` | primary text |
| `ink-muted` | `#6e6554` | `#9aa1a0` | secondary text, labels |
| `primary` | `#2f4a3d` | `#7fae93` | buttons, links, focus rings, assistant accent |
| `primary-ink` | `#f6f2e8` | `#0d1210` | text on filled primary |
| `severity-high` | `#8c2f2f` | `#e08787` | High-severity flags only — never decorative |
| `severity-med` | `#a67c1d` | `#e0b84a` | Medium-severity flags |
| `severity-low` | `#6e6554` | `#9aa1a0` | Low-severity flags (reuses ink-muted) |
| `success` | `#3d6b4f` | `#7fc9a3` | confirmations, "no issues found" |

No gradients anywhere. No purple. Dark mode is a true dark neutral, not a tinted navy.

## Typography

Two families, doing different jobs — a serif for anything with weight (brand, headings, the analytical parts of a review), a sans for interface chrome, and a mono for anything that's *quoted document text*, so a reader can tell at a glance "this is the contract talking" vs. "this is the tool talking."

- Display/headings: `Source Serif 4` (Google Fonts) — 600 weight
- UI/body/chat text: `Inter` (Google Fonts) — 400/500/600
- Quoted clauses, pasted documents: `JetBrains Mono` (Google Fonts) — 400

Scale (8 steps, 1.2ish ratio): 12 / 13 / 14 / 16 / 18 / 21 / 25 / 32px. Body/chat text sits at 14.5–15px, never below 12px. Line length in the chat column capped around 70–75ch.

## Spacing

4px base unit: 4, 8, 12, 16, 24, 32, 48, 64. Section/panel padding uses 16–24; gaps between distinct blocks use 24–32; page-level margins use 48+.

## Shape and depth

- Radius: 6px (controls, chips), 10px (cards, bubbles), 14px (large panels). Nothing pill-shaped except the severity tags.
- Shadows: one, used sparingly — `0 1px 2px rgba(0,0,0,.05), 0 4px 12px rgba(0,0,0,.04)` for the floating composer only. Everything else is flat, separated by `border`, not shadow. This is deliberately closer to a paper/document aesthetic than a floaty glass one.

## Components

- **Buttons**: primary (filled `primary`, `primary-ink` text), secondary (1px `border`, transparent fill, `ink` text), quiet (text-only, `ink-muted`, underline on hover). All have a visible focus ring (`2px solid primary`, 2px offset) — never focus:none.
- **Severity tag**: small pill, background = severity color at 12% opacity, text = severity color, label "High" / "Medium" / "Low".
- **Chat bubble — user**: right-aligned, `surface-2` fill, `ink` text, rounded 10px with the bottom-right corner squared slightly (4px) to read as "pointing" from the sender.
- **Chat bubble — assistant**: left-aligned, `surface` fill with a 3px left border in `primary`, serif used only for the SUMMARY/FLAGGED CLAUSES section labels inside it, body in sans, quoted clause text in mono inside a `surface-2` inset block.
- **Composer**: fixed to the bottom of the chat column, `surface` background, the one place using the shadow above, auto-growing textarea + attach button + send button inline.
- **Sidebar**: `surface-2` background, houses access code, document-type selector, and local review history — visually quieter than the chat column so the conversation stays the focus.
- **Inputs**: `surface-2` fill, 1px `border`, 6px radius, `primary` border + ring on focus.

## Imagery and icons

No stock imagery. Icons are a small set of inline SVG line icons (send, attach/paperclip, new-chat, sun/moon for theme) at 18–20px, 1.5px stroke — never emoji, never filled glyph icons.
