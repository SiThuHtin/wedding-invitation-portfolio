"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import Countdown from "./components/Countdown";
import InvitationCover from "./components/InvitationCover";
import RsvpForm from "./components/RsvpForm";
import MapPinIcon from "./components/MapPinIcon";
import VenueMap from "./components/VenueMap";
import { useLanguage } from "./i18n/LanguageContext";
import { GALLERY_ITEMS } from "./lib/gallery";
import WeddingVideo from "./components/WeddingVideo";
import { primaryButton, sectionInnerWrap, sectionShell } from "./lib/sectionClass";
import styles from "./styles/pageStyles";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <InvitationCover onOpen={() => console.log("Invitation Opened")} />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroOverlay}></div>
          <Image
            src="/registry-book-hero.jpg?v=2"
            alt={t.hero.bgAlt}
            fill
            priority
            quality={100}
            sizes="100vw"
            className={styles.heroBg}
          />
          <motion.div
            className={styles.heroContent}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p variants={fadeInUp} className={styles.heroEyebrow}>
              {t.hero.eyebrow}
            </motion.p>
            <motion.h1 variants={fadeInUp} className={styles.scriptTitle}>
              Phyo & Mon
            </motion.h1>
            <motion.p variants={fadeInUp} className={styles.heroDate}>
              {t.hero.date}
            </motion.p>
            <motion.div variants={fadeInUp}>
              <a href="#rsvp" className={primaryButton(styles, "ctaBtn")}>
                {t.hero.rsvpCta}
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.heroScrollWrapper}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
          >
            <a
              href="#countdown"
              className={styles.heroScroll}
              aria-label={t.hero.scrollHint}
            >
              <span className={styles.heroScrollText}>{t.hero.scrollLabel}</span>
              <span className={styles.heroScrollLine} aria-hidden="true" />
              <svg
                className={styles.heroScrollIcon}
                viewBox="0 0 24 24"
                width="20"
                height="20"
                aria-hidden="true"
              >
                <path
                  d="M6 9l6 6 6-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </motion.div>
        </section>

        <motion.section
          id="countdown"
          className={sectionShell(styles, "sectionSurface")}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className={sectionInnerWrap(styles)}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className={styles.sectionTitle}>
              {t.countdown.title}
            </motion.h2>
            <motion.div variants={scaleUp}>
              <Countdown />
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.hr
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className={styles.divider}
        />

        <motion.section
          className={`${sectionShell(styles, "sectionSurface")} ${styles.storySection}`}
          id="story"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className={sectionInnerWrap(styles)}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className={`${styles.sectionTitle} ${styles.storyTitle}`}
            >
              {t.story.title}
            </motion.h2>
            
            <motion.div className={styles.storyGrid}>
              <motion.div variants={fadeInUp} className={styles.storyContent}>
                <p>{t.story.p1}</p>
                <p>{t.story.p2}</p>
                <p>{t.story.p3}</p>
                <p>{t.story.p4}</p>
                <p>{t.story.p5}</p>
                <p>{t.story.p6}</p>
                <p>{t.story.p7}</p>
              </motion.div>
              <motion.div variants={scaleUp} className={styles.storyImageWrapper}>
                <Image
                  src="/ourStory.jpg?v=2"
                  alt={t.story.imageAlt}
                  width={500}
                  height={600}
                  sizes="(max-width: 991px) min(100vw, 22rem), 40vw"
                  className={styles.storyImage}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          className={sectionShell(styles, "sectionTinted")}
          id="gallery"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className={sectionInnerWrap(styles)}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className={styles.sectionTitle}>
              {t.gallery.title}
            </motion.h2>
            <motion.p variants={fadeInUp} className={styles.sectionSubtitle}>
              {t.gallery.subtitle}
            </motion.p>
            <motion.div className={styles.galleryGrid}>
              {GALLERY_ITEMS.map((item, index) => {
                const isFeatured = index === 0 || index === 5;
                return (
                  <motion.div
                    key={item.src}
                    variants={scaleUp}
                    className={styles.galleryItem}
                  >
                    <Image
                      src={item.src}
                      alt={t.gallery[item.altKey]}
                      fill
                      sizes={
                        isFeatured
                          ? "(max-width: 639px) 100vw, (max-width: 1023px) 66vw, 50vw"
                          : "(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 33vw"
                      }
                      className={styles.galleryImage}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          className={sectionShell(styles, "sectionSurface")}
          id="video"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className={sectionInnerWrap(styles)}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className={styles.sectionTitle}>
              {t.video.title}
            </motion.h2>
            {/* <motion.p variants={fadeInUp} className={styles.sectionSubtitle}>
              {t.video.subtitle}
            </motion.p> */}
            <motion.div variants={scaleUp} className={styles.videoWrap}>
              <WeddingVideo
                ariaLabel={t.video.ariaLabel}
                playLabel={t.video.playLabel}
              />
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.hr
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className={styles.divider}
        />

        <motion.section
          className={sectionShell(styles, "detailsSection")}
          id="details"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className={sectionInnerWrap(styles)}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className={styles.sectionTitle}>
              {t.details.title}
            </motion.h2>
            <motion.p variants={fadeInUp} className={styles.sectionSubtitle}>
              {t.details.subtitle}
            </motion.p>
            <motion.div variants={scaleUp} className={styles.detailsContent}>
            <motion.div variants={fadeInUp} className={styles.detailCard}>
              <div className={styles.detailCardHeader}>
                <span className={styles.detailCardIcon}>💐</span>
                <h3>{t.details.ceremony}</h3>
              </div>
              <div className={styles.detailCardBody}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>{t.details.dateLabel}</span>
                  <span className={styles.detailValue}>{t.details.dateValue}</span>
                </div>
                <div className={styles.timelineBlock}>
                  <span className={styles.timelineHeading}>{t.details.schedule}</span>
                  <ol className={styles.timeline}>
                    <li className={styles.timelineItem}>
                      <div className={styles.timelineMarker} aria-hidden="true" />
                      <div className={styles.timelineContent}>
                        <time className={styles.timelineTime} dateTime="2026-06-27T10:00/2026-06-27T11:00">
                          {t.details.event1Time}
                        </time>
                        <p className={styles.timelineTitle}>{t.details.event1Title}</p>
                      </div>
                    </li>
                    <li className={styles.timelineItem}>
                      <div className={styles.timelineMarker} aria-hidden="true" />
                      <div className={styles.timelineContent}>
                        <time className={styles.timelineTime} dateTime="2026-06-27T11:00/2026-06-27T14:00">
                          {t.details.event2Time}
                        </time>
                        <p className={styles.timelineTitle}>{t.details.event2Title}</p>
                      </div>
                    </li>
                  </ol>
                </div>
                <div className={styles.detailLocation}>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>{t.details.venueLabel}</span>
                    <span className={styles.detailValue}>
                      <span className={styles.locationLine}>
                        <MapPinIcon className={styles.locationPin} />
                        <span>{t.details.venueValue}</span>
                      </span>
                    </span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>{t.details.addressLabel}</span>
                    <span className={styles.detailValue}>
                      <span className={styles.locationLine}>
                        <MapPinIcon className={styles.locationPin} />
                        <span>
                          {t.details.addressValue}
                          <span className={styles.detailValueNote}>{t.details.addressNote}</span>
                        </span>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className={styles.detailsMapWrap}>
              <VenueMap />
            </motion.div>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          className={sectionShell(styles, "sectionTinted")}
          id="rsvp"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className={sectionInnerWrap(styles)}
            variants={staggerContainer}
          >
            <motion.div className={styles.rsvpSectionHeader}>
              <motion.h2 variants={fadeInUp} className={styles.sectionTitle}>
                {t.rsvp.title}
              </motion.h2>
              <motion.p variants={fadeInUp} className={styles.sectionSubtitle}>
                {t.rsvp.subtitle}
              </motion.p>
              <motion.p variants={fadeInUp} className={styles.rsvpDeadline}>
                {t.rsvp.deadline}
              </motion.p>
              <motion.div variants={scaleUp} className={`${styles.rsvpWrapper} ${styles.glassCard}`}>
                <RsvpForm />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.section>

        <footer className={styles.footer}>
          <div className={styles.footerAccent} aria-hidden="true" />
          <p className={styles.footerSignoff}>{t.footer.signOff}</p>
          <p className={styles.footerCopyright}>{t.footer.copyright}</p>
        </footer>
      </main>
    </>
  );
}
