import { create } from "zustand";
import { ITable } from "@/types";

const useTableStore = create((set)=>({
    app:{
        tables:[
           
        ]
    },

    createTable:(payload:ITable)=>{
        set((state: { app: { tables: ITable[]; }; }) => {
            //Check whether there's a table with the same name as the new table you're creating:
            const existingTable = state.app.tables.find((item)=>item.name === payload.name)
            if(existingTable){
                return {app:{tables:[...state.app.tables]}}
            }
            else{
                return { app: { tables: [...state.app.tables, payload] } }
            }
        })
    }
   
}))

export {useTableStore}