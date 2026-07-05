"use client";

import { useRef, useState } from "react";
import styles from "../styles/sections/video.module.css";
import {
  VIDEO_PAUSED_EVENT,
  VIDEO_PLAYING_EVENT,
  WEDDING_VIDEO_POSTER,
  WEDDING_VIDEO_SRC,
} from "../lib/video";

interface WeddingVideoProps {
  ariaLabel: string;
  playLabel: string;
}

export default function WeddingVideo({ ariaLabel, playLabel }: WeddingVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // Custom branded play overlay sits on top of the poster until the guest
  // taps it — and reappears after the video ends so they can replay it.
  const [showPlayOverlay, setShowPlayOverlay] = useState(true);

  const handlePlayClick = () => {
    const video = videoRef.current;
    if (!video) return;
    setShowPlayOverlay(false);
    video.play().catch(() => {
      // If autoplay was blocked for some reason, restore the overlay
      // so the guest can try again.
      setShowPlayOverlay(true);
    });
  };

  return (
    <div className={styles.videoFrame}>
      <video
        ref={videoRef}
        className={styles.videoPlayer}
        src={WEDDING_VIDEO_SRC}
        poster={WEDDING_VIDEO_POSTER}
        controls
        playsInline
        preload="metadata"
        aria-label={ariaLabel}
        onPlay={() => {
          setShowPlayOverlay(false);
          window.dispatchEvent(new Event(VIDEO_PLAYING_EVENT));
        }}
        onPause={() => {
          setIsLoading(false);
          // Bring the gold "tap to play" overlay back whenever the video
          // isn't playing — same affordance for initial play, mid-playback
          // resume, and "watch again" after ending.
          setShowPlayOverlay(true);
          window.dispatchEvent(new Event(VIDEO_PAUSED_EVENT));
        }}
        onEnded={() => {
          setIsLoading(false);
          setShowPlayOverlay(true);
          window.dispatchEvent(new Event(VIDEO_PAUSED_EVENT));
        }}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        onSeeking={() => setIsLoading(true)}
        onSeeked={() => setIsLoading(false)}
        onCanPlay={() => setIsLoading(false)}
      >
        <track kind="captions" />
      </video>

      <button
        type="button"
        className={`${styles.videoPlayOverlay} ${
          showPlayOverlay ? "" : styles.videoPlayOverlayHidden
        }`}
        onClick={handlePlayClick}
        aria-label={playLabel}
        tabIndex={showPlayOverlay ? 0 : -1}
        aria-hidden={!showPlayOverlay}
      >
        <span className={styles.videoPlayButton} aria-hidden="true">
          <svg
            className={styles.videoPlayIcon}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7L8 5z" />
          </svg>
        </span>
      </button>

      <div
        className={`${styles.videoSpinner} ${
          isLoading ? styles.videoSpinnerVisible : ""
        }`}
        aria-hidden="true"
      >
        <span className={styles.spinnerRing} />
      </div>
    </div>
  );
}
