import { useTableStore } from "@/zustand/Store";
import { useRouter } from "next/router";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { List, Table } from "@/types";
import toast from "react-hot-toast";
import {AiOutlineDelete} from "react-icons/ai"
import {DragDropContext} from "react-beautiful-dnd"
import Head from "next/head";

function Index() {
  let [isAddListOpen, setAddListIsOpen] = useState<boolean>(false);
  let [isAddListItemOpen, setAddListItemIsOpen] = useState<boolean>(false);
  let [isDeleteListItemOpen, setDeleteListItemIsOpen] = useState<boolean>(false);
  let [selectedTableList, setSelectedTableList] = useState<List>();
  let [selectedListItem, setSelectedListItem] = useState<string>();

  const tables = useTableStore((state) => state.tables);
  const router = useRouter();
  const { name } = router.query;

  const currentTable = tables.find((item) => item.name === name) as Table;
  const addNewList = useTableStore((state) => state.createList);
  const addNewListItem = useTableStore((state) => state.createListItem);
  const deleteTable = useTableStore((state) => state.deleteTable);
  const deleteList = useTableStore((state) => state.deleteList);
  const deleteListItem = useTableStore((state) => state.deleteListItem);

  const {
    register: registerList,
    handleSubmit: handleSubmitList,
    formState: { errors: listErrors },
  } = useForm<List>();
  const onSubmitList: SubmitHandler<List> = (data) => {
    data.items = [];
    addNewList(currentTable, data);
    setAddListIsOpen(false);
    toast.success("Success!");
  };

  type addListItemInput = {
    name: string;
  };

  function deleteCurrentTable(table: Table) {
    deleteTable(table);
    toast.success("Your table was deleted");
    router.push(`/`);
  }

  const {
    register: registerListItem,
    handleSubmit: handleSubmitListItem,
    formState: { errors: listItemErrors },
  } = useForm<addListItemInput>();
  const onListItemSubmit: SubmitHandler<addListItemInput> = (data) => {
    console.log(data);
    setAddListItemIsOpen(false);
    const selectedList = currentTable.lists.find(
      (list) => list.name === selectedTableList?.name
    );
    if (selectedList) {
      addNewListItem(currentTable, selectedList, data.name);
      toast.success("Success!");
    }
  };

  function deleteCurrentList(table:Table,list:List){
    deleteList(table,list)
  }

  return (
    <>
      <Head>
        <title>The Dashboard</title>
      </Head>
      <main className="pl-[15vw]">
        <section>
          {/* Heading */}
          <section className="h-[5vh] px-5 py-8 flex justify-between items-center">
            <h1 className="font-bold text-2xl">{name}</h1>
            <section className="flex gap-3 items-center">
              <button
                className="bg-[#191919] text-white px-4 py-2"
                onClick={() => {
                  setAddListIsOpen(true);
                }}
              >
                <p>Add List</p>
              </button>
              <button
                className="bg-red-700 text-white px-4 py-2"
                onClick={() => {
                  deleteCurrentTable(currentTable);
                }}
              >
                <p>Delete Table</p>
              </button>
            </section>
          </section>
          {/* Body */}
          <section className="relative overflow-scroll w-full h-[88vh] my-3 p-5 scrollbar-hide">
            <section className="absolute flex gap-3">
              {currentTable?.lists.length ? (
                currentTable.lists.map((listItem, index) => (
                  <div
                    key={index}
                    className="my-3 min-w-[300px]"
                  >
                    <div className="flex bg-[#191919] p-3 justify-between items-center">
                      <h1 className="">{listItem.name}</h1>
                      <section className="flex gap-3">
                        <button
                          onClick={() => {
                            setAddListItemIsOpen(true);
                            setSelectedTableList(listItem);
                          }}
                        >
                          <p className="text-xl">+</p>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedTableList(listItem);
                            deleteCurrentList(currentTable,listItem)
                          }}
                        >
                          <AiOutlineDelete/>
                        </button>
                      </section>
                    </div>
                    <section className="p-2 bg-[#151515]">
                      {listItem.items.map((item, index) => (
                        <div key={index}>
                          <section className="my-2 bg-[#191919] p-3 rounded">
                            <p>{item}</p>
                            <br />
                            <section className="flex justify-end">
                              <button onClick={()=>{
                                setSelectedTableList(listItem)
                                setSelectedListItem(item)
                               setDeleteListItemIsOpen(true)
                              }}>
                                <AiOutlineDelete/>
                              </button>
                            </section>
                          </section>
                        </div>
                      ))}
                    </section>
                  </div>
                ))
              ) : (
                <h1>No Lists Available</h1>
              )}
            </section>
          </section>
        </section>
      </main>

      {/* Add New List Modal */}
      <Dialog
        open={isAddListOpen}
        onClose={() => setAddListIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-5">
            <Dialog.Title>
              <h1 className="font-bold">Add a List</h1>
            </Dialog.Title>
            <section>
              <form onSubmit={handleSubmitList(onSubmitList)}>
                <label htmlFor="table_name" className="text-xl">
                  Name:
                </label>
                <br />
                <input
                  type="text"
                  className="border border-black rounded px-4 py-2 my-5"
                  {...registerList("name", { required: true })}
                />
                {listErrors.name && (
                  <p className="text-red-500 text-sm">This field is required</p>
                )}
                <br />
                <button
                  className="bg-black text-white px-4 py-2 rounded my-5"
                  type="submit"
                >
                  <p>Create List</p>
                </button>
              </form>
            </section>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Add new List Item Modal */}
      <Dialog
        open={isAddListItemOpen}
        onClose={() => setAddListItemIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-5">
            <Dialog.Title>
              <h1 className="font-bold">Add a List Item</h1>
            </Dialog.Title>
            <section>
              <form onSubmit={handleSubmitListItem(onListItemSubmit)}>
                <label htmlFor="item_name" className="text-xl">
                  Name:
                </label>
                <br />
                <input
                  type="text"
                  className="border border-black rounded px-4 py-2 my-5"
                  {...registerListItem("name", { required: false })}
                />
                {listItemErrors.name && (
                  <p className="text-red-500 text-sm">This field is required</p>
                )}
                <br />
                <button
                  className="bg-black text-white px-4 py-2 rounded my-5"
                  type="submit"
                >
                  <p>Create List Item</p>
                </button>
              </form>
            </section>
          </Dialog.Panel>
        </div>
      </Dialog>


      {/* Add Delete List Item Modal */}
      <Dialog
        open={isDeleteListItemOpen}
        onClose={() => setDeleteListItemIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-5">
            <Dialog.Title>
              <h1 className="font-bold">Delete List Item</h1>
            </Dialog.Title>
            <section>
             <p>Are you sure you want to delete this item?</p>
             <section className="flex gap-3 items-center">
              <button className="bg-black text-white my-3 px-4 py-2 rounded">
                <p>Cancel</p>
              </button>
              <button className="bg-red-700 text-white my-3 px-4 py-2 rounded"
              onClick={()=>{
                deleteListItem(currentTable,selectedTableList as List,selectedListItem as string)
                setDeleteListItemIsOpen(false)
              }}>
                <p>Delete</p>
              </button>
             </section>
            </section>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}

export default Index;
