import { Table } from "@/types";
import { useTableStore } from "@/zustand/Store";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

function Index() {
  const createTable = useTableStore((state) => state.createTable);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Table>();
  const onSubmit: SubmitHandler<Table> = (data) => {
    data.lists = [];
    createTable(data);
    console.log(data);
    toast.success("Success!"), router.push(`/tables/${data.name}`);
  };

  return (
    <main className="md:pl-[15vw]">
      <section className="p-5">
        <h1 className="font-bold md:text-3xl">Create a New Table</h1>
        <hr className="my-5" />
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
            <p>Create Table</p>
          </button>
        </form>
      </section>
    </main>
  );
}

export default Index;
