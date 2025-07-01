import Logo from "../../components/logo";
import Link from "next/link";

export default function Login() {
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <div className=" p-5 flex flex-col items-center w-3/10">
        <Logo textSize="text-7xl max-sm:text-6xl" iconsSize={60} />
        <form className="mt-5 flex flex-col gap-3 w-full">
          <input
            className="text-white text-sm bg-slate-800 py-2 px-3 rounded-md w-full"
            type="text"
            placeholder="Digite seu email"
          />
          <input
            className="text-white text-sm bg-slate-800 py-2 px-3 rounded-md w-full"
            type="text"
            placeholder="Ex: Abc123@"
          />
          <input
            className="text-white bg-red-600 py-1 px-3 rounded-md w-full cursor-pointer 
            transition duration-500 hover:bg-red-700
            "
            type="submit"
            value={"Login"}
          />
        </form>
        <div className="w-full flex justify-center mt-2">
          <Link
            className="text-white text-center 
          transition duration-500 hover:text-slate-400
          "
            href="/register"
          >
            Ainda não possui uma conta? Clique aqui
          </Link>
        </div>
      </div>
    </main>
  );
}
