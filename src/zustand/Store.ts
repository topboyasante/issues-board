import { List, Table } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  tables: Table[];
  createTable: (table: Table) => void;
  createList: (table: Table, List: List) => void;
};

const useTableStore = create<Store>()(
  persist(
    (set) => ({
      tables: <Table[]>[],

      createTable: (table) => {
        set((state) => {
          const existingTable = state.tables.find(
            (item) => item.name === table.name
          );
          if (existingTable) {
            return state;
          } else {
            return {
              tables: [...state.tables, table],
            };
          }
        }); //end of setter function
      }, //end of createTable function

      createList: (table, List) => {
        set((state) => {
          const updatedTable = state.tables.map((item)=>{
            if (item.name === table.name) {
              return {
                ...item,
                lists: [...item.lists, List],
              };
            }
            return item;
          })
          return{ 
            tables:updatedTable
          }
        });
      },
    }), //end of setter function for create
    {
      name: "tables",
    }
  )
);

export { useTableStore };
