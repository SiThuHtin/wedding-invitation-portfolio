"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useLanguage } from "../i18n/LanguageContext";
import styles from "./InvitationCover.module.css";

interface InvitationCoverProps {
  onOpen: () => void;
}

export default function InvitationCover({ onOpen }: InvitationCoverProps) {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleOpen = () => {
    if (isOpen) return;

    setIsOpen(true);

    setTimeout(
      () => {
        setIsVisible(false);
        onOpen();
      },
      prefersReducedMotion ? 350 : 2600
    );
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.cover}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] },
          }}
        >
          <motion.div
            className={styles.namesContainer}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={
              isOpen
                ? { opacity: 0, y: -16, pointerEvents: "none" as const }
                : { opacity: 1, scale: 1, y: 0 }
            }
            transition={{ delay: isOpen ? 0.4 : 0.3, duration: isOpen ? 0.5 : 1, ease: "easeOut" }}
          >
            <h1 className={styles.names}>Phyo & Mon</h1>
            <p className={styles.subtitle}>{t.cover.subtitle}</p>
          </motion.div>

          <motion.div
            className={styles.envelopeWrapper}
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={
              isOpen
                ? { y: -10, opacity: 1, scale: 1.015 }
                : { y: 0, opacity: 1, scale: 1 }
            }
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleOpen}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleOpen();
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={t.cover.openEnvelope}
          >
            <motion.div className={styles.envelopeGlow}></motion.div>
            <motion.div className={styles.envelope}></motion.div>

            <motion.div
              className={styles.invitationCard}
              animate={
                isOpen
                  ? { y: -240, opacity: 1, scale: 1.04, rotate: 0, zIndex: 12 }
                  : { y: 18, opacity: 1, scale: 0.985, rotate: 0, zIndex: 2 }
              }
              transition={{
                delay: isOpen ? 0.55 : 0,
                duration: 1.3,
                ease: [0.2, 0.9, 0.2, 1],
                zIndex: { delay: isOpen ? 0.45 : 1.0, duration: 0 },
              }}
            >
              <motion.div className={styles.invitationInner}>
                <motion.div className={styles.invitationFrame}>
                  {/* <span className={styles.cardEyebrow}>{t.cover.cardEyebrow}</span> */}
                  <span className={styles.saveTheDate}>{t.cover.saveTheDate}</span>
                  <motion.div className={styles.floralDivider} aria-hidden="true">
                    <span className={styles.floralLine} />
                    <span className={styles.floralBud} />
                    <span className={styles.floralLine} />
                  </motion.div>
                  <span className={styles.cardCaption}>{t.cover.cardCaption}</span>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              className={styles.flap}
              animate={isOpen ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: isOpen ? 0.1 : 0, ease: "easeOut" }}
            >
              <motion.div className={styles.flapBorder}></motion.div>
            </motion.div>

            <motion.div className={styles.pocket}>
              <motion.div className={styles.pocketCenter}></motion.div>
            </motion.div>
          </motion.div>

          <motion.button
            type="button"
            className={styles.hintText}
            animate={isOpen ? { opacity: 0, y: 12, filter: "blur(4px)" } : { opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            onClick={handleOpen}
            disabled={isOpen}
            aria-label={t.cover.openEnvelope}
          >
            <span className={styles.hintIcon} aria-hidden="true">
              ✦
            </span>
            <span className={styles.hintDesktop}>{t.cover.hintDesktop}</span>
            <span className={styles.hintMobile}>{t.cover.hintMobile}</span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
