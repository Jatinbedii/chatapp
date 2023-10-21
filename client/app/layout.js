import ContextProvider from '@/context/context'
import './globals.css'
import { Rubik } from 'next/font/google'


const rubik= Rubik({ subsets: ['latin'] ,weight:"400"})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rubik.className} >
        <ContextProvider>
         
        {children}
        </ContextProvider>
        
        
        </body>
    </html>
  )
}
