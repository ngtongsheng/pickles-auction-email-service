export const EMAIL_TEMPLATE_SCHEMA = {
  type: "object",
  properties: {
    name: { type: "string" },
    subject: { type: "string" },
    body: { type: "string" },
  },
  required: ["name", "subject", "body"],
} as const;
