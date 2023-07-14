import React from 'react'
import {GrTableAdd} from "react-icons/gr"
import { UserButton } from "@clerk/nextjs";
import DisclosureItem from '../general/DisclosureItem';
import { useRouter } from 'next/router';
import { useTableStore } from '@/zustand/Store';



function Navbar() {
    const tables = useTableStore((state:any)=>state.app.tables)
    const router = useRouter()
    function createNewTable(){
        router.push("/create-table")
    }
  return (
    <nav className='md:fixed md:w-[15vw] md:h-screen bg-white border-r'>
        <section className='p-5 flex flex-col justify-between h-full'>
            <section>
                <section>
                    <h1>The Dashboard</h1>
                </section>
                <hr className="my-5" />
                <section className='my-5'>
                    <DisclosureItem tablesList={tables}/>
                </section>
                <div className='flex items-center gap-2 text-md bg-gray-100 p-3 rounded cursor-pointer hover:bg-gray-200 ease duration-500'
                onClick={createNewTable}>
                    <GrTableAdd/>
                    <p>Add Table</p>
                </div>
            </section>
            <span>
                <UserButton afterSignOutUrl="/sign-in"/>
            </span>
        </section>
    </nav>
  )
}

export default Navbar