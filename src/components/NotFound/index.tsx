"use client";
import Image from "next/image";
import iconNotFound from "../../../public/icon-not-found.png";

type Props = {
  onChange: (filters: {
    search: string;
    tipo: string;
    urgencia: string;
  }) => void;
};

const NotFound = ({ onChange }: Props) => {
  const clearFilters = () => {
    onChange({
      search: "",
      tipo: "todos",
      urgencia: "todas",
    });
  };

  return (
    <div className="bg-background-card border border-dashed border-gray-300 rounded-2xl px-2 lg:px-0 py-8 gap-4 flex flex-col items-center mt-4">
      <Image
        src={iconNotFound}
        alt="Icone que não encontrou nenhum item nos filtros selecionados"
        width={32}
        height={32}
      />
      <h3 className="text-text-secondary font-bold text-lg lg:text-2xl text-center">
        Nenhum pedido encontrado
      </h3>
      <p className="text-text-primary text-center">
        Tente ajustar os filtros para ver mais resultados.
      </p>
      <button
        onClick={clearFilters}
        className="group flex items-center gap-2 border border-gray-300 cursor-pointer px-5 py-2 rounded-lg text-text-secondary font-medium hover:text-background-primary hover:border-background-primary"
      >
        Limpar filtros
      </button>
    </div>
  );
};

export default NotFound;
