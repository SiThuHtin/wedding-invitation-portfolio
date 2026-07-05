"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./MusicPlayer.module.css";
import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { VIDEO_PAUSED_EVENT, VIDEO_PLAYING_EVENT } from "../lib/video";

export default function MusicPlayer() {
  const prefersReducedMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Remember whether music was playing when the video took over,
  // so we only auto-resume if the guest hadn't manually paused.
  const wasPlayingBeforeVideoRef = useRef(false);
  // Mirror of isPlaying for use inside stable event listeners. Some mobile
  // OSes (iOS Safari) pause the audio element themselves the moment the
  // video takes the audio session, so `audio.paused` is unreliable as a
  // source of truth — we use the React-owned state instead.
  const isPlayingRef = useRef(false);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            const startMusic = () => {
              if (audioRef.current && !isPlaying) {
                audioRef.current
                  .play()
                  .then(() => {
                    setIsPlaying(true);
                  })
                  .catch(() => {});
              }
              window.removeEventListener("click", startMusic);
              window.removeEventListener("touchstart", startMusic);
            };
            window.addEventListener("click", startMusic);
            window.addEventListener("touchstart", startMusic);
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pause/resume background music when the wedding video plays/pauses.
  useEffect(() => {
    const handleVideoPlaying = () => {
      const audio = audioRef.current;
      if (!audio) return;
      // Use the React-owned intent (isPlayingRef) rather than audio.paused —
      // iOS may have already paused the element by the time we run.
      if (!isPlayingRef.current) return;
      wasPlayingBeforeVideoRef.current = true;
      // Muting (not just pausing) keeps the audio element "primed" on iOS,
      // so unmuting after the video ends works without needing a fresh
      // user gesture — that's the actual mobile bug fix.
      audio.muted = true;
      if (!audio.paused) audio.pause();
      setIsPlaying(false);
    };

    const handleVideoPaused = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (!wasPlayingBeforeVideoRef.current) return;
      wasPlayingBeforeVideoRef.current = false;
      audio.muted = false;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    };

    window.addEventListener(VIDEO_PLAYING_EVENT, handleVideoPlaying);
    window.addEventListener(VIDEO_PAUSED_EVENT, handleVideoPaused);
    return () => {
      window.removeEventListener(VIDEO_PLAYING_EVENT, handleVideoPlaying);
      window.removeEventListener(VIDEO_PAUSED_EVENT, handleVideoPaused);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Ensure we're audible — the video coordination logic may have
        // muted us, and a manual tap should always start audible music.
        audioRef.current.muted = false;
        audioRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={styles.playerContainer}>
      <audio ref={audioRef} src="/canonind.mp3" loop autoPlay preload="auto" />

      <motion.button
        className={`${styles.musicBtn} ${isPlaying ? styles.playing : ""}`}
        onClick={togglePlay}
        whileHover={prefersReducedMotion ? undefined : { scale: 1.1 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.9 }}
        initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: prefersReducedMotion ? 0 : 1 }}
        aria-label={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? (
          <svg className={styles.icon} viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        ) : (
          <svg className={styles.icon} viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </motion.button>
    </div>
  );
}
