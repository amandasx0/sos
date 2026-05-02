"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { formatTelefone } from "../../utils/format";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import api from "@/src/services/api";

const ModalShelter = ({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;

  const schema = z
    .object({
      nome: z.string().min(3),
      endereco: z.string().min(1),
      cidade: z.string().min(1),
      estado: z.string().min(2),

      capacidade_total: z.coerce.number().min(1),
      capacidade_ocupada: z.coerce.number().min(0),

      telefone: z
        .string()
        .min(10)
        .regex(phoneRegex, "Telefone inválido. Use (21) 99999-9999"),

      aceita_animais: z.coerce.boolean().default(false),
      aceita_pcd: z.coerce.boolean().default(false),
      aceita_idoso: z.coerce.boolean().default(false),
      aceita_crianca: z.coerce.boolean().default(false),
    })
    .refine((data) => data.capacidade_ocupada <= data.capacidade_total, {
      message: "Capacidade ocupada não pode ser maior que a total",
      path: ["capacidade_ocupada"],
    });

  type FormInput = z.input<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`;

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    };
  }, []);

  const onSubmit = async (data: FormInput) => {
    try {
      setLoading(true);

      await api.post("/register-shelter", data);

      onSuccess();
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" />

      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="bg-background-card border border-gray-300 rounded-2xl p-6 shadow-md w-[90%] max-w-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-start">Nome</label>
              <input
                placeholder="Nome do abrigo"
                {...register("nome")}
                className="bg-background-secondary/30 p-2 rounded-lg border border-gray-300 text-sm"
              />
              {errors.nome && (
                <p className="text-xs mt-1 text-text-error">
                  {errors.nome.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-start">
                Endereço completo
              </label>
              <input
                placeholder="Endereço"
                {...register("endereco")}
                className="bg-background-secondary/30 p-2 rounded-lg border border-gray-300 text-sm"
              />
              {errors.endereco && (
                <p className="text-xs mt-1 text-text-error">
                  {errors.endereco.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-start">Cidade</label>
              <input
                placeholder="Digite sua cidade"
                {...register("cidade")}
                className="bg-background-secondary/30 p-2 rounded-lg border border-gray-300 text-sm"
              />
              {errors.cidade && (
                <p className="text-xs mt-1 text-text-error">
                  {errors.cidade.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-start">Estado</label>
              <input
                placeholder="Digite sua estado"
                {...register("estado")}
                className="bg-background-secondary/30 p-2 rounded-lg border border-gray-300 text-sm"
              />
              {errors.estado && (
                <p className="text-xs mt-1 text-text-error">
                  {errors.estado.message}
                </p>
              )}
            </div>

            <div className="flex gap-2 flex-wrap lg:flex-nowrap">
              <div className="flex flex-col gap-1 w-full lg:w-1/2">
                <label className="text-sm font-medium text-start">
                  Capacidade total
                </label>
                <input
                  type="number"
                  placeholder="Digite a capacidade total"
                  {...register("capacidade_total", { valueAsNumber: true })}
                  className="bg-background-secondary/30 p-2 rounded-lg border border-gray-300 text-sm"
                />
              </div>

              <div className="flex flex-col gap-1 w-full lg:w-1/2">
                <label className="text-sm font-medium text-start">
                  Capacidade ocupada
                </label>
                <input
                  type="number"
                  placeholder="Digite a capacidade ocupada"
                  {...register("capacidade_ocupada", { valueAsNumber: true })}
                  className="bg-background-secondary/30 p-2 rounded-lg border border-gray-300 text-sm "
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-start">Telefone</label>
              <input
                placeholder="Digite seu telefone: (21) 9999-9999"
                {...register("telefone")}
                onChange={(e) => {
                  e.target.value = formatTelefone(e.target.value);
                }}
                className="bg-background-secondary/30 p-2 rounded-lg border border-gray-300 text-sm"
              />
              {errors.telefone && (
                <p className="text-xs mt-1 text-text-error">
                  {errors.telefone.message}
                </p>
              )}
            </div>

            <label className="text-sm font-medium text-start">
              Aceitamos *
            </label>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("aceita_animais")}
                  className="hidden peer"
                />

                <div className="w-5 h-5 rounded-md border border-gray-300 flex items-center justify-center peer-checked:bg-background-primary peer-checked:border-background-primary transition">
                  <svg
                    className="w-3 h-3 text-white hidden peer-checked:block"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <span>Animais</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("aceita_pcd")}
                  className="hidden peer"
                />

                <div className="w-5 h-5 rounded-md border border-gray-300 flex items-center justify-center peer-checked:bg-background-primary peer-checked:border-background-primary transition">
                  <svg
                    className="w-3 h-3 text-white hidden peer-checked:block"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <span>PCD</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("aceita_idoso")}
                  className="hidden peer"
                />

                <div className="w-5 h-5 rounded-md border border-gray-300 flex items-center justify-center peer-checked:bg-background-primary peer-checked:border-background-primary transition">
                  <svg
                    className="w-3 h-3 text-white hidden peer-checked:block"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <span>Idoso</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("aceita_crianca")}
                  className="hidden peer"
                />

                <div className="w-5 h-5 rounded-md border border-gray-300 flex items-center justify-center peer-checked:bg-background-primary peer-checked:border-background-primary transition">
                  <svg
                    className="w-3 h-3 text-white hidden peer-checked:block"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <span>Criança</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`bg-background-primary text-white py-3 rounded-lg font-bold mt-4 flex items-center justify-center gap-2 transition-all ${loading ? "opacity-70 cursor-not-allowed" : "hover:scale-102"}`}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Enviando...
                </>
              ) : (
                "Cadastrar abrigo"
              )}
            </button>

            <button
              onClick={() => {
                onClose();
              }}
              className="text-text-secondary text-sm text-center cursor-pointer rounded-lg py-2 hover:border hover:border-text-secondary "
            >
              Voltar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ModalShelter;
