"use client";

import { getCookiesClient } from "@/lib/cookieClient";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { MdArrowBack } from "react-icons/md";

import { CategoryProps, OrderProps, ProductProps } from "@/app/types";
import { api } from "@/service/api";

export default function Items() {
  const router = useRouter();
  const params = useParams();
  const order_id = params?.id;
  const [order, setOrder] = useState<OrderProps>();
  const [category, setCategory] = useState<CategoryProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [product, setProduct] = useState<ProductProps[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  // listando os produtos atraves do id da categoria
  const selectedProduct: ProductProps | undefined = product.find(
    (p) => p.id === selectedProductId
  );
  // removendo o ponto das casas decimais para ser convertido em number
  const rawPrice = selectedProduct?.price?.toString().replace(",", ".");

  // calculando o total
  useEffect(() => {
    const totalPrice = Number(rawPrice) * quantity;
    setTotalPrice(totalPrice);
  }, [quantity, rawPrice]);

  // carregando os dados do pedido [table, nome]
  useEffect(() => {
    async function fetchOrder() {
      const token = getCookiesClient();
      try {
        const response = await api.get("/orders/draft", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const order = response.data.find(
          (order: OrderProps) => order.id === order_id
        );
        setOrder(order);
      } catch (error) {
        console.error(error);
      }
    }

    fetchOrder();
  }, [order_id]);

  // carregando as categorias
  useEffect(() => {
    async function fetchCategory() {
      const token = getCookiesClient();

      try {
        const response = await api.get("/category", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategory(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCategory();
  }, [router]);

  // carregando os produtos atraves da categoria
  useEffect(() => {
    async function fetProduct() {
      if (!selectedCategory) return;

      const token = getCookiesClient();
      try {
        const response = await api.get("/category/product", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            category_id: selectedCategory,
          },
        });
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetProduct();
  }, [selectedCategory]);

  async function handleAddItem(formData: FormData) {
    const product_id = formData.get("product");
    const amount = Number(formData.get("amount"));

    const token = getCookiesClient();

    try {
      await api.post(
        "/order/add",
        { order_id, product_id, amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }

    try {
      await api.put(
        "order/send",
        { order_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Pedido enviado com sucesso");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  }

  // DELETAR ORDER CANCELAR PEDIDO
  async function handleDeleteOrder() {
    const token = await getCookiesClient();

    try {
      await api.delete("/order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          order_id,
        },
      });
      toast.info("Pedido cancelado");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className=" w-full flex items-center justify-center pt-30 ">
      <div
        className="w-3/10  flex flex-col rounded-md  shadow-slate-400 gap-3
      max-md:w-9/10
      "
      >
        <h1 className="w-full text-center text-4xl font-medium mb-10">
          Pedido
        </h1>
        {category.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center mt-10 gap-3">
            <div className="custom-loader "> </div>
            <span>carregando...</span>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2 w-full">
              <p className="text-lg ">
                <strong>Mesa</strong>: {order?.table}
              </p>
              <p className="text-lg">
                <strong>Nome</strong>: {order?.name}
              </p>
              <form
                onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
                  e.preventDefault(); // evita o refresh
                  const formData = new FormData(e.currentTarget);
                  await handleAddItem(formData);
                }}
                className="flex flex-col gap-2"
              >
                {" "}
                <select
                  name="category"
                  id="category"
                  className="p-2 bg-slate-950 w-full rounded-md border border-slate-400"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {category &&
                    category.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </select>
                <select
                  name="product"
                  id="product"
                  className="p-2 bg-slate-950 w-full rounded-md border border-slate-400"
                  required
                  onChange={(e) => setSelectedProductId(e.target.value)}
                >
                  <option value="">Selecione um produto</option>
                  {product &&
                    product.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                </select>
                <input
                  type="number"
                  placeholder="Qtd: 1"
                  min={1}
                  name="amount"
                  value={quantity}
                  className="p-2 bg-slate-950 w-full rounded-md border border-slate-400"
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  required
                />
                {totalPrice > 0 && (
                  <p>
                    <strong>Total:</strong> {totalPrice.toFixed(2)}
                  </p>
                )}
                <input
                  type="submit"
                  value={"Adicionar ao pedido"}
                  className="p-2 bg-green-600 w-full rounded-md cursor-pointer transition-colors hover:bg-green-500 duration-500"
                />
              </form>
            </div>
          </>
        )}
      </div>
      <MdArrowBack
        size={40}
        className="text-red-400 absolute bottom-15 right-20  rounded-md cursor-pointer 
        transition duration-500 hover:text-red-500 hover:-translate-x-3 
         max-md:right-10 max-md:bottom-10
        "
        onClick={handleDeleteOrder}
      />
    </main>
  );
}
