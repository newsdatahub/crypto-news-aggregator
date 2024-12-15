export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Crypto News Aggregator Application</title>
        <meta name="description" content="Crypto News Aggregator Application" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
