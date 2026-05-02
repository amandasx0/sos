"use client";
import { useState } from "react";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import Login from "@/src/components/Login";
import Layout from "@/src/components/Layout";
import Register from "@/src/components/Register";

import iconLogo from "../../../public/icon.png";

const LoginPag = () => {
  const [tab, setTab] = useState<"login" | "cadastro">(() => {
    if (typeof window !== "undefined") {
      const wantBeVoluntary = localStorage.getItem("beVoluntary");

      if (wantBeVoluntary) {
        return "cadastro";
      }
    }

    return "login";
  });

  return (
    <Layout content={true}>
      <div className="flex flex-col justify-center w-full ">
        <div className="mx-auto w-full max-w-md text-center">
          <Image
            src={iconLogo}
            alt="Icone da logo"
            width={60}
            height={60}
            className="mx-auto"
          />
          {tab === "login" ? (
            <>
              <h2 className="text-3xl font-extrabold mt-4">Entrar</h2>
              <p className="text-text-primary mt-2 mb-6">
                Acesse sua conta SOS Enchentes
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-extrabold mt-4">Criar conta</h2>
              <p className="text-text-primary mt-2 mb-6">
                Junta-se à rede de ajuda
              </p>
            </>
          )}
          <Tab.Group
            selectedIndex={tab === "login" ? 0 : 1}
            onChange={(index) => setTab(index === 0 ? "login" : "cadastro")}
          >
            <Tab.List className="flex bg-[#eaf0f5] p-1 rounded-xl w-full mb-6 ">
              <Tab
                className={({ selected }) =>
                  `px-6 py-2 rounded-lg text-sm font-bold w-1/2 cursor-pointer ${
                    selected ? "bg-white shadow" : "text-text-primary"
                  }`
                }
              >
                Entrar
              </Tab>

              <Tab
                className={({ selected }) =>
                  `px-6 py-2 rounded-lg text-sm font-bold w-1/2 cursor-pointer ${
                    selected ? "bg-white shadow" : "text-text-primary"
                  }`
                }
              >
                Cadastrar
              </Tab>
            </Tab.List>

            <Tab.Panels>
              <Tab.Panel>
                <Login />
              </Tab.Panel>
              <Tab.Panel>
                <Register />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPag;
