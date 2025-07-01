"use client";

// hook Node
import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { toast } from "react-toastify";

// components
import Logo from "../../components/logo";

interface FormRegister {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormRegister>();

  const router = useRouter();

  // VALIDAR SENHA
  function validarSenha(senha: string): boolean {
    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])\S+$/;
    return regex.test(senha);
  }

  // Formulario de envio
  async function handleRegister(data: FormRegister) {
    try {
      // VERIFICAR SE O EMAIL JA ESTA CADASTRADO NO DB
      const check = await axios.post(
        "http://localhost:3333/users/check-email",
        {
          email: data.email,
        }
      );

      if (check.data.exists) {
        toast.info("Email ja cadastrado");
        return;
      }

      // ENVIO DO FORMULARIO PARA O DB
      await axios.post("http://localhost:3333/users", data);
      toast.success("Cadastro realizado com sucesso");
      reset();
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="w-full  h-screen flex justify-center items-center">
      <div
        className=" p-5 flex flex-col items-center w-3/10 
      max-sm:w-9/10
      "
      >
        <Logo textSize="text-7xl max-sm:text-6xl" iconsSize={60} />
        <h1 className="text-2xl mt-1 ">Cadastrar-se</h1>
        <form
          className="mt-5 flex flex-col gap-3 w-full"
          onSubmit={handleSubmit(handleRegister)}
        >
          {/* NOME */}
          <input
            className="text-white text-sm bg-slate-800 py-2 px-3 rounded-md w-full"
            type="text"
            placeholder="Nome"
            {...register("name", { required: "Nome é obrigatório" })}
          />
          {errors.name && (
            <small className="text-red-400 ">{errors.name.message}</small>
          )}

          {/* EMAIL */}
          <input
            className="text-white text-sm bg-slate-800 py-2 px-3 rounded-md w-full"
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email é obrigatório" })}
          />
          {errors.email && (
            <small className="text-red-400 ">{errors.email.message}</small>
          )}

          {/* PASSWORD */}
          <div className="relative w-full">
            <input
              className="text-white text-sm  bg-slate-800 py-2 px-3 rounded-md w-full "
              type={showPassword ? "text " : "password"}
              placeholder="Ex: Abc123@"
              {...register("password", {
                required: "Senha é obrigatória",
                validate: (value) =>
                  validarSenha(value) ||
                  "1 caractere maiuscula, 1 minuscula, 1 numero e 1 caractere especial",
              })}
            />
            {errors.password && (
              <small className="text-red-400 ">{errors.password.message}</small>
            )}
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

          {/* SUBMIT */}
          <input
            className="text-white bg-red-600 py-1 px-3 rounded-md w-full cursor-pointer 
            transition duration-500 hover:bg-red-700
            "
            type="submit"
            value={"Cadastrar"}
            disabled={isSubmitting}
          />
        </form>
        <div className="w-full flex justify-center mt-2">
          <Link
            className="text-white text-center 
          transition duration-500 hover:text-slate-400
          "
            href="/login"
          >
            Já possui uma conta? clica aqui
          </Link>
        </div>
      </div>
    </main>
  );
}
