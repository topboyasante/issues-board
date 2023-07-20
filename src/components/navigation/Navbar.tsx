import React from 'react'
import { UserButton } from "@clerk/nextjs";
import DisclosureItem from '../general/DisclosureItem';
import { useRouter } from 'next/router';
import { useTableStore } from '@/zustand/Store';
import Link from 'next/link';
import { AiFillHome,AiOutlineAppstoreAdd } from 'react-icons/ai';



function Navbar() {
    const tables = useTableStore((state:any)=>state.tables)
    const router = useRouter()
    function createNewTable(){
        router.push("/create-table")
    }
    
  return (
    <nav className='md:fixed md:w-[15vw] md:h-screen bg-[#121212] text-[#777777] border-r border-r-[#777777] overflow-y-scroll scrollbar-hide'>
        <section className='p-5 flex flex-col justify-between h-full'>
            <section>
                <section>
                    <h1>The Dashboard</h1>
                </section>
                <hr className="my-5 border-[#777777]" />
                <Link href={`/`} className='my-2 flex items-center gap-3 text-md bg-[#191919] p-3 rounded cursor-pointer hover:bg-gray-200 ease duration-500 text-[#777777]'>
                    <AiFillHome/>
                    <p>Home</p>
                </Link>
                <div className='my-2 flex items-center gap-3 text-md bg-[#191919] p-3 rounded cursor-pointer hover:bg-gray-200 ease duration-500 text-[#777777]'
                onClick={createNewTable}>
                    <AiOutlineAppstoreAdd/>
                    <p>Add Table</p>
                </div>
                <section className='my-5'>
                    <DisclosureItem tablesList={tables}/>
                </section>
            </section>
            <span>
                <UserButton afterSignOutUrl="/sign-in"/>
            </span>
        </section>
    </nav>
  )
}

export default Navbar