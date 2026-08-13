import { NextResponse } from "next/server";
import { getFormAdapter } from "@/lib/forms/adapters";
import type { FormPayload, FormType } from "@/lib/forms/types";

const formTypes: FormType[] = ["contact", "newsletter", "volunteer"];

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizePayload(value: unknown): FormPayload | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const data = value as Record<string, unknown>;
  const formType = data.formType;
  const name = data.name;
  const email = data.email;
  const message = data.message;

  if (
    typeof formType !== "string" ||
    !formTypes.includes(formType as FormType) ||
    typeof name !== "string" ||
    typeof email !== "string" ||
    !name.trim() ||
    !isValidEmail(email)
  ) {
    return null;
  }

  return {
    formType: formType as FormType,
    name: name.trim(),
    email: email.trim(),
    message: typeof message === "string" ? message.trim() : undefined
  };
}

export async function POST(request: Request) {
  const payload = normalizePayload(await request.json().catch(() => null));

  if (!payload) {
    return NextResponse.json(
      { ok: false, message: "Please provide a valid name and email address." },
      { status: 400 }
    );
  }

  const result = await getFormAdapter().submit(payload);

  return NextResponse.json(result, { status: result.ok ? 200 : 503 });
}
