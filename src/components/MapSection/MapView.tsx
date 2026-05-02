"use client";

import { CardOrderType } from "@/src/components/CardOrder";

import { formatEndereco } from "@/src/utils/format";

type Props = {
  data: CardOrderType[];
  selected: CardOrderType | null;
  onSelect: (item: CardOrderType) => void;
};

const getColor = (urgencia: string) => {
  if (urgencia === "urgente") return "bg-red-500";
  if (urgencia === "medio") return "bg-orange-400";
  return "bg-green-500";
};

const MapFake = ({ data, selected, onSelect }: Props) => {
  console.log(data)
  return (
    <div className="relative w-full h-125 rounded-2xl overflow-hidden bg-[#e6eef6] border border-gray-200">
      <div className="absolute inset-0 bg-[linear-gradient(#dbe5ef_1px,transparent_1px),linear-gradient(90deg,#dbe5ef_1px,transparent_1px)] bg-size-[40px_40px]" />

      <div className="absolute bottom-20 left-0 w-full h-32 bg-blue-200/60 rounded-full blur-sm" />

      {data.map((item, index) => {
        const isSelected = selected?.id === item.id;

        const top = `${20 + ((index * 13) % 70)}%`;
        const left = `${10 + ((index * 17) % 80)}%`;

        return (
          <div
            key={item.id}
            onClick={() => onSelect(item)}
            className="absolute cursor-pointer group"
            style={{ top, left }}
          >
            {isSelected && (
              <span className="absolute top-6 bg-text-secondary text-white left-1/2 -translate-x-24 w-84 line-clamp-1 text-xs px-3 rounded-full  shadow-md transition-all duration-200 group-hover:scale-105 hidden lg:block">
                {formatEndereco(item.endereco)} - {item.cidade}
              </span>
            )}

            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full ${item.urgencia === "urgente" && getColor(item.urgencia)} opacity-75`}
            />

            <div
              className={`w-4 h-4 rounded-full shadow-lg ${getColor(item.urgencia)} transition-transform duration-200 group-hover:scale-125`}
            />
          </div>
        );
      })}

      <div className="absolute bottom-4 left-4 bg-white rounded-xl shadow px-4 py-2 text-xs">
        <p className="font-bold mb-1">LEGENDA</p>
        <div className="flex gap-3">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full" /> Urgente
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-orange-400 rounded-full" /> Médio
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full" /> Resolvido
          </span>
        </div>
      </div>

      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs shadow flex items-center gap-2">
        <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
        AO VIVO
      </div>
    </div>
  );
};

export default MapFake;
