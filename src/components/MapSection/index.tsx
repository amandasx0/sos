"use client";

import { useState } from "react";
import Link from "next/link";
import MapView from "./MapView";
import RecentList from "./RecentList";
import { CardOrderType } from "@/src/components/CardOrder";
import { useFilteredOrders } from "@/src/utils/useFilteredOrdes";

type MapSectionProps = {
  data: CardOrderType[];
};

const MapSection = ({ data }: MapSectionProps) => {
  const [selected, setSelected] = useState<CardOrderType | null>(null);

  const filtered = useFilteredOrders(data);

  return (
    <div className="flex gap-6 my-10 flex-wrap lg:flex-nowrap">
      <div className="w-full lg:w-2/3">
        <h2 className="text-2xl font-bold mt-4">Mapa de pedidos</h2>
        <p className="text-text-primary text-sm mb-4 mt-1">
          Toque em um marcador para ver detalhes
        </p>
        <MapView data={filtered} selected={selected} onSelect={setSelected} />
      </div>

      <div className="lg:w-1/3">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold mt-4">Recentes</h2>
          <Link href={"/pedidos"} className="mt-2 text-background-primary text-sm font-bold hover:underline">Ver todos →</Link>
        </div>

        <RecentList
          data={filtered}
          selected={selected}
          onSelect={setSelected}
        />
      </div>
    </div>
  );
};

export default MapSection;
