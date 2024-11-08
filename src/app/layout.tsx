import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'

import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import GlobalStyles from '@/app/GlobalStyles'

const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'KIXLAB',
  description: 'KIXLAB is a human-computer interaction research group in the School of Computing at KAIST.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'KIXLAB',
    description: 'KIXLAB is a human-computer interaction research group in the School of Computing at KAIST.',
    url: 'https://kixlab.kaist.ac.kr',
    images: [
      {
        url: 'https://kixlab.kaist.ac.kr/images/logo_kaist_hci_white.png',
        width: 1200,
        height: 630,
        alt: 'KIXLAB Open Graph Image',
      },
    ],
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={notoSans.className}>
        <GlobalStyles />
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
