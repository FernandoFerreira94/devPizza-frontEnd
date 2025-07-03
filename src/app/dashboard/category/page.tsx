import { api } from "@/service/api";
import { getCookiesServer } from "@/lib/cookieServe";

export default function Category() {
  async function handleRegisterCategory(formData: FormData) {
    "use server";
    const category = formData.get("category");
    const token = await getCookiesServer();
    const data = {
      name: category,
    };

    try {
      const response = await api.post("/category", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <main
        className="w-full flex flex-col justify-center items-center  mt-30
          max-md:mt-20"
      >
        <div
          className="w-3/10 flex items-center gap-5  flex-col
            max-md:w-6/10 max-md:justify-center"
        >
          <h1 className="text-2xl font-bold text-start">Nova categoria</h1>
          <form
            className=" w-full mt-5 flex flex-col gap-3"
            action={handleRegisterCategory}
          >
            <input
              className="p-2 bg-slate-950 w-full rounded-md border border-slate-400"
              type="text"
              placeholder="Categoria... ex: Pizza"
              name="category"
              required
            />
            <input
              className="p-2 bg-green-600 w-full rounded-md border border-slate-400 cursor-pointer 
              transition ease-in-out duration-500 hover:bg-green-800
              "
              type="submit"
              value={"Cadastrar"}
            />
          </form>
        </div>
      </main>
    </>
  );
}
