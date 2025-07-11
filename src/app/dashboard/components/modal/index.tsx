"use client";
import { IoClose } from "react-icons/io5";
import { getCookiesClient } from "@/lib/cookieClient";
import { api } from "@/service/api";
import { useEffect, useState } from "react";

interface ModalProps {
  closeModal: () => void;
  orderId: string;
}

interface DetailProps {
  id: string;
  amount: number;
  product: {
    name: string;
    price: number;
    description: string;
    banner: string;
  };
  order: {
    id: string;
    table: number;
    status: boolean;
    draft: boolean;
    name: string;
  };
}

export default function Modal({ closeModal, orderId }: ModalProps) {
  const [detail, setDetail] = useState<DetailProps[] | null>([]);

  useEffect(() => {
    async function detailItem() {
      const token = getCookiesClient();
      try {
        const response = await api.get("/order/detail", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            order_id: orderId,
          },
        });
        setDetail(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    detailItem();
  }, [orderId]);

  if (!detail) {
    return (
      <main className="w-full h-screen z-40 flex justify-center items-center border absolute backdrop-blur-[2px] bg-black/70">
        <p className="text-white">Carregando detalhes...</p>
      </main>
    );
  }

  async function handleConfirm() {
    const token = await getCookiesClient();

    try {
      await api.put(
        "order/finish",
        {
          order_id: orderId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      closeModal();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main
      className="w-full h-screen z-40 flex justify-center items-center border absolute backdrop-blur-[2px] bg-black/70
    
    "
    >
      {detail &&
        detail.map((item) => (
          <section
            className="w-3/10 border flex flex-col gap-5 pt-15 pb-8 rounded-md px-5 bg-slate-900 relative z-50
            max-xl:w-5/10 max-md:w-6/10 max-sm:w-8/10
            "
            key={item.id}
          >
            <h1 className="text-3xl italic not-first-of-type:">
              Detalhes do pedido
            </h1>
            <div className="flex gap-2">
              <span className="py-1 px-2 rounded-sm bg-slate-950 ">
                Mesa - {item.order.table}
              </span>
              {item.order.name && (
                <span className="py-1 px-2 rounded-sm bg-slate-950">
                  {item.order.name}{" "}
                </span>
              )}
            </div>
            <article className="flex flex-col gap-2">
              <p className="text=white font-bold">
                {" "}
                Qtd: {item.amount} - {item.product.name} - R${" "}
                {item.product.price}
              </p>

              <p className="text-slate-400 font-md ">
                {item.product.description}
              </p>
              <strong className="text-white">
                Valor Total: R$ {item.product.price * item.amount}{" "}
              </strong>
            </article>
            <button
              className="py-2 px-2 rounded-sm bg-green-500 w-3/10 cursor-pointer
              transistion-colors duration-500 hover:bg-green-600
              max-md:w-full 
              "
              onClick={handleConfirm}
            >
              Confirma pedido
            </button>
            <button className="absolute left-3 top-3 " onClick={closeModal}>
              <IoClose
                size={40}
                className="text-red-400 cursor-pointer 
            transistion-colors duration-500 hover:scale-105
            "
              />
            </button>
          </section>
        ))}
    </main>
  );
}
