export const EMAIL_TEMPLATE_SCHEMA = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
  required: ["name"],
} as const;

export const EMAIL_TEMPLATE_OBJECT_SCHEMA = {
  ...EMAIL_TEMPLATE_SCHEMA,
  properties: {
    ...EMAIL_TEMPLATE_SCHEMA.properties,
    subject: { type: "string" },
    body: { type: "string" },
  },
  required: [...EMAIL_TEMPLATE_SCHEMA.required, "subject", "body"],
} as const;
