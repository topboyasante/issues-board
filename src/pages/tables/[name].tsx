import { useTableStore } from "@/zustand/Store";
import { useRouter } from "next/router";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { motion, useDragControls } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import { List, Table } from "@/types";
import toast from "react-hot-toast";

function Index() {
  let [isAddListOpen, setAddListIsOpen] = useState<boolean>(false);
  let [isAddListItemOpen, setAddListItemIsOpen] = useState<boolean>(false);
  let [selectedTableList, setSelectedTableList] = useState<List>();

  const controls = useDragControls();

  const tables = useTableStore((state) => state.tables);
  const router = useRouter();
  const { name } = router.query;

  const currentTable = tables.find((item) => item.name === name) as Table;
  const addNewList = useTableStore((state) => state.createList);

  const addNewListItem = useTableStore((state) => state.createListItem);

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

  return (
    <>
      <main className="pl-[15vw]">
        <section>
          <section className="h-[5vh] px-5 py-8 flex justify-between items-center">
            <h1 className="font-bold text-2xl">{name}</h1>
            <button
              className="bg-black text-white px-4 py-2"
              onClick={() => {
                setAddListIsOpen(true);
              }}
            >
              <p>Add List</p>
            </button>
          </section>
          <section className="relative overflow-scroll w-full h-[88vh] my-3 p-5 scrollbar-hide">
            <section className="absolute flex gap-3">
              {currentTable?.lists.length ? (
                currentTable.lists.map((item, index) => (
                  <motion.div
                    key={index}
                    drag
                    dragControls={controls}
                    className="my-3"
                  >
                    <div className="flex w-[300px] border p-3 justify-between items-center">
                      <h1 className="">{item.name}</h1>
                      <button
                        onClick={() => {
                          setAddListItemIsOpen(true);
                          setSelectedTableList(item);
                        }}
                      >
                        <p className="text-xl">+</p>
                      </button>
                    </div>
                    <section className="p-3 bg-gray-100">
                      {item.items.map((item, index) => (
                        <motion.div key={index} drag dragControls={controls}>
                          <section className="my-2 bg-gray-300 p-3 rounded">
                            <p>{item}</p>
                          </section>
                        </motion.div>
                      ))}
                    </section>
                  </motion.div>
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
    </>
  );
}

export default Index;
