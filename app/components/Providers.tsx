"use client";

import { MotionConfig } from "framer-motion";
import { LanguageProvider } from "../i18n/LanguageContext";
import LanguageToggle from "./LanguageToggle";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <LanguageToggle />
        {children}
      </MotionConfig>
    </LanguageProvider>
  );
}
