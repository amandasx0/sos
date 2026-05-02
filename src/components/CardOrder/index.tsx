"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/src/hook/auth";

import iconLocation from "../../../public/location.png";
import iconClock from "../../../public/clock.png";
import iconDoctor from "../../../public/icon-doctor.png";
import iconRescue from "../../../public/icon-rescue.png";
import iconFood from "../../../public/icon-food.png";
import iconHelp from "../../../public/icon-help.png";
import {
  iconMap,
  urgenciaLabelMap,
  tipoLabelMap,
  statusLabelMap,
  urgenciaStyleMap,
  urgenciaBgLightMap,
  statusStyleMap,
  estadosSigla,
  Tipo,
  Urgencia,
  Status,
} from "../../utils/maps";

import {
  getTempoDecorrido,
  formatId,
  formatEndereco,
} from "../../utils/format";

export type CardOrderType = {
  id: number;
  tipo: Tipo;
  descricao: string;
  urgencia: Urgencia;
  status: Status;
  endereco: string;
  cidade: string;
  estado: string;
  criado_em: string;
  nome: string;
  onAccept?: () => void;
};

const tipoIconMap = {
  resgate: iconRescue,
  medico: iconDoctor,
  comida_e_agua: iconFood,
};

const CardOrder = ({
  id,
  tipo,
  descricao,
  urgencia,
  status,
  endereco,
  cidade,
  estado,
  criado_em,
  nome,
  onAccept,
}: CardOrderType) => {
  const { user } = useAuth();
  const icon = iconMap[status !== "resolvido" ? urgencia : "sem_urgencia"]?.[tipo];
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isVolunteer =
    pathname === "/voluntarios" && user?.tipo === "voluntario";
  const isAvailable = status === "aberto";

  return (
    <div
      className={`${urgencia === "urgente" && status !== "resolvido" && "border-l-red-600 border-l-4"} bg-background-card border border-gray-300 rounded-2xl p-6 space-y-5 flex flex-col justify-between w-full ${isHome ? "lg:w-full" : "lg:w-[calc(50%-10px)]"}`}
    >
      <div className={`flex flex-wrap lg:flex-nowrap items-start w-full  `}>
        {icon && (
          <div
            className={`${urgenciaBgLightMap[status !== "resolvido" ? urgencia : "sem_urgencia"]} p-2 rounded-md mr-4`}
          >
            <Image src={icon} alt="Ícone" width={32} height={32} />
          </div>
        )}

        <div className="flex flex-col gap-2 w-full">
          <h4 className="text-base font-bold mt-2 lg:mt-0">
            {nome}
            <span className="text-sm text-text-primary font-medium">
              {" "}
              • REQ-{formatId(id)}
            </span>
          </h4>

          <span
            className={`${urgenciaStyleMap[urgencia]} w-2/3 px-3 py-1 rounded-4xl text-xs uppercase text-white text-center font-semibold block lg:hidden`}
          >
            {urgenciaLabelMap[urgencia]}
          </span>

          {status !== "resolvido" && (
            <p className="text-sm text-text-primary max-[425px]:line-clamp-2">
              {descricao}
            </p>
          )}

          {status !== "resolvido" && (
            <div
              className={`flex items-center justify-between flex-wrap ${!isHome && "lg:flex-nowrap"}`}
            >
              <div className="flex items-center gap-1">
                <Image src={iconLocation} alt="Localização" width={14} />
                <p className="text-xs text-text-primary">
                  {formatEndereco(endereco)} - {cidade}/
                  {estadosSigla[estado] ?? estado}
                </p>
              </div>

              <span
                className={`flex items-center text-xs gap-1 mt-2 ${!isHome && "lg:mt-0"}  text-text-primary`}
              >
                <Image src={iconClock} alt="Tempo" width={10} />
                há {getTempoDecorrido(criado_em)}
              </span>
            </div>
          )}

          <div className="flex items-center mt-2">
            <div className="flex items-center gap-1 px-3 py-1 rounded-4xl text-xs bg-background-primary/20 font-semibold text-gray-600 mr-2">
              <Image src={tipoIconMap[tipo]} alt="Tipo" width={12} />
              <p>{tipoLabelMap[tipo]}</p>
            </div>
            <span className="text-text-primary mr-2">•</span>

            <span
              className={`${statusStyleMap[status]} border px-3 py-1 rounded-4xl text-xs font-semibold`}
            >
              {statusLabelMap[status]}
            </span>
          </div>
        </div>

        <span
          className={`${urgenciaStyleMap[status !== "resolvido" ? urgencia : urgencia = "sem_urgencia"]} px-3 py-1 rounded-4xl text-xs uppercase text-white font-semibold hidden whitespace-nowrap lg:flex`}
        >
          {status !== "resolvido" ? urgenciaLabelMap[urgencia] : "Resolvido"}
        </span>
      </div>

      {isVolunteer && isAvailable && (
        <button
          onClick={onAccept}
          className="bg-background-primary shadow-2xl text-white w-full rounded-2xl py-3 font-bold text-sm cursor-pointer hover:bg-blue-900 shadow-xl/20 flex gap-2 items-center justify-center hover:scale-102 "
        >
          <Image src={iconHelp} alt="Icone de ajuda" width={20} height={20} />
          Assumir atendimento
        </button>
      )}
    </div>
  );
};

export default CardOrder;
