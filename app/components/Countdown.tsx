"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { WEDDING_DATETIME_JST } from "../lib/wedding";
import styles from "./Countdown.module.css";

interface CountdownProps {
  /** ISO datetime; use WEDDING_DATETIME_JST or include +09:00 for Japan time */
  targetDate?: string;
}

/** Parse target as JST when no timezone is given (naive strings = Japan time). */
function targetTimeMs(iso: string): number {
  const hasOffset = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(iso.trim());
  return new Date(hasOffset ? iso : `${iso}+09:00`).getTime();
}

export default function Countdown({ targetDate = WEDDING_DATETIME_JST }: CountdownProps) {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const target = targetTimeMs(targetDate);
    if (Number.isNaN(target)) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const difference = target - now;

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!isMounted) {
    return <div className={styles.countdownContainer}>{t.countdown.loading}</div>;
  }

  return (
    <div className={styles.countdownContainer}>
      <div className={styles.timeBox}>
        <span className={styles.number}>{timeLeft.days}</span>
        <span className={styles.label}>{t.countdown.days}</span>
      </div>
      <div className={styles.timeBox}>
        <span className={styles.number}>{timeLeft.hours}</span>
        <span className={styles.label}>{t.countdown.hours}</span>
      </div>
      <div className={styles.timeBox}>
        <span className={styles.number}>{timeLeft.minutes}</span>
        <span className={styles.label}>{t.countdown.mins}</span>
      </div>
      <div className={styles.timeBox}>
        <span className={styles.number}>{timeLeft.seconds}</span>
        <span className={styles.label}>{t.countdown.secs}</span>
      </div>
    </div>
  );
}
