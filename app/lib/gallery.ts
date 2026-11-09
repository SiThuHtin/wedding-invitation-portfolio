/** Gallery image paths (JPG and PNG both work in public/) */
export const GALLERY_ITEMS = [
  { src: "/gallery-enhanced-3.png?v=2", altKey: "alt1" },
  { src: "/gallery-enhanced-2.png?v=2", altKey: "alt2" },
  { src: "/gallery-enhanced-1.png?v=2", altKey: "alt3" },
  // Bump ?v= when you replace the file (same filename) so browser/Next.js fetch the new image
  { src: "/gallery-4-new.png?v=2", altKey: "alt4" },
  { src: "/gallery-5.jpg?v=2", altKey: "alt5" },
  { src: "/gallery-6.jpg?v=2", altKey: "alt6" },
  // { src: "/gallery-9.png", altKey: "alt9" },
] as const;

export type GalleryAltKey = (typeof GALLERY_ITEMS)[number]["altKey"];
