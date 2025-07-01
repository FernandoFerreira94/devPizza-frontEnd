"use client";
import Logo from "../../components/logo";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3333/session", {
        email,
        password,
      });
      console.log(response.data);
      const { token, name } = response.data;

      localStorage.setItem("devPizza Token", token);
      router.push("/dashboard");
      toast(`Seja bem vindo ${name} 😉`);
    } catch (error) {
      toast.error("Email ou senha incorretos");
      console.error(error);
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
            placeholder="Digite seu email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* SENHA*/}
          <div className="relative w-full">
            <input
              className="text-white text-sm bg-slate-800 py-2 px-3 rounded-md w-full"
              type={showPassword ? "text " : "password"}
              placeholder="Ex: Abc123@"
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
