import React, { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from '@/components/navigation/Navbar'

const inter = Inter({ subsets: ['latin'] })

function Layout({children}:{children:ReactNode}) {
  return (
    <ClerkProvider>
        <main className={inter.className}>
            <Navbar/>
            {children}
        </main>
    </ClerkProvider>
  )
}

export default Layout