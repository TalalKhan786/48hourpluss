import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/components/CartProvider'
import StorefrontWrapper from '@/components/StorefrontWrapper'

export const metadata: Metadata = {
  title: {
    default: '48 Hours Plus Herbal Honey | Natural Male Enhancement',
    template: '%s | 48 Hours Plus',
  },
  description:
    'Premium Turkish herbal honey with 9 natural ingredients. Lab-tested, ISO & Halal certified. Order worldwide via WhatsApp.',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* 
           GLOBAL TIMES NEW ROMAN SYSTEM:
           A clean global style block guarantees that every text element, button, input, 
           and heading across the entire website renders in Times New Roman without downloading
           unnecessary external web font files.
        */}
        <style>{`
          * {
            font-family: 'Times New Roman', Times, serif !important;
          }
        `}</style>
      </head>
      <body 
        className="bg-background text-foreground min-h-screen selection:bg-yellow-500 selection:text-black transition-colors duration-300 ease-in-out" 
        suppressHydrationWarning={true}
      >
        <CartProvider>
          <StorefrontWrapper>
            {children}
          </StorefrontWrapper>
        </CartProvider>
      </body>
    </html>
  )
}