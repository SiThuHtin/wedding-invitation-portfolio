import type { Metadata, Viewport } from "next";
import { Playfair_Display, Montserrat, Great_Vibes, Noto_Sans_Myanmar } from "next/font/google";
import MusicPlayer from "./components/MusicPlayer";
import Providers from "./components/Providers";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const scriptFont = Great_Vibes({
  variable: "--font-script-main",
  subsets: ["latin"],
  weight: ["400"],
});

const notoMyanmar = Noto_Sans_Myanmar({
  variable: "--font-myanmar",
  subsets: ["myanmar"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Phyo & Mon | Wedding Invitation",
  description: "Join Phyo & Mon as they celebrate their wedding on June 27, 2026.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${montserrat.variable} ${scriptFont.variable} ${notoMyanmar.variable}`}
    >
      <body suppressHydrationWarning>
        <Providers>
          {children}
          <MusicPlayer />
        </Providers>
      </body>
    </html>
  );
}
