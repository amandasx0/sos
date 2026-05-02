"use client";
import { useRouter } from "next/navigation";
import Layout from "../Layout";
import Image from "next/image";

import iconAlert from "../../../public/icon-alert-white.png";
import iconPeople from "../../../public/icon-people-white.png";

const Hero = () => {
  const router = useRouter();
  return (
    <section className="bg-linear-to-r from-background-primary via-blue-700 to-blue-500 text-white" >
      <Layout content={true}>
        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center justify-center gap-2 w-full lg:w-1/5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          ALERTA ATIVO • RIO GRANDE DO SUL
        </span>

        <div className="max-w-3xl mt-4">
          <h1 className="text-3xl lg:text-5xl font-extrabold leading-tight">
            Ajuda rápida em{" "}
            <span className="text-blue-200">situações de enchente</span>.
          </h1>

          <p className="mt-4 text-sm lg:text-xl text-gray-300 max-w-xl">
            Conectamos quem precisa de socorro a voluntários e abrigos próximos.
            Cada minuto importa.
          </p>

          <div className="flex gap-4 mt-6 flex-wrap">
            <button
              onClick={() => router.push("/novo-pedido")}
              className="px-5 py-2 rounded-lg  cursor-pointer flex items-center gap-1 font-medium bg-[linear-gradient(135deg,#eb1e1e_0%,#f44e25_100%)] text-white shadow-xl/20
                hover:scale-102"
            >
              <Image
                src={iconAlert}
                alt="Icone de alerta"
                width={14}
                height={14}
              />
              PEDIR AJUDA AGORA
            </button>

            <button
            onClick={() => {
                localStorage.setItem("beVoluntary", "true")
                router.push("/entrar")
            }}
            className="border border-white/40 flex items-center gap-2 px-5 py-3 rounded-lg font-semibold hover:bg-white/10 transition cursor-pointer">
              <Image
                src={iconPeople}
                alt="Icone de ajuda"
                width={14}
                height={14}
              />
              Seja um voluntário
            </button>
          </div>
        </div>
      </Layout>
    </section>
  );
};

export default Hero;
