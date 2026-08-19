// /privacy-policy page content. Edit copy here — components only handle layout.
//
// Wording is adapted from the standard WordPress privacy template, but the facts
// describe what THIS site actually does: one contact form (see
// src/app/api/contact/route.js), no comments, no user accounts, no analytics or
// advertising cookies, no third-party embeds. If any of that changes, update the
// matching section below and bump `lastUpdated`.

export const privacyMeta = {
  title: "Privacy Policy | Launch Laundry",
  description:
    "How Launch Laundry collects, uses, shares, and protects the personal data you provide through launchlaundry.com.my, and the rights you have over it.",
};

export const pageHero = {
  title: "Privacy Policy",
  breadcrumb: [{ label: "Launch Laundry", href: "/" }, { label: "Privacy Policy" }],
};

export const lastUpdated = "19 August 2026";

export const intro =
  "This policy explains what personal data Launch Laundry collects through launchlaundry.com.my, why we collect it, who we share it with, and how you can ask us to correct or delete it. We handle personal data in line with Malaysia’s Personal Data Protection Act 2010 (PDPA).";

export const sections = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: [
      "Our website address is: https://launchlaundry.com.my.",
      "Launch Laundry supplies commercial laundry machines, spare parts, and end-to-end laundromat setup services across Malaysia. In this policy, “we”, “us”, and “our” refer to Launch Laundry.",
      "You can reach us at 2, Jalan Hang Tuah, Bukit Bintang, City Centre, 55100 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur, Malaysia, or through the contact details at the end of this page.",
    ],
  },
  {
    id: "what-we-collect",
    title: "Enquiries and forms",
    body: [
      "This site does not host a comment section, a forum, or user accounts, so we do not collect comment data, profile pictures, or login details. The one place you actively give us personal data is our contact form.",
      { h: "What the contact form collects" },
      "When you submit an enquiry, we collect the details you type into the form:",
      {
        ul: [
          { b: "Name — ", t: "so we know who we are replying to." },
          { b: "Email address — ", t: "so we can send you a reply." },
          { b: "Phone number — ", t: "optional, if you would prefer we call or message you." },
          {
            b: "Enquiry type — ",
            t: "investor, franchise, commercial laundry, or general, so your enquiry reaches the right person.",
          },
          { b: "Your message — ", t: "whatever details you choose to include." },
        ],
      },
      "Please do not put sensitive personal data — identity card numbers, bank details, or health information — in the message field. If we need anything of that kind for a quotation or a contract, we will ask for it through a more appropriate channel.",
      { h: "Technical data collected automatically" },
      "As on almost every website, our hosting provider records standard server log data whenever a page is requested: your IP address, browser user agent string, the page requested, and the time of the request. This keeps the site running, helps us diagnose faults, and lets us detect abuse such as spam or automated attacks. We do not use it to build a profile of you.",
      "The contact form also carries a hidden “honeypot” field that a real visitor never sees or fills in. Submissions that complete it are discarded as automated spam. This checks the submission itself and involves no additional data about you.",
      { h: "Contacting us by other means" },
      "If you call, email, or message us on WhatsApp, we hold your contact details and the content of that conversation for as long as we need them to deal with your enquiry. WhatsApp is operated by Meta, not by us, so messages you send there are also governed by WhatsApp’s own privacy policy.",
    ],
  },
  {
    id: "media",
    title: "Media",
    body: [
      "Visitors cannot upload files to this website, so we receive no images or documents through it.",
      "If you send us photographs by email or WhatsApp — pictures of a site, a machine, or a fault, for example — bear in mind that image files can carry embedded location data (EXIF GPS). You may want to strip that data first if you would rather not share where the photo was taken.",
      "Images we publish on this website can be downloaded by any visitor, as is normal for a public web page.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    body: [
      "We keep cookies to a minimum. This website sets no advertising cookies, and we run no cross-site tracking or remarketing pixels.",
      "There is no login area, member portal, or comment form on this site, so none of the usual cookies for saving commenter details, remembering a login, or storing screen preferences are ever set.",
      "Our hosting provider may set strictly necessary cookies that keep the site secure and served correctly — routing your request to the right server, or blocking automated attacks. These do not identify you personally and are not used for marketing.",
      "If we add website analytics or advertising tools later, we will update this section and, where the law requires it, ask for your consent before those cookies are set. Most browsers also let you block or delete cookies from their settings.",
    ],
  },
  {
    id: "embedded-content",
    title: "Embedded content from other websites",
    body: [
      "Pages on this site may include embedded content from other websites — a video, a map, or a social media post, for instance. Embedded content from another website behaves in exactly the same way as if you had visited that other website directly.",
      "Those websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with the embedded content, including tracking that interaction if you have an account and are logged in to that website. We have no control over what they collect.",
      "At the time of writing, this website contains no third-party embeds. The links to WhatsApp, email, and phone are ordinary outbound links — nothing loads from those services unless you choose to follow the link.",
    ],
  },
  {
    id: "who-we-share-with",
    title: "Who we share your data with",
    body: [
      "We do not sell, rent, or trade your personal data. We share it only where that is needed to answer your enquiry or to run the website:",
      {
        ul: [
          { b: "Our own team — ", t: "the sales, service, or consultancy staff handling your enquiry." },
          { b: "Our website host — ", t: "which stores the site and its server logs on our behalf." },
          {
            b: "Our email and enquiry-routing provider — ",
            t: "contact form submissions are forwarded through an email or workflow service so they reach the right inbox.",
          },
          {
            b: "Professional advisers and authorities — ",
            t: "where we are legally required to disclose information, or need to establish or defend a legal claim.",
          },
        ],
      },
      "Each of these providers may only process your data on our instructions, for the purpose described above.",
    ],
  },
  {
    id: "retention",
    title: "How long we retain your data",
    body: [
      "Contact form submissions and enquiry correspondence are kept for as long as we are dealing with your enquiry, and for a reasonable period afterwards so we can pick the conversation back up if you return to us. Where an enquiry leads to a quotation, a sale, or a service contract, the related records are kept for as long as our tax and accounting obligations require.",
      "Server log data is kept only briefly, for security and troubleshooting, and is then overwritten or deleted.",
      "You can ask us to delete your enquiry data sooner — see your rights below. We will do so unless we are obliged to keep it for administrative, legal, or security reasons.",
    ],
  },
  {
    id: "your-rights",
    title: "What rights you have over your data",
    body: [
      "If you have contacted us through this website, you can ask us to:",
      {
        ul: [
          "Confirm what personal data we hold about you, and give you a copy of it.",
          "Correct anything inaccurate, incomplete, or out of date.",
          "Delete the personal data we hold about you.",
          "Stop using your details for marketing or follow-up, or withdraw consent you gave us earlier.",
          "Limit how we process your data in certain circumstances.",
        ],
      },
      "To make a request, email us using the details below. We may ask you to confirm your identity first, so that we do not disclose your data to someone else. We aim to respond within 21 days, as provided under the PDPA.",
      "These rights do not extend to data we are obliged to keep for administrative, legal, or security purposes — invoices and other accounting records, for example.",
    ],
  },
  {
    id: "where-data-is-sent",
    title: "Where your data is sent",
    body: [
      "Enquiries submitted through this site may be checked by an automated spam detection service before they reach us.",
      "Some of the service providers named above — our website host and our email provider — operate servers outside Malaysia. Where your data is transferred abroad, we take reasonable steps to ensure it stays protected to a standard comparable to the PDPA.",
    ],
  },
  {
    id: "security",
    title: "How we protect your data",
    body: [
      "This website is served over an encrypted HTTPS connection, so the details you type into the contact form are encrypted in transit. Access to enquiry data is limited to the staff who need it.",
      "No method of transmission or storage is completely secure, so we cannot guarantee absolute security — but we take reasonable technical and organisational measures to protect what you give us.",
    ],
  },
  {
    id: "children",
    title: "Children’s privacy",
    body: [
      "This website is aimed at businesses and adult investors. We do not knowingly collect personal data from children. If you believe a child has sent us personal data, contact us and we will delete it.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: [
      "We may update this policy as our website, our services, or our legal obligations change. The date at the top of this page shows when it was last revised. Where a change is significant, we will say so on this page.",
    ],
  },
];

export const contactBlock = {
  title: "Questions about this policy?",
  description:
    "If you have a question about this privacy policy, or you want to access, correct, or delete the personal data we hold about you, get in touch and we will help.",
  items: [
    { label: "Email", value: "info@launchlaundry.com.my", href: "mailto:info@launchlaundry.com.my" },
    { label: "Phone", value: "+601158888396", href: "tel:+601158888396" },
    {
      label: "Address",
      value:
        "2, Jalan Hang Tuah, Bukit Bintang, City Centre, 55100 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur, Malaysia",
    },
  ],
  cta: { label: "Contact us", href: "/contact-us" },
};
