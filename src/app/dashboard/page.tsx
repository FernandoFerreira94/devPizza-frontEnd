"use client";

import { useEffect, useState } from "react";
import { api } from "@/service/api";
import Link from "next/link";

import { FiRefreshCw } from "react-icons/fi";
import { HiOutlinePlusCircle } from "react-icons/hi2";

import { getCookiesClient } from "@/lib/cookieClient";
import { OrderProps } from "../types";
import Modal from "./components/modal";

export default function Dashboard() {
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [showModalPedido, setShowModalPedido] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      const token = getCookiesClient();
      try {
        const response = await api.get("/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
        setIsEmpty(response.data.length === 0);
      } catch (error) {
        console.error(error);
        setIsEmpty(true);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [refresh]);

  function handleRefresh() {
    setRefresh(!refresh);
  }

  function handleOpenModal(order_id: string) {
    setSelectedOrderId(order_id);
    setShowModalPedido(true);
  }

  function handleClose() {
    setShowModalPedido(false);
  }

  return (
    <>
      <main
        className="w-full flex-1 relative   flex flex-col pt-30 items-center  
      max-sm:pt-20
      "
      >
        <div
          className="w-3/10 flex items-center gap-5 
        max-md:w-6/10 max-md:justify-center
        "
        >
          {!loading && !isEmpty && (
            <>
              <h1 className="text-2xl font-bold text-start">Ultimos pedidos</h1>
              <FiRefreshCw
                color="green"
                className="cursor-pointer text-xl"
                onClick={handleRefresh}
              />
            </>
          )}
        </div>
        {loading && (
          <div className="w-full flex flex-col justify-center items-center mt-30">
            <div className="custom-loader"></div>
            <p className="mt-10 font-bold text-2xl text-slate-200">
              Carregando...
            </p>
          </div>
        )}

        {!loading && isEmpty && (
          <>
            <p className="mt-10 font-bold text-2xl text-slate-400">
              Sem pedidos.
            </p>
            <Link
              href="/dashboard/pedidos"
              className="mt-10 font-bold text-xl text-white bg-green-600 p-3 rounded cursor-pointer

            "
            >
              Adicionar um pedido
            </Link>
          </>
        )}

        <section className="flex flex-col justify-center items-center w-full mt-5 gap-3">
          {orders.map((order) => (
            <article
              key={order.id}
              className=" w-3/10 h-12 flex hover:filter cursor-pointer 
              hover:brightness-150 transition duration-500
              max-md:w-8/10
              "
              onClick={() => handleOpenModal(order.id)}
            >
              <div className="w-2 h-full bg-green-500 rounded-l-md"></div>
              <div className="w-full h-full bg-slate-950 flex items-center pl-4  rounded-r-md">
                <p className="text-white ">
                  <span> Mesa {order.table}</span>{" "}
                  {order.name && <span> - {order.name}</span>}
                </p>
              </div>
            </article>
          ))}
        </section>
        <Link href="/dashboard/pedidos">
          <HiOutlinePlusCircle
            size={60}
            color="green"
            className="absolute bottom-13 right-19 cursor-pointer
            transition ease-in-out duration-500 hover:scale-110 
            "
          />
        </Link>
      </main>
      {showModalPedido && (
        <Modal closeModal={handleClose} orderId={selectedOrderId} />
      )}
    </>
  );
}
