"use client";
import { useEffect, useState, useMemo } from "react";

import Layout from "@/src/components/Layout";
import Image from "next/image";
import InfoShelters from "@/src/components/InfoShelters";
import CardShelters, { SheltersType } from "@/src/components/CardShelters";
import Drawer from "@/src/components/Drawer";
import ModalShelter from "@/src/components/ModalShelter";
import { getVagasDisponiveis } from "@/src/utils/shelters";
import { useAuth } from "@/src/hook/auth";

import iconShelter from "../../../public/icon-shelter.png";
import api from "@/src/services/api";

const SheltersPag = () => {
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [dataShelters, setDataShelters] = useState<SheltersType[]>([]);
  const [selectedShelter, setSelectedShelter] = useState<SheltersType | null>(
    null,
  );

  const fetchShelders = async () => {
    const res = await api.get("/shelters", {});

    setDataShelters(res.data);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchShelders();
    }, 500);

    return () => clearTimeout(delay);
  }, []);

  const vagasLivres = useMemo(() => {
    return dataShelters.reduce((total, shelter) => {
      return (
        total +
        getVagasDisponiveis(
          shelter.capacidade_total,
          shelter.capacidade_ocupada,
        )
      );
    }, 0);
  }, [dataShelters]);

  const capacidadeTotal = useMemo(
    () => dataShelters.reduce((total, s) => total + s.capacidade_total, 0),
    [dataShelters],
  );

  const vagasOcupadas = useMemo(
    () => dataShelters.reduce((total, s) => total + s.capacidade_ocupada, 0),
    [dataShelters],
  );

  const openDrawer = (shelter: SheltersType) => {
    setSelectedShelter(shelter);
  };

  const closeDrawer = () => {
    setSelectedShelter(null);
  };

  return (
    <Layout content={true}>
      {openModal && (
        <ModalShelter
          onClose={() => setOpenModal(false)}
          onSuccess={fetchShelders}
        />
      )}
      <div className="flex justify-between items-start flex-wrap lg:flex-nowrap">
        <div className="flex flex-col">
          <div className="bg-background-primary/10 gap-2 flex justify-center px-3 pt-1.5 pb-1 rounded-4xl w-24">
            <Image
              src={iconShelter}
              alt="Icone do abrigo"
              width={16}
              height={16}
            />
            <span className="text-xs text-background-primary font-bold">
              ABRIGO
            </span>
          </div>
          <h2 className="text-3xl font-extrabold mt-4">Abrigos disponíveis</h2>
          <p className="text-text-primary mt-2 mb-6">
            {dataShelters.length} abrigos cadastrados •{" "}
            <span className="text-[#22a065] font-bold">
              {vagasLivres} vagas livres
            </span>
          </p>
        </div>
        {user?.tipo === "voluntario" && (
          <button
            onClick={() => setOpenModal(true)}
            className="mb-4 lg:mb-0 border border-gray-300 cursor-pointer px-5 py-2 rounded-lg text-text-secondary font-medium hover:text-background-primary hover:border-background-primary hover:bg-background-hover transition"
          >
            Cadastrar abrigo
          </button>
        )}
      </div>

      <InfoShelters
        capacidadeTotal={capacidadeTotal}
        vagasOcupadas={vagasOcupadas}
        vagasLivres={vagasLivres}
      />

      <div className="flex flex-wrap gap-4 mt-5">
        {dataShelters.map((item) => (
          <CardShelters
            key={item.id}
            {...item}
            onClick={() => openDrawer(item)}
          />
        ))}
      </div>

      <Drawer
        isOpen={!!selectedShelter}
        onClose={closeDrawer}
        shelter={selectedShelter}
      />
    </Layout>
  );
};

export default SheltersPag;
