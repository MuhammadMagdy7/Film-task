//app/layout.tsx

import { Providers } from '@/store/provider'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'
import { Metadata } from 'next'
import { Roboto } from 'next/font/google'
 
// Google font
const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["cyrillic"],
  display: 'swap',
})


export const metadata: Metadata = {
  title: 'FilmWeb',
  description: 'Discover Amazing Films',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body className="flex flex-col min-h-screen">
        <Providers>
          <Header />
          <main className="flex-grow">{children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}