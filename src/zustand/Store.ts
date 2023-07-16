import { List, Table } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  tables: Table[];
  createTable: (table: Table) => void;
  deleteTable: (table: Table) => void;
  createList: (table: Table, List: List) => void;
  deleteList: (table: Table, list: List) => void;
  createListItem: (table: Table, List: List, item: string) => void;
  deleteListItem: (table: Table, List: List, item: string) => void;
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

      deleteTable: (table) => {
        set((state) => {
          //return an array of tables without the selected table, and use that array as the new state
          const updatedTables = state.tables.filter(
            (item) => item.name !== table.name
          );
          return {
            tables: updatedTables,
          };
        });
      },

      createList: (table, List) => {
        set((state) => {
          const updatedTable = state.tables.map((item) => {
            if (item.name === table.name) {
              return {
                ...item,
                lists: [...item.lists, List],
              };
            }
            return item;
          });
          return {
            tables: updatedTable,
          };
        });
      },

      deleteList: (table, list) => {
        set((state) => {
          const updatedTable = state.tables.map((item) => {
            if (item.name === table.name) {
              const updatedLists = item.lists.filter(
                (lItem) => lItem.name !== list.name
              );
              return {
                ...item,
                lists: updatedLists,
              };
            }
            return item;
          });
          return {
            tables: updatedTable,
          };
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

      deleteListItem: (table, list, item) => {
        set((state) => {
          //Map through the current tables array
          const updatedTables = state.tables.map((tItem) => {
            //Find the table whose list will be deleted
            if (tItem.name === table.name) {
              //Map through all the lists of the table in question
              const updatedLists = tItem.lists.map((lItem) => {
                //find the list we are deleting from
                if (lItem.name === list.name) {
                  //filter through the list items of the list we are deleting from. return a new array without the list item we dont want
                  const updatedItems = lItem.items.filter((i) => i !== item);
                  //update the list item array with the new array
                  return {
                    ...lItem,
                    items: updatedItems,
                  };
                }
                return lItem;
              });
              //update the list array with the new elements and return them
              return {
                ...tItem,
                lists: updatedLists,
              };
            }
            return tItem;
          });
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
