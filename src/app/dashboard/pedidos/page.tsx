"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { MdArrowBack } from "react-icons/md";

import { api } from "@/service/api";
import { getCookiesClient } from "@/lib/cookieClient";
import { toast } from "sonner";

export default function Pedidos() {
  const router = useRouter();

  async function handlePedido(formData: FormData) {
    const token = await getCookiesClient();
    const data = {
      table: Number(formData.get("table")),
      name: formData.get("name"),
    };

    // verificando se existe mesa aberta.
    try {
      const response = await api.get("/orders/draft", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const pedidosExistentes = response.data;

      const jaExisteMesa = pedidosExistentes.some(
        (pedidos: { table: number }) => pedidos.table === data.table
      );

      // condicao para ver se mesa ja esta aberta
      if (jaExisteMesa) {
        toast.warning("Mesa ja esta aberta");
        return;
      }
    } catch (error) {
      console.error(error);
    }

    // Post pedido
    try {
      const response = await api.post("/order", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { id } = response.data;
      router.push(`/dashboard/pedidos/${id}`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className=" w-full flex items-center justify-center pt-30 ">
      <div className="w-3/10  flex flex-col rounded-md  shadow-slate-400 gap-3  max-md:w-9/10">
        <h1 className="w-full text-center text-4xl font-medium mb-10">
          Novo pedido
        </h1>
        <form action={handlePedido} className="flex flex-col gap-2">
          <input
            type="number"
            placeholder="N mesa ex: 01"
            name="table"
            required
            className="p-2 bg-slate-950 w-full rounded-md border border-slate-400"
          />
          <input
            type="text"
            placeholder="Nome do cliente"
            name="name"
            className="p-2 bg-slate-950 w-full rounded-md border border-slate-400"
          />
          <input
            type="submit"
            placeholder="Nome do cliente"
            value={"Continuar"}
            className="p-2 bg-green-600 w-full rounded-md cursor-pointer transition-colors hover:bg-green-500 duration-500"
          />
        </form>
      </div>
      <Link href={"/dashboard"}>
        <MdArrowBack
          size={40}
          className="text-red-400 absolute bottom-15 right-20  rounded-md cursor-pointer 
        transition duration-500 hover:text-red-500 hover:-translate-x-3 
        max-md:right-10 max-md:bottom-10
        "
        />
      </Link>
    </main>
  );
}
