import type { Metadata, Viewport } from 'next';
import { Inter, Schibsted_Grotesk, Space_Mono } from 'next/font/google';
import './globals.css';

const display = Schibsted_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});
const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});
const mono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Threadbare — loved once, wanted twice',
  description:
    'Threadbare is a circular-fashion resale marketplace: human-verified condition grades, story tags that track where a garment has been, and a wardrobe carbon counter. A Parable design-showcase concept.',
  openGraph: {
    title: 'Threadbare — the resale marketplace with receipts',
    description:
      'Verified condition grades, story tags, and the carbon math that makes second-hand first-rate.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#2f4bff',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* progressive-enhancement gate: reveals/hero intro only exist under html.js */}
        <script
          dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js')` }}
        />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
