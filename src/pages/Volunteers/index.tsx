"use client";
import { useState, useEffect, useMemo } from "react";
import { CardOrderType } from "@/src/components/CardOrder";
import Layout from "@/src/components/Layout";
import BannerVolunteer from "@/src/components/BannerVolunteer";
import StatsVolunteer from "@/src/components/StatsVolunteer";
import SectionVolunteer from "@/src/components/SectionVolunteer";
import api from "@/src/services/api";

const VolunteersPag = () => {
  const [dataShelter, setDataShelter] = useState<CardOrderType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes] = await Promise.all([api.get("/orders/all")]);
        setDataShelter(ordersRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);


  const handleClick = async (id: number) => {
    try {
      await api.post(`/orders/${id}/accept`);

      setDataShelter((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "em_andamento" } : item,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const statusAvailable = useMemo(() => {
    return dataShelter.filter((item) => item.status === "aberto");
  }, [dataShelter]);

  const statusInProgress = useMemo(() => {
    return dataShelter.filter((item) => item.status === "em_andamento");
  }, [dataShelter]);

  const statusFinish = useMemo(() => {
    return dataShelter.filter((item) => item.status === "resolvido");
  }, [dataShelter]);

  return (
    <>
      <BannerVolunteer />
      <div className="relative z-10 -mt-60 lg:-mt-58">
        <Layout content={true}>
          <StatsVolunteer
            available={statusAvailable.length}
            progress={statusInProgress.length}
            resolved={statusFinish.length}
          />

          <SectionVolunteer
            title="Pedidos disponíveis"
            data={statusAvailable}
            onAccept={handleClick}
          />

          <SectionVolunteer title="Em andamento" data={statusInProgress} />

          <SectionVolunteer title="Concluídos" data={statusFinish} />
        </Layout>
      </div>
    </>
  );
};

export default VolunteersPag;
