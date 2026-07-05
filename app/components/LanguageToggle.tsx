"use client";

import { LOCALES } from "../i18n/translations";
import { useLanguage } from "../i18n/LanguageContext";
import styles from "./LanguageToggle.module.css";

export default function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      className={styles.toggle}
      role="group"
      aria-label={t.lang.switchLabel}
    >
      {LOCALES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          className={`${styles.button} ${locale === code ? styles.buttonActive : ""}`}
          aria-pressed={locale === code}
          onClick={() => setLocale(code)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
