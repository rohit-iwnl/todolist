import Link from "next/link";
import { prisma } from "./db";
import { TodoItem } from "./components/TodoItem";


async function toggleTodo(id:string,complete:boolean){
  "use server"

  await prisma.todo.update({where:{id},data:{complete}})
}

export default async function Home(){

  const todos= await prisma.todo.findMany()

  return <>
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-3xl">Todos</h1>
      <Link 
      className="border p-4 text-slate-200 rounded-md hover:bg-slate-600 transition duration-300 ease-in-out focus-within:bg-slate-700 outline-none"
       href="/new">New</Link>
    </header>
    <ul className="pl-5">
      {todos.map(todo =>(
        <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
      ))}
    </ul>
  </>
}