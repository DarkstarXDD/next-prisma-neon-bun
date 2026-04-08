import { Inter } from "next/font/google"
import { type Metadata } from "next"

import "@/styles/globals.css"

export const metadata: Metadata = {
  openGraph: {
    images: {
      url: "https://project-name-darkstar.vercel.app/og-img.jpeg",
      type: "image/jpeg",
      width: 1440,
      height: 630,
    },
    url: "https://project-name-darkstar.vercel.app/",
    description: "Project description",
    title: "Project Title",
    type: "website",
  },

  authors: {
    url: "https://github.com/DarkstarXDD",
    name: "Darkstar",
  },

  description: "Project description",
  title: "Project Title",
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} bg-background text-foreground p-8 font-sans`}
      >
        {children}
      </body>
    </html>
  )
}
