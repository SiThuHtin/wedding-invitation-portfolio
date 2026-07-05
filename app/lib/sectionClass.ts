import pageStyles from "../styles/pageStyles";

type Styles = typeof pageStyles;
type SurfaceKey = "sectionSurface" | "sectionTinted" | "detailsSection";

/** Full-bleed section: vertical padding + background only */
export function sectionShell(styles: Styles = pageStyles, surface: SurfaceKey) {
  return [styles.sectionBlock, styles[surface]].filter(Boolean).join(" ");
}

/** Centered content column inside a section */
export function sectionInnerWrap(
  styles: Styles = pageStyles,
  options?: { centered?: boolean }
) {
  const centered = options?.centered !== false;
  return [styles.sectionInner, centered ? styles.textCenter : ""]
    .filter(Boolean)
    .join(" ");
}

/** Primary button base (global) + module-specific modifier */
export function primaryButton(styles: Styles, modifier: keyof Styles & string) {
  return `btn ${styles[modifier]}`;
}
