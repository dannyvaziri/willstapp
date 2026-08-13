import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${canonicalUrl()}/sitemap.xml`
  };
}
