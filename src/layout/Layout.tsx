import React, { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from '@/components/navigation/Navbar'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

function Layout({children}:{children:ReactNode}) {
  return (
    <ClerkProvider publishableKey='pk_test_Y2xldmVyLWd1cHB5LTg0LmNsZXJrLmFjY291bnRzLmRldiQ'>
      <div><Toaster/></div>
        <main className={inter.className}>
            <Navbar/>
            {children}
        </main>
    </ClerkProvider>
  )
}

export default Layout