import { ITable } from '@/types';
import React, { useState } from 'react';
import {BiChevronDown} from "react-icons/bi"

function DisclosureItem({tablesList}:{tablesList:ITable[]}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDisclosure = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        type="button"
        onClick={toggleDisclosure}
        className="focus:outline-none w-full"
      >
        <div className='flex items-center text-md bg-gray-100 p-3 rounded cursor-pointer hover:bg-gray-200 ease duration-500 w-full'>
          <p>Tables</p>
          <BiChevronDown />
        </div>
      </button>
      {isOpen && (
        <div className="mt-2">
          {
            tablesList.map((item,index)=>{
              if(tablesList.length>0){
                return(
                  <div className='flex items-center text-md bg-gray-100 p-3 rounded cursor-pointer hover:bg-gray-200 ease duration-500 w-full' key={index}>
                    {item.name}
                  </div>
                )
              }
              else{
                return(
                  <h1>0 Tables</h1>
                )
              }
            })
          }
        </div>
      )}
    </div>
  );
}

export default DisclosureItem;
