import { List, Table } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  tables: Table[];
  createTable: (table: Table) => void;
  createList: (table: Table, List: List) => void;
  createListItem: (table: Table, List: List, item:string) => void;
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

      createListItem: (table, list, item) => {
        set((state) => {
          //Mapping through all the tables
          const updatedTables = state.tables.map((tItem) => {
            //Search for the current table we want to update
            if (tItem.name === table.name) {
              //Map through all that table's lists
              const updatedLists = tItem.lists.map((lItem) => {
                //Search for the list we want to update
                if (lItem.name === list.name) {
                  //Push the list item we want to add to the list items array
                  return {
                    ...lItem,
                    items: [...lItem.items, item],
                  };
                }
                // return each member of the updatedLists Array
                return lItem;
              });
              //return each item of the updatedTables Array, update the list of each table with the new list
              return {
                ...tItem,
                lists: updatedLists,
              };
            }
            return tItem;
          });
          //update all the tables in the state
          return {
            tables: updatedTables,
          };
        });
      },

    }), //end of setter function for create
    {
      name: "tables",
    }
  )
);

export { useTableStore };
