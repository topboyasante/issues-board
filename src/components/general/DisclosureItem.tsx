import { Table } from "@/types";
import Link from "next/link";
import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

function DisclosureItem({ tablesList }: { tablesList: Table[] }) {
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
        <div className="flex items-center text-md bg-gray-100 p-3 rounded cursor-pointer hover:bg-gray-200 ease duration-500 w-full">
          <p>Tables</p>
          <BiChevronDown />
        </div>
      </button>
      {isOpen && (
        <div className="mt-2">
          {tablesList.length > 0 ? (
            tablesList.map((item, index) => (
              <Link href={`/tables/${item.name}`} key={index}>
                <div className="flex items-center text-md bg-gray-100 p-3 rounded cursor-pointer hover:bg-gray-200 ease duration-500 w-full">
                  {item.name}
                </div>
              </Link>
            ))
          ) : (
            <div className="p-5">
              <h1>No Tables Shown</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DisclosureItem;
