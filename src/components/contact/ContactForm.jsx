"use client";

import { useState } from "react";
import { form } from "@/data/contact";

const FIELD =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-navy outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-2 focus:ring-brand/20";

function Label({ htmlFor, children, required }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-semibold text-navy">
      {children}
      {required && <span className="ml-0.5 text-red-500">*</span>}
    </label>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const data = Object.fromEntries(new FormData(event.currentTarget));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Something went wrong.");
      setStatus("sent");
      event.target.reset();
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  }

  return (
    <section aria-label="Quick contact form" className="bg-white">
      <div className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
        <h2 className="text-3xl font-extrabold tracking-tight text-brand sm:text-4xl">
          {form.title}
        </h2>
        <p className="mt-2 text-sm text-body">{form.description}</p>

        {status === "sent" ? (
          <div
            role="status"
            className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-8 text-center"
          >
            <p className="text-lg font-bold text-emerald-800">Thank you — your message is on its way.</p>
            <p className="mt-2 text-sm text-emerald-700">
              Our team will get back to you within 24 business hours.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-5 text-sm font-semibold text-brand underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
            {/* Honeypot — hidden from people, catches most spam bots. */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <fieldset>
              <Label required>Name</Label>
              <div className="mt-2 grid gap-4 sm:grid-cols-2">
                <div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    autoComplete="given-name"
                    className={FIELD}
                  />
                  <span className="mt-1 block text-xs text-slate-500">First</span>
                </div>
                <div>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    className={FIELD}
                  />
                  <span className="mt-1 block text-xs text-slate-500">Last</span>
                </div>
              </div>
            </fieldset>

            <div>
              <Label htmlFor="email" required>
                Email
              </Label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={`${FIELD} mt-2`}
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className={`${FIELD} mt-2`}
              />
            </div>

            <div>
              <Label htmlFor="inquiryType">Inquiry Type</Label>
              <select id="inquiryType" name="inquiryType" defaultValue={form.inquiryTypes[0]} className={`${FIELD} mt-2`}>
                {form.inquiryTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <textarea id="message" name="message" rows={5} className={`${FIELD} mt-2 resize-y`} />
            </div>

            {status === "error" && (
              <p role="alert" className="text-sm font-medium text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-lg bg-brand px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : form.submitText}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
