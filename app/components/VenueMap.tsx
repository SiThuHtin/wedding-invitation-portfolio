"use client";

import { useMemo } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import type { Locale } from "../i18n/translations";
import { primaryButton } from "../lib/sectionClass";
import { VENUE_LAT, VENUE_LNG, VENUE_PLACE_URL } from "../lib/venue";
import MapPinIcon from "./MapPinIcon";
import styles from "../styles/sections/details.module.css";

function mapHl(locale: Locale): string {
  if (locale === "ja") return "ja";
  return "en";
}

export default function VenueMap() {
  const { t, locale } = useLanguage();

  const embedUrl = useMemo(
    () =>
      `https://www.google.com/maps?q=${VENUE_LAT},${VENUE_LNG}&z=17&hl=${mapHl(locale)}&output=embed`,
    [locale]
  );

  return (
    <div className={styles.mapSection}>
      <h3 className={styles.mapTitle}>{t.map.title}</h3>
      <p className={styles.mapSubtitle}>{t.map.subtitle}</p>
      <div className={styles.mapFrame}>
        <iframe
          title={t.map.iframeTitle}
          src={embedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <a
        href={VENUE_PLACE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${primaryButton(styles, "btnSecondary")} ${styles.mapDirectionsBtn}`}
      >
        <MapPinIcon className={styles.directionsIcon} />
        {t.map.directions}
      </a>
    </div>
  );
}
