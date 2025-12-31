"use client";

import { useState } from "react";
import Button from "@/ui/atoms/Button/Button";
import styles from "./EmailCapture.module.scss";

export default function EmailCapture({ locale, copy }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email) return;

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale, source: "hero" }),
      });

      if (response.ok) {
        setStatus("success");
        setMessage(copy.success);
        setEmail("");
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      setStatus("error");
      setMessage(copy.error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="email-capture">
        {copy.label}
      </label>
      <div className={styles.controls}>
        <input
          id="email-capture"
          type="email"
          required
          value={email}
          placeholder={copy.placeholder}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" variant="primary" size="md" disabled={status === "submitting"}>
          {status === "submitting" ? "..." : copy.cta}
        </Button>
      </div>
      {message ? <p className={styles.message}>{message}</p> : null}
    </form>
  );
}
