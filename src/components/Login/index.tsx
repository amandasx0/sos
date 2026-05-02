"use client";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hook/auth";
import api from "@/src/services/api";

type FormData = {
  email: string;
  senha: string;
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const { login } = useAuth();

  const schema = z.object({
    email: z.string().email("Email inválido"),
    senha: z.string().min(5, "Senha muito curta"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const response = await api.post("/login", data);

      const userData = {
        name: response.data.user.nome,
        email: response.data.user.email,
        tipo: response.data.user.tipo,
      };

      const token = response.data.token;

      login(token, userData);

      const redirect = params?.get("redirect") || "/";
      router.push(redirect);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;
        setErrorMessage(message || "Erro ao fazer login");
      }
    }  finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background-card border border-gray-300 rounded-2xl p-6 shadow-md space-y-5 flex flex-col items-center lg:w-110">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
        <label className="text-sm font-medium pb-3 text-start">E-mail</label>
        <input
          placeholder="✉  email@email.com"
          {...register("email")}
          className="bg-background-secondary/30 p-2 rounded-lg border border-gray-300 text-sm"
        />
        {errors.email && (
          <p className="text-xs mt-1 text-text-error text-start">
            {errors.email.message}
          </p>
        )}

        {errorMessage === "Usuário não existe" && (
          <p className="text-xs mt-1 text-text-error text-start">
            {errorMessage}
          </p>
        )}

        <label className="text-sm font-medium pb-3 pt-6 text-start">
          Senha
        </label>
        <div className="relative">
          <input
            className="bg-background-secondary/30 p-2 pr-10 rounded-lg border border-gray-300 text-sm w-full"
            placeholder="🔒︎  Mínimo 5 caracteres"
            type={showPassword ? "text" : "password"}
            {...register("senha")}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.senha && (
          <p className="text-xs mt-1 text-text-error text-start">
            {errors.senha.message}
          </p>
        )}
        {errorMessage === "Senha inválida" && (
          <p className="text-xs mt-1 text-text-error text-start">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          className="bg-background-primary p-2 mt-6 rounded-lg text-base text-white font-bold cursor-pointer"
        >
          {loading ? (
           "...Entrando"
          ) : (
            "Entrar"
          )}
        </button>
      </form>
     {/*  <p className="text-text-primary text-sm">
        Esqueceu a senha?{" "}
        <span className="text-background-primary font-medium">Recuperar</span>
      </p> */}
    </div>
  );
};

export default Login;
