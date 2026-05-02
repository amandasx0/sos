"use client";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hook/auth";
import iconHand from "../../../public/icon-hand.png";
import api from "@/src/services/api";

type FormData = {
  nome: string;
  email: string;
  senha: string;
};

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selected, setSelected] = useState(() => {
    if (typeof window !== "undefined") {
      const wantBeVoluntary = localStorage.getItem("beVoluntary");

      if (wantBeVoluntary) {
        localStorage.removeItem("beVoluntary");
        return true;
      }
    }

    return false;
  });
  const { login } = useAuth();
  const router = useRouter();
  const params = useSearchParams();

  const schema = z.object({
    nome: z
      .string()
      .min(1, "Nome é obrigatório")
      .min(3, "Nome deve ter pelo menos 3 caracteres"),
    email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
    senha: z.string().min(1, "Senha é obrigatória").min(5, "Senha muito curta"),
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
      const payload = {
        ...data,
        tipo: selected ? "voluntario" : "afetado",
      };
      const response = await api.post("/register", payload);

      const loginResponse = await api.post("/login", {
        email: data.email,
        senha: data.senha,
      });

      const userData = {
        name: response.data.usuario.nome,
        email: response.data.usuario.email,
        tipo: response.data.usuario.tipo,
      };

      const token = loginResponse.data.token;

      login(token, userData);

      const redirect = params?.get("redirect") || "/";
      router.push(redirect);
    } catch (error) {
      console.log(error, "error");
      if (axios.isAxiosError(error)) {
        const data = error.response?.data;

        let message = "Erro ao fazer login";

        if (data?.message) {
          message = data.message;
        } else if (Array.isArray(data?.error)) {
          message = data.error[0];
        } else if (typeof data?.error === "string") {
          message = data.error;
        }

        setErrorMessage(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background-card border border-gray-300 rounded-2xl p-6 shadow-md space-y-5 flex flex-col items-center  lg:w-110">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
        <label className="text-sm font-medium pb-3 text-start">Nome</label>
        <input
          placeholder="Seu nome"
          {...register("nome")}
          className="bg-background-secondary/30 p-2 rounded-lg border border-gray-300 text-sm"
        />
        {errors.nome && (
          <p className="text-xs mt-1 text-text-error text-start">
            {errors.nome.message}
          </p>
        )}

        <label className="text-sm font-medium pb-3 pt-6 text-start">
          E-mail
        </label>
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

        <label className="text-sm font-medium pb-3 pt-6 text-start">
          Senha
        </label>
        <input
          className="bg-background-secondary/30 p-2 rounded-lg border border-gray-300 text-sm"
          placeholder="🔒︎  Mínimo 5 caracteres"
          type="password"
          {...register("senha")}
        />
        {errors.senha && (
          <p className="text-xs mt-1 text-text-error text-start">
            {errors.senha.message}
          </p>
        )}

        {errorMessage && (
          <p className="text-xs mt-1 text-text-error text-start">
            {errorMessage}
          </p>
        )}

        <label
          className={`flex gap-3 border-2 rounded-lg p-4 w-full cursor-pointer mt-6 ${selected ? "border-background-primary bg-background-hover/10" : "border-gray-300"}`}
        >
          <input
            type="checkbox"
            className={`w-5 h-5 accent-background-primary mt-1`}
            checked={selected}
            onChange={(e) => setSelected(e.target.checked)}
          />

          <div className="flex flex-col">
            <div className="flex gap-2 items-center font-medium">
              <Image src={iconHand} alt="Icone" width={20} height={20} />
              <p>Sou voluntário</p>
            </div>

            <span className="text-sm text-text-primary text-start mt-1 lg:mt-0">
              Quero ajudar pessoas afetadas pelas enchentes
            </span>
          </div>
        </label>

        <button
          type="submit"
          className="bg-background-primary p-2 mt-6 rounded-lg text-base text-white font-bold"
        >
          {loading ? "... Registrando" : "Criar conta"}
        </button>
      </form>
    </div>
  );
};

export default Register;
