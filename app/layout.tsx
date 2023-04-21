import './globals.css'
import Nav from "./Nav"
import QueryWrapper from './QueryWrapper'
import AuthContext from "./auth/AuthContext"

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
          <AuthContext>
            {/* @ts-expect-error */}
            <Nav />
            {children}
          </AuthContext>
        </QueryWrapper>
      </body>
    </html>
  )
}
