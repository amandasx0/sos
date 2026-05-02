"use client";
import Layout from "@/src/components/Layout";
import FormHelp from "../../components/FormHelp";
import Image from "next/image";

import iconAlert from "../../../public/icon-alert.png";

const NewOrderPag = () => {
  return (
    <Layout content={true}>
      <div className="flex flex-col items-center w-full ">
        <div className="flex flex-col items-start">
          <div className="bg-red-200 gap-1 flex px-3 pt-1.5 pb-1 rounded-4xl">
            <Image
              src={iconAlert}
              alt="Icone de alerta"
              width={16}
              height={16}
            />
            <span className="text-xs text-[#EB1E1E] font-bold">EMERGÊNCIA</span>
          </div>
          <h2 className="text-3xl font-extrabold mt-4">Pedir ajuda</h2>
          <p className="text-text-primary mt-2 mb-6">
            Preencha rapidamente. Quanto mais detalhes, mais rápida a ajuda.
          </p>
          <FormHelp />
        </div>
      </div>
    </Layout>
  );
};

export default NewOrderPag;
