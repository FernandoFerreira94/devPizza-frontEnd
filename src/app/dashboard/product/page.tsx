import { api } from "@/service/api";
import { getCookiesServer } from "@/lib/cookieServe";
import UploadImg from "./components/Upload/UploadImage";

interface CategoryProps {
  id: string;
  name: string;
}

// 🔄 Função de servidor para buscar as categorias
async function getCategories(): Promise<CategoryProps[]> {
  const token = await getCookiesServer();

  try {
    const response = await api.get("/category", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar categorias: ", error);
    return [];
  }
}

// ✅ Função de servidor para cadastrar produto com envio de imagem
async function handleRegisterProduct(formData: FormData) {
  "use server";

  const name = formData.get("product");
  const price = formData.get("price");
  const description = formData.get("description");
  const file = formData.get("file") as File;
  const category_id = formData.get("category");

  const token = await getCookiesServer();

  // 🔁 Criando FormData manualmente para enviar imagem
  const data = new FormData();
  data.append("name", name as string);
  data.append("price", price as string);
  data.append("description", description as string);
  data.append("file", file);
  data.append("category_id", category_id as string);

  try {
    const response = await api.post("/product", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        // ❌ NÃO DEFINA 'Content-Type' ao usar FormData, o Axios faz isso
      },
    });

    console.log("Produto cadastrado:", response.data);
  } catch (error) {
    console.error("Erro ao cadastrar produto:", error);
  }
}

// ✅ Componente principal
export default async function Product() {
  // ⬇️ Executa busca das categorias ANTES do retorno
  const categories = await getCategories();

  return (
    <main className="w-full flex flex-col justify-center items-center  max-md:mt-20">
      <div className="w-4/10 flex items-center gap-5 flex-col max-md:w-6/10 max-md:justify-center">
        <form
          className="w-full mt-5 flex flex-col gap-3"
          action={handleRegisterProduct}
        >
          <h1 className="text-2xl font-bold text-start">Novo produto</h1>

          <UploadImg />

          <select
            className="p-2 bg-slate-950 w-full rounded-md border border-slate-400"
            name="category"
            required
          >
            <option value="">Selecione uma categoria</option>
            {categories.length === 0 ? (
              <option disabled>Carregando categorias...</option>
            ) : (
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))
            )}
          </select>

          <input
            className="p-2 bg-slate-950 w-full rounded-md border border-slate-400"
            type="text"
            placeholder="Nome do produto"
            name="product"
            required
          />

          <input
            className="p-2 bg-slate-950 w-full rounded-md border border-slate-400"
            type="text"
            placeholder="Preço ex: 29.90"
            name="price"
            required
          />

          <textarea
            className="p-2 bg-slate-950 w-full rounded-md border border-slate-400"
            rows={4}
            cols={50}
            placeholder="Descrição do produto..."
            name="description"
            required
          />

          <input
            className="p-2 bg-green-600 w-full rounded-md border border-slate-400 cursor-pointer transition ease-in-out duration-500 hover:bg-green-800"
            type="submit"
            value={"Cadastrar"}
          />
        </form>
      </div>
    </main>
  );
}
