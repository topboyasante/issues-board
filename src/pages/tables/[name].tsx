import { useTableStore } from "@/zustand/Store";
import { useRouter } from "next/router";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { motion, useDragControls } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import { List, Table } from "@/types";
import toast from "react-hot-toast";

function Index() {
  let [isOpen, setIsOpen] = useState<boolean>(false);
  const controls = useDragControls();

  const tables = useTableStore((state) => state.tables);
  const router = useRouter();
  const { name } = router.query;

  const currentTable = tables.find((item) => item.name === name) as Table;
  const addNewList = useTableStore((state) => state.createList);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<List>();
  const onSubmit: SubmitHandler<List> = (data) => {
    data.items=[]
    addNewList(currentTable,data)
    setIsOpen(false)
    toast.success("Success!");
  };

  return (
    <>
      <main className="pl-[15vw]">
        <section className="">
          <section className="h-[5vh] px-5 py-8 flex justify-between items-center">
            <h1 className="font-bold text-2xl">{name}</h1>
            <button
              className="bg-black text-white px-4 py-2"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <p>Add List</p>
            </button>
          </section>
          <section className="relative overflow-scroll w-full h-[88vh] my-3 p-5 scrollbar-hide">
            <section className="absolute">
              {currentTable?.lists.length ?? 0 ? (
                currentTable?.lists.map((item, index) => (
                  <motion.div key={index} drag dragControls={controls} className="my-3">
                    <h1 className="border w-[300px] text-center p-3 bg-white">
                      {item.name}
                    </h1>
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

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-5">
            <Dialog.Title>
              <h1 className="font-bold">Add a List</h1>
            </Dialog.Title>
            <section>
              <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="table_name text-xl">Name:</label>
                <br />
                <input
                  type="text"
                  className="border border-black rounded px-4 py-2 my-5"
                  {...register("name", { required: true })}
                />
                {errors.name && (
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
    </>
  );
}

export default Index;
function register(arg0: string, arg1: { required: boolean; }): import("react").JSX.IntrinsicAttributes & import("react").ClassAttributes<HTMLInputElement> & import("react").InputHTMLAttributes<HTMLInputElement> {
  throw new Error("Function not implemented.");
}

