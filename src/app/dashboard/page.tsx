"use client";

import { FiRefreshCw } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";
import { OrderProps } from "../types";
import { getCookiesClient } from "@/lib/cookieClient";

export default function Dashboard() {
  const [orders, setOrders] = useState<OrderProps[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      const token = getCookiesClient();
      try {
        const response = await axios.get("http://localhost:3333/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchOrders();
  }, []);

  return (
    <>
      <main
        className="w-full flex flex-col justify-center items-center  mt-30
      max-md:mt-20
      "
      >
        <div
          className="w-3/10 flex items-center gap-5 
        max-md:w-6/10 max-md:justify-center
        "
        >
          <h1 className="text-2xl font-bold text-start">Ultimos pedidos</h1>
          <FiRefreshCw color="green" className="cursor-pointer text-xl" />
        </div>
        {orders.length === 0 && (
          <p className=" mt-10 font-bold text-2xl text-red-400">
            Nenhum pedido
          </p>
        )}
        <section className="flex flex-col justify-center items-center w-full mt-5 gap-3">
          {orders.map((order) => (
            <article
              key={order.id}
              className=" w-3/10 h-12 flex hover:filter cursor-pointer 
              hover:brightness-150 transition duration-500
              max-md:w-8/10
              "
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
      </main>
    </>
  );
}
