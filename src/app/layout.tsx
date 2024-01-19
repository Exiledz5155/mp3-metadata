// app/layout.tsx

'use client'
import { DarkModeButton } from '../components/DarkModeButton'
import { Providers } from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='en'>
      <body>
        <Providers><DarkModeButton/>{children}</Providers>
      </body>
    </html>
  )
}