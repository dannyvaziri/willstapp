"use client";

import { FormEvent, useState } from "react";
import type { FormType } from "@/lib/forms/types";

type FieldName = "name" | "email" | "message";

type SignupFormProps = {
  formType: FormType;
  title: string;
  description: string;
  buttonLabel: string;
  fields: FieldName[];
};

export function SignupForm({
  formType,
  title,
  description,
  buttonLabel,
  fields
}: SignupFormProps) {
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("");
    setIsError(false);

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/forms", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        formType,
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message")
      })
    });
    const result = (await response.json()) as { ok: boolean; message: string };

    setStatus(result.message);
    setIsError(!result.ok);
    setIsSubmitting(false);
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <div>
        <h3>{title}</h3>
        <p className="form-note">{description}</p>
      </div>
      {fields.includes("name") ? (
        <div className="field">
          <label htmlFor={`${formType}-name`}>Name</label>
          <input id={`${formType}-name`} name="name" autoComplete="name" required />
        </div>
      ) : null}
      {fields.includes("email") ? (
        <div className="field">
          <label htmlFor={`${formType}-email`}>Email</label>
          <input
            id={`${formType}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>
      ) : null}
      {fields.includes("message") ? (
        <div className="field">
          <label htmlFor={`${formType}-message`}>Message</label>
          <textarea id={`${formType}-message`} name="message" />
        </div>
      ) : null}
      <button className="button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : buttonLabel}
      </button>
      <p className={`form-status${isError ? " error" : ""}`} aria-live="polite">
        {status}
      </p>
    </form>
  );
}
