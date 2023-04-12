import './globals.css'
import Nav from "./Nav"
import QueryWrapper from './QueryWrapper'

export const metadata = {
  title: 'Chirp',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='mx-4 md:mx-48 xl:mx-96 bg-gray-200'>
      <QueryWrapper>
        <Nav />
        {children}
      </QueryWrapper>
      </body>
    </html>
  )
}
