import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'

import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import GlobalStyles from '@/app/GlobalStyles'

const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'Societal Systems and Software Lab',
  description: 'Societal Systems and Software Lab is a research group focused on Computer Science education and Software Engineering (Security).',
  icons: {
    icon: {
      url: '/uh_red.png',
      sizes: '16x16',
    }
  },
  openGraph: {
    title: 'Societal Systems and Software Lab',
    description: 'Societal Systems and Software Lab is a research group focused on Computer Science education and Software Engineering (Security).',
    url: 'https://uhcsed.web.app/',
    images: [
      {
        url: 'https://your-website.com/images/logo_preview.png',
        width: 1200,
        height: 630,
        alt: 'KIXLAB Logo Preview Image',
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
