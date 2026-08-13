const fallbackUrl = "http://localhost:3000";

export function canonicalUrl(path = "") {
  const base = process.env.NEXT_PUBLIC_SITE_URL || fallbackUrl;
  const cleanBase = base.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return path ? `${cleanBase}${cleanPath}` : cleanBase;
}
