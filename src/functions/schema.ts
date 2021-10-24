export const EMAIL_TEMPLATE_BASE_SCHEMA = {
  type: "object",
  properties: {
    TemplateName: {
      type: "string",
    },
  },
  required: ["TemplateName"],
} as const;

export const EMAIL_TEMPLATE_SCHEMA = {
  type: "object",
  properties: {
    ...EMAIL_TEMPLATE_BASE_SCHEMA.properties,
    SubjectPart: {
      type: "string",
    },
    HtmlPart: {
      type: "string",
    },
  },
  required: [...EMAIL_TEMPLATE_BASE_SCHEMA.required, "SubjectPart", "HtmlPart"],
} as const;

export const SEND_EMAIL_SCHEMA = {
  type: "object",
  properties: {
    ...EMAIL_TEMPLATE_BASE_SCHEMA.properties,
    Source: { type: "string" },
    Destinations: {
      type: "array",
      items: {
        type: "object",
        properties: {
          Destination: {
            type: "object",
            properties: {
              ToAddresses: {
                type: "array",
                items: { type: "string" },
              },
            },
            required: ["ToAddresses"],
          },
          ReplacementTemplateData: { type: "string" },
        },
        required: ["Destination"],
      },
    },
    DefaultTemplateData: { type: "string" },
  },
  required: [...EMAIL_TEMPLATE_BASE_SCHEMA.required, "Source", "Destinations"],
} as const;
