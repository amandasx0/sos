"use client";
import { useState, useEffect } from "react";
import Layout from "@/src/components/Layout";
import SearchOrder from "@/src/components/SearchOrders";
import CardOrder, { CardOrderType } from "@/src/components/CardOrder";
import NotFound from "@/src/components/NotFound";
import SkeletonOrders from "@/src/components/Skeleton";
import api from "@/src/services/api";

const OrderPag = () => {
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    tipo: "todos",
    urgencia: "todas",
  });

  const [data, setData] = useState<CardOrderType[]>([]);

  const fetchOrders = async () => {
    setLoading(true);

    const res = await api.get("/orders", {
      params: {
        search: filters.search,
        tipo: filters.tipo !== "todos" ? filters.tipo : undefined,
        urgencia: filters.urgencia !== "todas" ? filters.urgencia : undefined,
      },
    });

    setData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchOrders();
    }, 500);

    return () => clearTimeout(delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

   const sortedData = [...data].sort((a, b) => {
  if (a.status === "resolvido" && b.status !== "resolvido") return 1;
  if (a.status !== "resolvido" && b.status === "resolvido") return -1;
  return 0;
});


  return (
    <Layout content={true}>
      <h2 className="text-3xl font-extrabold mt-4">Todos os pedidos</h2>
      <p className="text-text-primary mt-2 mb-6">
        {data.length} pedidos encontrados
      </p>
      <SearchOrder onChange={setFilters} filters={filters} />
      {loading ? (
        <SkeletonOrders />
      ) : data.length > 0 ? (
        <div className="flex flex-wrap gap-4 mt-5">
          {sortedData.map((item) => (
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
          ))}
        </div>
      ) : (
        <NotFound onChange={setFilters} />
      )}
    </Layout>
  );
};

export default OrderPag;
