import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { site } from "@/content/site";
import { canonicalUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  metadataBase: new URL(canonicalUrl()),
  title: {
    default: site.title,
    template: `%s | ${site.name}`
  },
  description: site.description,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: site.title,
    description: site.description,
    url: canonicalUrl(),
    siteName: site.name,
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <header className="nav">
            <div className="container nav-inner">
              <Link className="brand" href="/">
                {site.name}
              </Link>
              <nav className="nav-links" aria-label="Primary navigation">
                <Link href="/#priorities">Priorities</Link>
                <Link href="/#news">News</Link>
                <Link href="/#events">Events</Link>
                <Link href="/#contact">Contact</Link>
                <Link className="button" href="/#volunteer">
                  Volunteer
                </Link>
              </nav>
            </div>
          </header>
          {children}
          <footer className="footer">
            <div className="container footer-inner">
              <strong>{site.name}</strong>
              <span>{site.footerDisclaimer}</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
