import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "../db";

async function createTodo(data: FormData) {
  "use server";
  const title = data.get("title")?.valueOf();
  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid Title");
  }

  await prisma.todo.create({ data: { title, complete: false } });
  redirect("/");
}

export default function Page() {
  return (
    <>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl">New Todo</h1>
      </header>
      <form className="flex gap-2 flex-col" action={createTodo}>
        <input
          type="text"
          name="title"
          className="border bg-transparent border-slate-300 rounded-sm px-2 py-2 focus-within:border-slate-100 outline-none"
        ></input>
        <div className="mt-8 flex gap-3 justify-start">
          <Link
            className="border p-4 text-slate-200 rounded-md hover:bg-slate-600 transition duration-300 ease-in-out focus-within:bg-slate-700 outline-none"
            href="/"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="border p-4 text-slate-200 rounded-md hover:bg-slate-600 transition duration-300 ease-in-out focus-within:bg-slate-700 outline-none"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
