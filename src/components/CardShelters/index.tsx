import Image from "next/image";

import {
  formatEndereco,
  formatTelefone,
  getCorOcupacao,
} from "../../utils/format";

import { estadosSigla } from "../../utils/maps";
import { getVagasDisponiveis } from "@/src/utils/shelters";

import iconShelter from "../../../public/icon-shelter.png";
import iconLocation from "../../../public/location.png";
import iconPhone from "../../../public/icon-phone.png";
import iconPeople from "../../../public/icon-people.png";
import iconCheck from "../../../public/icon-check.png";

export type SheltersType = {
  id: number;
  nome: string;
  endereco: string;
  cidade: string;
  estado: string;
  capacidade_total: number;
  capacidade_ocupada: number;
  telefone: string;
  aceita_animais: boolean;
  aceita_pcd: boolean;
  aceita_idoso: boolean;
  aceita_crianca: boolean;
  voluntario_id_abrigo: number;
};

type CardSheltersProps = SheltersType & {
  onClick?: () => void;
};

const CardShelters = ({
  nome,
  endereco,
  cidade,
  estado,
  capacidade_total,
  capacidade_ocupada,
  telefone,
  aceita_animais,
  aceita_pcd,
  aceita_idoso,
  aceita_crianca,
  onClick,
}: CardSheltersProps) => {
  const porcentagem = capacidade_total
    ? (capacidade_ocupada / capacidade_total) * 100
    : 0;
  const vagas = getVagasDisponiveis(capacidade_total, capacidade_ocupada);
  const lotado = vagas === 0;

  const tiposDeVaga = [
    { label: "Animais", value: aceita_animais },
    { label: "PCD", value: aceita_pcd },
    { label: "Criança", value: aceita_crianca },
    { label: "Idoso", value: aceita_idoso },
  ];

  return (
    <div className="bg-background-card border border-gray-300 rounded-2xl p-6 gap-2 flex flex-col lg:flex-nowrap items-start w-full lg:w-[calc(50%-10px)] hover:shadow-2xs">
      <div className="flex items-start w-full flex-wrap justify-between">
        <div className="flex items-start">
          <div className="bg-background-primary/10 p-3 rounded-md mr-4">
            <Image
              src={iconShelter}
              alt="Icone de abrigo"
              width={28}
              height={32}
            />
          </div>

          <div className="flex-1">
            <h4 className="text-base font-bold">{nome}</h4>
            <div className="flex items-center gap-1 mt-1">
              <Image src={iconLocation} alt="Localização" width={14} />
              <p className="text-sm text-text-primary">
                {cidade}/{estadosSigla[estado] ?? estado}
              </p>
            </div>
          </div>
        </div>

        <span
          className={`${lotado ? "bg-red-600 text-white uppercase" : "bg-green-300/20 text-green-700 border-green-700"} px-3 py-1 rounded-4xl text-xs font-semibold mt-2 lg:mt-0`}
        >
          {lotado ? "Lotado" : `${vagas} vagas`}
        </span>
      </div>

      <div className="flex items-center gap-1 mt-1">
        <Image src={iconLocation} alt="Localização" width={16} />
        <p className="text-sm text-text-primary">{formatEndereco(endereco)}</p>
      </div>

      <div className="flex items-center gap-1">
        <Image src={iconPhone} alt="Icone de telefone" width={16} />
        <p className="text-sm text-text-primary">{formatTelefone(telefone)}</p>
      </div>

      <div className="w-full mt-3">
        <div className="flex items-center gap-1">
          <Image src={iconPeople} alt="Icone pessoas" width={12} />
          <p className="text-xs text-text-primary font-bold">Ocupaçao</p>

          <p className="ml-auto text-xs text-text-secondary font-bold">
            {capacidade_ocupada} / {capacidade_total}
          </p>
        </div>
        <div className=" bg-gray-200 rounded-full h-2 mt-1">
          <div
            className={`${getCorOcupacao(porcentagem)} h-2 rounded-full transition-all`}
            style={{ width: `${porcentagem}%` }}
          />
        </div>
      </div>

      <div className="flex mt-3">
        {tiposDeVaga
          .filter((item) => item.value)
          .map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-1 px-3 py-1 rounded-4xl text-xs bg-background-primary/20 font-semibold text-background-primary mr-2"
            >
              <Image src={iconCheck} alt="Icone check" width={8} />
              <span className="text-xs">{item.label}</span>
            </div>
          ))}
      </div>

      <button
        disabled={lotado}
        onClick={onClick}
        className={`${lotado ? "bg-gray-100 border border-text-primary text-text-primary" : "bg-background-primary shadow-2xl text-white "} w-full rounded-2xl py-3 mt-3 font-bold text-sm  ${!lotado && "hover:bg-blue-900 shadow-xl/20 hover:scale-102 cursor-pointer"} `}
      >
        {lotado ? "Sem vagas" : "Ver detalhes"}
      </button>
    </div>
  );
};

export default CardShelters;
