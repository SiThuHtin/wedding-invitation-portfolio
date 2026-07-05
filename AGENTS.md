<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Styling: global vs CSS modules

### CSS modules (default)

- **Page sections:** `app/styles/sections/*.module.css`, merged in `app/styles/pageStyles.ts`
- **Components:** co-located `ComponentName.module.css` (cover, countdown, music player, language toggle)
- **Section-specific pieces:** import the section module directly (e.g. `rsvp.module.css`, `details.module.css`)

Put all section-specific layout and visuals in modules (`styles.sectionTitle`, `styles.detailCard`, etc.).

### Layout helpers (modules, not globals)

Use these from `shared.module.css` (via `pageStyles` or `sectionShell()` in `app/lib/sectionClass.ts`):

| Class | Role |
|-------|------|
| `sectionBlock` | Vertical section padding (`--space-section-y`) |
| `sectionInner` | Centered max-width column (`1200px` + horizontal padding) |
| `textCenter` | Centered text for titles/subtitles |

**New section pattern:**

```tsx
import { sectionShell } from "./lib/sectionClass";
import styles from "./styles/pageStyles";

<motion.section className={sectionShell(styles, "sectionSurface")}>
  <h2 className={styles.sectionTitle}>…</h2>
</motion.section>
```

Surface tokens: `sectionSurface` (cream), `sectionTinted` (blush gradient), `detailsSection` (cream, details only).

### Global classes (`app/globals.css`)

Reserved for **cross-cutting utilities** only:

| Class | Use |
|-------|------|
| `btn` | Primary button base — always pair with a **module modifier** (`ctaBtn`, `btnSecondary`, `rsvpSubmitBtn`) |
| `container`, `section`, `text-center` | Legacy aliases (same rules as module layout classes); **do not use in new code** |

**Buttons:**

```tsx
import { primaryButton } from "./lib/sectionClass";

<a className={primaryButton(styles, "ctaBtn")}>RSVP</a>
<button className={`btn ${styles.btnSecondary}`}>Get Directions</button>
```

### Breakpoints

Mobile `≤639px` · Tablet `640–1023px` · Desktop `≥1024px` (see comment in `globals.css`).
