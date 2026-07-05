"use client";

import { FormEvent, useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import { useLanguage } from "../i18n/LanguageContext";
import { primaryButton } from "../lib/sectionClass";
import styles from "../styles/sections/rsvp.module.css";

type SubmitState = "idle" | "sending" | "success" | "error";
type FieldError = "name" | "attendance" | "guests" | null;

const MIN_GUESTS = 1;
const MAX_GUESTS = 5;
const MAX_NAME_LENGTH = 80;
const MAX_MESSAGE_LENGTH = 500;

function getEmailJsConfig() {
  return {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID?.trim() ?? "",
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID?.trim() ?? "",
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?.trim() ?? "",
  };
}

function getEmailJsErrorMessage(error: unknown): string {
  if (error && typeof error === "object") {
    const record = error as { text?: string; message?: string };
    return record.text?.trim() || record.message?.trim() || "";
  }
  return "";
}

function clampGuests(raw: string): number {
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n)) return MIN_GUESTS;
  return Math.min(MAX_GUESTS, Math.max(MIN_GUESTS, n));
}

export default function RsvpForm() {
  const { t } = useLanguage();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldError, setFieldError] = useState<FieldError>(null);
  const [attendance, setAttendance] = useState<"" | "yes" | "no">("");

  const emailJsConfig = useMemo(() => getEmailJsConfig(), []);
  const isConfigured = Boolean(
    emailJsConfig.serviceId && emailJsConfig.templateId && emailJsConfig.publicKey
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setFieldError(null);

    if (!isConfigured) {
      setSubmitState("error");
      setErrorMessage(t.rsvp.errorConfig);
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const attendanceValue = String(formData.get("attendance") ?? "");
    const message = String(formData.get("message") ?? "").trim();

    if (!name) {
      setSubmitState("error");
      setErrorMessage(t.rsvp.errorName);
      setFieldError("name");
      return;
    }

    if (attendanceValue !== "yes" && attendanceValue !== "no") {
      setSubmitState("error");
      setErrorMessage(t.rsvp.errorAttendance);
      setFieldError("attendance");
      return;
    }

    let guestCount = 0;
    if (attendanceValue === "yes") {
      const guestsRaw = String(formData.get("guests") ?? "");
      const parsed = Number.parseInt(guestsRaw, 10);
      if (!Number.isFinite(parsed) || parsed < MIN_GUESTS || parsed > MAX_GUESTS) {
        setSubmitState("error");
        setErrorMessage(t.rsvp.errorGuests);
        setFieldError("guests");
        return;
      }
      guestCount = clampGuests(guestsRaw);
    }

    setSubmitState("sending");

    const attendanceLabel =
      attendanceValue === "yes" ? t.rsvp.attendanceYes : t.rsvp.attendanceNo;

    try {
      await emailjs.send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        {
          from_name: name,
          attendance: attendanceLabel,
          guest_count: attendanceValue === "yes" ? String(guestCount) : "0",
          message: message || t.rsvp.emailNoMessage,
          wedding_couple: "Phyo & Mon",
        },
        { publicKey: emailJsConfig.publicKey }
      );

      setSubmitState("success");
      setErrorMessage("");
      setFieldError(null);
      form.reset();
      setAttendance("");
    } catch (error) {
      console.error("EmailJS RSVP error:", error);
      setSubmitState("error");
      const detail = getEmailJsErrorMessage(error);
      setErrorMessage(detail ? `${t.rsvp.errorSend} (${detail})` : t.rsvp.errorSend);
    }
  }

  const isSending = submitState === "sending";

  if (submitState === "success") {
    return (
      <div className={styles.rsvpSuccessPanel} role="status">
        <div className={styles.rsvpSuccessIcon} aria-hidden="true">
          ♥
        </div>
        <h3 className={styles.rsvpSuccessTitle}>{t.rsvp.successTitle}</h3>
        <p className={styles.rsvpSuccessText}>{t.rsvp.successHint}</p>
      </div>
    );
  }

  return (
    <form className={styles.rsvpForm} onSubmit={handleSubmit} noValidate>
      <div className={styles.formGroup}>
        <label htmlFor="name">{t.rsvp.nameLabel}</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder={t.rsvp.namePlaceholder}
          required
          maxLength={MAX_NAME_LENGTH}
          autoComplete="name"
          disabled={isSending}
          aria-invalid={fieldError === "name" || undefined}
          onChange={() => fieldError === "name" && setFieldError(null)}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="attendance">{t.rsvp.attendanceLabel}</label>
        <select
          id="attendance"
          name="attendance"
          required
          disabled={isSending}
          value={attendance}
          onChange={(event) => {
            setAttendance(event.target.value as "" | "yes" | "no");
            if (fieldError === "attendance") setFieldError(null);
          }}
          aria-invalid={fieldError === "attendance" || undefined}
        >
          <option value="" disabled>
            {t.rsvp.attendancePlaceholder}
          </option>
          <option value="yes">{t.rsvp.attendanceYes}</option>
          <option value="no">{t.rsvp.attendanceNo}</option>
        </select>
      </div>

      {attendance === "yes" && (
        <div className={styles.formGroup}>
          <label htmlFor="guests">{t.rsvp.guestsLabel}</label>
          <input
            type="number"
            id="guests"
            name="guests"
            min={MIN_GUESTS}
            max={MAX_GUESTS}
            step={1}
            defaultValue={1}
            inputMode="numeric"
            required
            disabled={isSending}
            aria-invalid={fieldError === "guests" || undefined}
            onChange={() => fieldError === "guests" && setFieldError(null)}
          />
        </div>
      )}

      <div className={styles.formGroup}>
        <label htmlFor="message">{t.rsvp.messageLabel}</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={MAX_MESSAGE_LENGTH}
          disabled={isSending}
        />
      </div>

      {submitState === "error" && errorMessage && (
        <p className={`${styles.rsvpStatus} ${styles.rsvpStatusError}`} role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        className={primaryButton(styles, "rsvpSubmitBtn")}
        disabled={isSending}
      >
        {isSending ? t.rsvp.sending : t.rsvp.submit}
      </button>
    </form>
  );
}
