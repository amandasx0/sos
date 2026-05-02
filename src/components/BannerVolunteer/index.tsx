"use client";
import { useAuth } from "@/src/hook/auth";

import Layout from "../Layout";
import Image from "next/image";

import iconHelp from "../../../public/icon-help.png";

const BannerVolunteer = () => {
  const { user } = useAuth();

  const isVoluntary = () => {
    if (user?.tipo === "voluntario") {
      return `Olá, ${user.name}`;
    } else {
      return `Olá, voluntário`;
    }
  };
  return (
    <section className="bg-linear-to-r from-background-primary via-blue-700 to-blue-500 text-white">
      <Layout content={true}>
        <span className="bg-[#ffffff26] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center justify-center gap-2 w-full lg:w-48 uppercase">
          <Image src={iconHelp} alt="Icone de ajuda" width={20} height={20} />
          Área do voluntário
        </span>

        <div className="mt-4">
          <h1 className="text-3xl lg:text-5xl font-extrabold leading-tight">
            {isVoluntary()}
          </h1>

          <p className="mt-4 text-sm lg:text-xl text-gray-300 max-w-xl">
            Veja os pedidos disponíveis na sua região e assuma quando puder ajudar.
          </p>
        </div>
      </Layout>
    </section>
  );
};

export default BannerVolunteer;
