"use client"
// app/fonts.ts
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const fonts = {
  inter,
}