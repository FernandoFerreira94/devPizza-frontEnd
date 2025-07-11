"use client";
import Logo from "@/logo/index";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { api } from "@/service/api";
import Cookies from "js-cookie";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      if (!response.data.token) {
        return;
      }

      const { token, name } = response.data;

      Cookies.set("devPizzaToken", token, {
        expires: 7, // 7 dias
        path: "/", // disponível em toda a aplicação
      });
      toast.success(`Sejá bem vindo ${name}`);
      router.push("/dashboard");
    } catch (error) {
      toast.warning("Email ou senha incorretos");
      console.log(error);
    }
  }

  return (
    <main className="w-full h-screen flex justify-center items-center">
      <div
        className=" p-5 flex flex-col items-center w-3/10
        max-sm:w-9/10
      "
      >
        <Logo textSize="text-7xl max-sm:text-6xl" iconsSize={60} />
        <form
          className="mt-5 flex flex-col gap-3 w-full"
          onSubmit={handleLogin}
        >
          {/* EMAIL*/}
          <input
            className="text-white text-sm bg-slate-800 py-2 px-3 rounded-md w-full"
            type="text"
            placeholder="admin@admin.com"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* SENHA*/}
          <div className="relative w-full">
            <input
              className="text-white text-sm bg-slate-800 py-2 px-3 rounded-md w-full"
              type={showPassword ? "text " : "password"}
              placeholder="Admin@123"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute right-3 top-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEye size={18} color="white" />
              ) : (
                <AiOutlineEyeInvisible size={18} color="white" />
              )}
            </span>
          </div>
          <input
            className="text-white bg-red-500 py-1 px-3 rounded-md w-full cursor-pointer 
            transition duration-500 hover:bg-red-700
            "
            type="submit"
            value={"Login"}
          />
        </form>
        <div className="w-full flex justify-center mt-2">
          <Link className="text-white text-center" href="/signup">
            Ainda não possui uma conta? Clique aqui
          </Link>
        </div>
      </div>
    </main>
  );
}
