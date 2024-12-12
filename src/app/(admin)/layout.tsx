import "@/app/globals.css"
export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="w-full min-h-full bg-[#242424]">
        {children}
      </body>
    </html>
  )
}
