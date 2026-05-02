"use client";
import { useEffect, useState, useMemo } from "react";
import { UserData } from "../../context/authContext";
import { CardOrderType } from "../../components/CardOrder";
import Layout from "@/src/components/Layout";
import Hero from "@/src/components/Hero";
import Stats from "@/src/components/StatsHome";
import MapSection from "@/src/components/MapSection";

import api from "@/src/services/api";

const HomePag = () => {
  const [user, setUser] = useState<UserData[]>([]);
  const [dataShelter, setDataShelter] = useState<CardOrderType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, ordersRes] = await Promise.all([
          api.get("/users"),
          api.get("/orders/all"),
        ]);

        setUser(usersRes.data);
        setDataShelter(ordersRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);


  const voluntary = useMemo(() => {
    return user.filter((item) => item.tipo === "voluntario");
  }, [user]);

  const urgent = useMemo(() => {
    return dataShelter.filter((item) => item.urgencia === "urgente");
  }, [dataShelter]);

  const statusInProgress = useMemo(() => {
    return dataShelter.filter((item) => item.status === "em_andamento");
  }, [dataShelter]);

  const statusEnd = useMemo(() => {
    return dataShelter.filter((item) => item.status === "resolvido");
  }, [dataShelter]);

  return (
    <>
      <Hero />
      <div className="relative z-10 -mt-20">
        <Layout>
          <Stats
            urgent={urgent.length}
            inProgress={statusInProgress.length}
            volunteers={voluntary.length}
            resolved={statusEnd.length}
          />
          <MapSection data={dataShelter} />
        </Layout>
      </div>
    </>
  );
};

export default HomePag;
