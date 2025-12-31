
"use client";
import { useState, useEffect, useCallback } from "react";
import { trackFormSubmit, trackEvent } from "@/lib/analytics";
import styles from "./WaitlistModal.module.scss";

export default function WaitlistModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleClose = useCallback(() => {
    trackEvent('modal_close', { modal_name: 'waitlist' });
    onClose();
  }, [onClose]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleClose]);

  // Track modal open event
  useEffect(() => {
    if (isOpen) {
      trackEvent('modal_open', { modal_name: 'waitlist' });
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name })
      });

      if (response.ok) {
        setStatus("success");
        // Track successful form submission
        trackFormSubmit("waitlist", true);

        setTimeout(() => {
          onClose();
          setEmail("");
          setName("");
          setStatus("idle");
        }, 2000);
      } else {
        setStatus("error");
        // Track failed form submission
        trackFormSubmit("waitlist", false, "Server error");
      }
    } catch (error) {
      setStatus("error");
      // Track failed form submission with network error
      trackFormSubmit("waitlist", false, error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="waitlist-modal-title"
      >
        <button
          className={styles.close}
          onClick={handleClose}
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {status === "success" ? (
          <div className={styles.success}>
            <div className={styles.checkmark}>✓</div>
            <h2>You&apos;re on the list!</h2>
            <p>Check your email for exclusive early access.</p>
          </div>
        ) : (
          <>
            <h2 id="waitlist-modal-title" className={styles.title}>Be the First to Access Waco3.io</h2>
            <p className={styles.subtitle}>
              Join our waitlist and get <strong>exclusive early access</strong> with a special discount when we launch.
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  disabled={status === "loading"}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="name">Name (Optional)</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  disabled={status === "loading"}
                />
              </div>

              {status === "error" && (
                <div className={styles.error}>
                  Something went wrong. Please try again.
                </div>
              )}

              <button
                type="submit"
                className={styles.submit}
                disabled={status === "loading"}
              >
                {status === "loading" ? "Joining..." : "Join Waitlist"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
