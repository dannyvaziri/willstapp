export type FormType = "contact" | "newsletter" | "volunteer";

export type FormPayload = {
  formType: FormType;
  name: string;
  email: string;
  message?: string;
};

export type FormResult = {
  ok: boolean;
  message: string;
};

export type FormAdapter = {
  submit(payload: FormPayload): Promise<FormResult>;
};
