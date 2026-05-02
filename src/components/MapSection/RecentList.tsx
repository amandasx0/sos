"use client";
import CardOrder, { CardOrderType } from "@/src/components/CardOrder";

type RecentListProps = {
  data: CardOrderType[];
  selected: CardOrderType | null;
  onSelect: (item: CardOrderType) => void;
};


const RecentList = ({ data, selected, onSelect }: RecentListProps) => {
  return (
    <div className="flex flex-col gap-4 lg:max-h-125 overflow-y-auto py-4 pr-2">
      {data.map((item) => {
        const isActive = selected?.id === item.id;

        return (
          <div
            key={item.id}
            onClick={() => onSelect(item)}
            className={`rounded-2xl border cursor-pointer transition ${
              isActive
                ? "border-background-primary shadow-lg"
                : "border-gray-200"
            }`}
          >
             <CardOrder
              key={item.id}
              id={item.id}
              tipo={item.tipo}
              descricao={item.descricao}
              urgencia={item.urgencia}
              status={item.status}
              endereco={item.endereco}
              cidade={item.cidade}
              estado={item.estado}
              criado_em={item.criado_em}
              nome={item.nome}
            />
          </div>
        );
      })}
    </div>
  );
};

export default RecentList;