"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "@/src/components/Layout";
import { ReservationType } from "../Reservation";
import { formatDate } from "../../utils/format";
import { useAuth } from "@/src/hook/auth";
import api from "@/src/services/api";

export default function MessagesPage() {
  const { user } = useAuth();
  const [data, setData] = useState<ReservationType[]>([]);

  const fetchConversations = async () => {
    try {
      if (user?.tipo === "voluntario") {
        const res = await api.get("/voluntary/activity");
        setData(res.data);
      }
      if (user?.tipo === "afetado") {
        const res = await api.get("/user/activity");
        setData(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchConversations();
    }, 500);

    return () => clearTimeout(delay);
  }, []);

  const pedidos = data.filter(
    (item) => item.tipo === "pedido" && item.status === "em_andamento",
  );

  return (
    <Layout content={true}>
      <h2 className="text-2xl font-bold mb-4">Mensagens</h2>

      <div className="flex flex-col gap-3">
        {pedidos.map((item) => (
          <Link
            key={item.id}
            href={`/mensagens/${item.id}`}
            className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition flex justify-between items-center hover:border hover:border-background-primary"
          >
            <div>
              <h4 className="font-semibold">{item.titulo}</h4>

              {item.descricao && (
                <p className="text-xs text-text-primary">{item.descricao}</p>
              )}
            </div>

            <span className="text-xs text-gray-400">{formatDate(item.criado_em)}</span>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
