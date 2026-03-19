import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouStink.app — Tell someone they stink. Anonymously.",
  description: "Send an anonymous SMS nudge to someone who needs a hygiene check. Funny or kind — you pick the vibe. $0.99 per nudge.",
  openGraph: {
    title: "YouStink.app",
    description: "Tell someone they stink. Anonymously.",
    url: "https://youstink.app",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
