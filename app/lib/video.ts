/** Path under `public/` — add your file or change the filename here */
export const WEDDING_VIDEO_SRC = "/wedding-video.mp4";

/** Optional poster image (first frame preview). Set to undefined to skip. */
export const WEDDING_VIDEO_POSTER = "/ourStory.jpg";

/**
 * Custom window events the video element dispatches so the background
 * MusicPlayer can pause/resume itself without the two components needing
 * to share state.
 */
export const VIDEO_PLAYING_EVENT = "wedding:video-playing";
export const VIDEO_PAUSED_EVENT = "wedding:video-paused";
