import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { ToastProvider } from "@/components/toast-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { ViewProvider } from "@/components/view-context"
import "./globals.css"

const _poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Kozy Kahu",
  description: "A chill website that helps you focus",
  generator: "v0.app",
  icons: {
    icon: "/abc1.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      style={{ "--font-sans": _poppins.style.fontFamily } as React.CSSProperties}
    >
      <head>
        <link rel="preload" href="/globals.css" as="style" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#111" />

        <meta property="og:title" content="Kozy Kahu" />
        <meta property="og:description" content="A chill website that helps you focus" />
      </head>

      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ViewProvider>
            <ToastProvider>{children}</ToastProvider>
          </ViewProvider>
        </ThemeProvider>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('requestIdleCallback' in window) {
                requestIdleCallback(() => {
                  const links = document.querySelectorAll('a[href]');
                  links.forEach(link => link.setAttribute('prefetch', 'true'));
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}