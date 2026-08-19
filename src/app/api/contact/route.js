// Contact form endpoint (replaces the WPForms submission on the old site).
//
// Delivery: set CONTACT_WEBHOOK_URL in .env.local to forward submissions to an
// email/automation service (Zapier, Make, n8n, Formspree, a CRM webhook, …).
// Without it the submission is logged on the server and still returns success,
// so the form works in development. Set it before going live.

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real people leave this empty.
  if (body.company) {
    return Response.json({ ok: true });
  }

  const firstName = String(body.firstName ?? "").trim();
  const email = String(body.email ?? "").trim();

  if (!firstName) {
    return Response.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const submission = {
    firstName,
    lastName: String(body.lastName ?? "").trim(),
    email,
    phone: String(body.phone ?? "").trim(),
    inquiryType: String(body.inquiryType ?? "").trim(),
    message: String(body.message ?? "").trim(),
    receivedAt: new Date().toISOString(),
  };

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (err) {
      console.error("[contact] webhook delivery failed:", err);
      return Response.json(
        { error: "We could not send your message right now. Please email us directly." },
        { status: 502 }
      );
    }
  } else {
    console.log("[contact] submission (no CONTACT_WEBHOOK_URL set):", submission);
  }

  return Response.json({ ok: true });
}
