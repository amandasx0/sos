"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hook/auth";
import Image from "next/image";
import HelpOption from "../ButtonHelperOption";
import UrgencyOption, { UrgentType } from "../UrgencyOption";

import iconDoctor from "../../../public/icon-doctor.png";
import iconRescue from "../../../public/icon-rescue.png";
import iconFood from "../../../public/icon-food.png";
import iconLocationGrey from "../../../public/icon-location.png";
import iconLocation from "../../../public/location.png";
import iconLocationBlue from "../../../public/locationBlue.png";
import iconSend from "../../../public/icon-send.png";
import api from "@/src/services/api";

type FormData = {
  tipo: string;
  nome: string;
  descricao?: string;
  urgencia: string;
  latitude?: number;
  longitude?: number;
  cidade?: string;
  estado?: string;
  endereco: string;
};

const FormHelp = () => {
  const [typeHelp, setTypeHelp] = useState("");
  const [loading, setLoading] = useState(false)
  const [urgent, setUrgent] = useState<UrgentType | null>(null);
  const { token } = useAuth();
  const router = useRouter();

  const schema = z.object({
    tipo: z.string().min(1, "Endereço é obrigatório"),
    nome: z.string().min(1, "Nome é obrigatório").min(3),
    descricao: z.string().optional(),
    urgencia: z.string().min(1, "Urgencia é obrigatório"),
    endereco: z.string().min(1, "Endereço é obrigatório"),

    latitude: z.number().optional(),
    longitude: z.number().optional(),
    cidade: z.string().optional(),
    estado: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const saved = localStorage.getItem("pendingForm");

    if (saved) {
      const parsed: Partial<FormData> = JSON.parse(saved);

      Object.entries(parsed).forEach(([key, value]) => {
        setValue(key as keyof FormData, value as FormData[keyof FormData]);
      });

      localStorage.removeItem("pendingForm");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAddressFromCoords = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      );

      const data = await res.json();

      return {
        fullAddress: data.display_name,
        city: data.address.city || data.address.town || data.address.village,
        state: data.address.state,
        suburb: data.address.suburb,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      setValue("latitude", latitude);
      setValue("longitude", longitude);

      const locationData = await getAddressFromCoords(latitude, longitude);

      if (locationData) {
        setValue("endereco", locationData.fullAddress);
        setValue("cidade", locationData.city);
        setValue("estado", locationData.state);
      }
    });
  };

  const onSubmit = async (data: FormData) => {
    if (!token) {
      localStorage.setItem("pendingForm", JSON.stringify(data));
      router.push("/entrar?redirect=/novo-pedido");
      return;
    }

    try {
      setLoading(true)
      await api.post("/create-orders", data);

      router.push("/pedidos");
    } catch (errors) {
      console.log(errors);
    } finally {
      setLoading(false)
    }
  };

  const enderecoValue = watch("endereco") || "";

  const handleSelectType = (value: string) => {
    setTypeHelp(value);
    setValue("tipo", value);
  };

  const handleSelectUrgency = (value: UrgentType) => {
    setUrgent(value);
    setValue("urgencia", value);
  };

  return (
    <div className="bg-background-card border border-gray-300 rounded-2xl p-6 shadow-md space-y-5 flex flex-col items-center  lg:w-160">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
        <label className="text-sm font-medium pb-3 text-start">
          Tipo de ajuda *
        </label>
        <div className="flex gap-4 flex-wrap lg:flex-nowrap">
          <HelpOption
            value="resgate"
            selected={typeHelp}
            onSelect={handleSelectType}
            icon={iconRescue}
            title="Resgate"
            description="Pessoa em risco"
          />

          <HelpOption
            value="comida_e_agua"
            selected={typeHelp}
            onSelect={handleSelectType}
            icon={iconFood}
            title="Comida e água"
            description="Alimentos / água"
          />

          <HelpOption
            value="medico"
            selected={typeHelp}
            onSelect={handleSelectType}
            icon={iconDoctor}
            title="Médico"
            description="Saúde / remédios"
          />
        </div>

        <label className="text-sm font-medium pb-3 pt-6 text-start">
          Seu nome
        </label>
        <input
          placeholder="Como podemos te chamar?"
          {...register("nome")}
          className="bg-background-secondary/30 p-2 rounded-lg border border-gray-300 text-sm"
        />
        {errors.nome && (
          <p className="text-xs mt-1 text-text-error">{errors.nome.message}</p>
        )}

        <label className="text-sm font-medium pb-3 pt-6 text-start">
          Descrição da situação *
        </label>
        <textarea
          placeholder="Quantas pessoas, há quanto tempo, há crianças/idosos..."
          {...register("descricao")}
          className="bg-background-secondary/30 p-2 rounded-lg border border-gray-300 text-sm h-40 lg:h-auto"
        />

        <label className="text-sm font-medium pb-3 pt-6 text-start">
          Nível de urgência *
        </label>
        <div className="flex flex-col gap-3">
          <UrgencyOption
            value="urgente"
            selected={urgent}
            onSelect={handleSelectUrgency}
            label="Urgente"
            description="risco imediato"
          />

          <UrgencyOption
            value="medio"
            selected={urgent}
            onSelect={handleSelectUrgency}
            label="Médio"
            description="preciso em breve"
          />

          <UrgencyOption
            value="sem_urgencia"
            selected={urgent}
            onSelect={handleSelectUrgency}
            label="Sem urgência"
            description=""
          />
        </div>

        <div className="flex flex-col mt-6 gap-4">
          <div className="relative">
          <label className="text-sm font-medium text-start">
            Rua *
          </label>
            {!enderecoValue && (
              <Image
                src={iconLocation}
                alt="Icon localização"
                width={16}
                height={16}
                className="absolute left-3 top-10 mt-1 -translate-y-1/2 opacity-60"
              />
            )}

            <input
              placeholder="           Endereço e bairro"
              {...register("endereco")}
              className="bg-background-secondary/30 p-2 rounded-lg border border-gray-300 text-sm w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium pb-2 text-start">
              Cidade *
            </label>
            <input
              placeholder="Ex: Duque de Caxias"
              {...register("cidade")}
              className="bg-background-secondary/30 p-2 rounded-lg border border-gray-300 text-sm w-full"
            />
            {errors.cidade && (
              <p className="text-xs mt-1 text-text-error">
                {errors.cidade.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium pb-2 text-start">
              Estado *
            </label>
            <input
              placeholder="Ex: RJ"
              {...register("estado")}
              className="bg-background-secondary/30 p-2 rounded-lg border border-gray-300 text-sm w-full"
            />
            {errors.estado && (
              <p className="text-xs mt-1 text-text-error">
                {errors.estado.message}
              </p>
            )}
          </div>

          <button
            onClick={handleGetLocation}
            className="group flex items-center justify-center gap-2 border border-gray-300 cursor-pointer px-2 lg:px-5 py-2 rounded-lg text-text-secondary font-medium text-sm hover:text-background-primary hover:border-background-primary hover:bg-background-hover transition"
          >
            <span className="block group-hover:hidden">
              <Image
                src={iconLocationGrey}
                alt="Icone localização"
                width={20}
              />
            </span>
            <span className="hidden group-hover:block">
              <Image
                src={iconLocationBlue}
                alt="Icone localização"
                width={20}
              />
            </span>
              Usar localizaço atual
          </button>
        </div>

        <button
          type="submit"
          className="bg-[linear-gradient(135deg,#eb1e1e_0%,#f44e25_100%)] shadow-xl/20 py-4 mt-6 rounded-lg text-base text-white font-bold flex  justify-center gap-4 cursor-pointer  hover:scale-102 "
        >
          {loading ? "...Enviando pedido" : (
            <>
             <Image src={iconSend} alt="Icone de envio do formulário" width={20} />
             Enviar pedido
            </>
          )}
         
        </button>
      </form>
    </div>
  );
};

export default FormHelp;
