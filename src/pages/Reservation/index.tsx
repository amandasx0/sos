"use client";
import { useState, useEffect } from "react";
import CardReservation, { Status } from "@/src/components/CardReservation";
import Layout from "@/src/components/Layout";
import { useAuth } from "@/src/hook/auth";

import api from "@/src/services/api";

export type ReservationType = {
  id: number;
  quantidade?: number;
  descricao?: string;
  status: Status;
  tipo: string;
  criado_em: string;
  titulo: string;
};

const ReservationPag = () => {
  const { user } = useAuth();
  const [dataReserve, setDataReserve] = useState<ReservationType[]>([]);

  const getReservations = async () => {
    try {
      if (user?.tipo === "afetado") {
        const response = await api.get("/user/activity");
        setDataReserve(response.data);
      } else {
        const response = await api.get("/voluntary/activity");
        setDataReserve(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      getReservations();
    }, 500);

    return () => clearTimeout(delay);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReply = async (id: number, status: "aprovado" | "recusado") => {
    try {
      await api.patch(`/reservation-shelter/${id}/status`, {
        status,
      });

      setDataReserve((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status } : item)),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleFinish = async (id: number) => {
    try {
      await api.patch(`/orders/${id}/finish`);
      setDataReserve((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "resolvido" } : item,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const reservas = dataReserve.filter((item) => item.tipo === "reserva");
  const pedidos = dataReserve.filter((item) => item.tipo === "pedido");

  const sortedDataReserve = [...reservas].sort((a, b) => {
    if (a.status === "resolvido" && b.status !== "resolvido") return 1;
    if (a.status !== "resolvido" && b.status === "resolvido") return -1;
    return 0;
  });

  const sortedDataOrders = [...pedidos].sort((a, b) => {
    if (a.status === "resolvido" && b.status !== "resolvido") return 1;
    if (a.status !== "resolvido" && b.status === "resolvido") return -1;
    return 0;
  });

  return (
    <Layout content={true}>
      <p className="text-2xl font-bold mb-4">Minhas atividades</p>

      <div className="mb-8">
        <h3 className="text-base font-semibold text-text-secondary mb-3">
          Solicitações de vaga ({reservas.length})
        </h3>

        <div className="flex flex-wrap gap-4">
          {sortedDataReserve.length > 0 ? (
            <>
               {sortedDataReserve.map((item) => (
            <CardReservation
              key={item.id}
              data={item}
              onReservationAction={handleReply}
            />
          ))}
            </>
          ) : (
            <div className="bg-background-card border border-dashed border-gray-300 rounded-2xl px-2 lg:px-0 py-8 gap-4 flex flex-col items-center mt-4 w-full">
              <h3 className="text-text-secondary font-bold text-lg lg:text-2xl text-center">
                Nenhum solicitação de vaga encontrada
              </h3>
            </div>
          )}
         
        </div>
      </div>

      <div>
        <h3 className="text-base font-semibold text-text-secondary mb-3">
          Atendimentos ({pedidos.length})
        </h3>

        <div className="flex flex-wrap gap-4">
          {sortedDataOrders.length > 0 ? (
            <>
              {sortedDataOrders.map((item) => (
                <CardReservation
                  key={item.id}
                  data={item}
                  onFinish={handleFinish}
                />
              ))}
            </>
          ) : (
            <div className="bg-background-card border border-dashed border-gray-300 rounded-2xl px-2 lg:px-0 py-8 gap-4 flex flex-col items-center mt-4 w-full">
              <h3 className="text-text-secondary font-bold text-lg lg:text-2xl text-center">
                Nenhum pedido de atendimento encontrado
              </h3>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ReservationPag;
