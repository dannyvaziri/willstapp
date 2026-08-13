import type { FormAdapter, FormPayload, FormResult } from "./types";

function disabledAdapter(): FormAdapter {
  return {
    async submit(): Promise<FormResult> {
      return {
        ok: false,
        message:
          "This form is not configured yet. Please contact the campaign directly."
      };
    }
  };
}

function mockAdapter(): FormAdapter {
  return {
    async submit(payload: FormPayload): Promise<FormResult> {
      return {
        ok: true,
        message: `Development mock received ${payload.formType} submission.`
      };
    }
  };
}

function webhookAdapter(): FormAdapter {
  return {
    async submit(payload: FormPayload): Promise<FormResult> {
      const webhookUrl = process.env.FORM_WEBHOOK_URL;

      if (!webhookUrl) {
        return {
          ok: false,
          message:
            "This form provider is missing server configuration. Please contact the campaign directly."
        };
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(process.env.FORM_WEBHOOK_SECRET
            ? { authorization: `Bearer ${process.env.FORM_WEBHOOK_SECRET}` }
            : {})
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        return {
          ok: false,
          message:
            "The form provider did not accept the submission. Please try again later."
        };
      }

      return {
        ok: true,
        message: "Submission received."
      };
    }
  };
}

export function getFormAdapter(): FormAdapter {
  const provider = process.env.FORM_PROVIDER || "disabled";

  if (provider === "mock") {
    if (process.env.NODE_ENV === "production") {
      return disabledAdapter();
    }

    return mockAdapter();
  }

  if (provider === "webhook") {
    return webhookAdapter();
  }

  return disabledAdapter();
}
