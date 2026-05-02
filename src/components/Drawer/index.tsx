"use client";

import { useState, useEffect } from "react";
import { SheltersType } from "@/src/components/CardShelters";
import { formatTelefone } from "../../utils/format";
import RequestShelterForm from "../SheltersForm";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  shelter: SheltersType | null;
};

const Drawer = ({ isOpen, onClose, shelter }: DrawerProps) => {
  const [requestShelter, setRequestShelter] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const enderecoCompleto = `${shelter?.endereco}, ${shelter?.cidade}, ${shelter?.estado}`;
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed left-0 right-0 bottom-0 top-20 bg-black/40 transition-opacity z-40 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      <div
        className={`fixed right-0 top-19 lg:top-20 h-[calc(100%-64px)] w-full lg:w-100 bg-background-secondary shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 h-full overflow-y-auto flex flex-col">
          {shelter && (
            <>
              <div>
                <p className="text-lg font-semibold text-text-primary">Nome:</p>
                <h2 className="text-base mb-4">{shelter.nome}</h2>
              </div>

              <div >
                <p className="text-lg font-semibold text-text-primary">Endereço:</p>
                <h2 className="text-base mb-4">{shelter.endereco}</h2>
              </div>

              <div>
                <p className="text-lg font-semibold text-text-primary">Telefone para contato:</p>
                <h2 className="text-base mb-4">
                  {formatTelefone(shelter.telefone)}
                </h2>
              </div>

              <div className="w-full flex flex-col gap-2 mt-auto mb-5">
                  <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(enderecoCompleto)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background-primary text-white py-2 rounded-lg text-sm text-center"
              >
                Ver no mapa
              </a>
              {!requestShelter && (
                <button
                  onClick={() => {
                    setRequestShelter(true);
                  }}
                  className="border border-text-secondary py-2 rounded-lg text-sm text-center hover:text-background-primary hover:border-background-primary hover:bg-background-hover cursor-pointer text-text-secondary"
                >
                  Solicitar vaga
                </button>
              )}

              
              {requestShelter && (
                <RequestShelterForm
                  shelterId={shelter.id}
                  total={shelter.capacidade_total}
                  ocupada={shelter.capacidade_ocupada}
                />
              )}

              <button onClick={() => {
                onClose()
                setRequestShelter(false)
              }} className="text-text-secondary text-sm text-center cursor-pointer rounded-lg py-2 hover:border hover:border-text-secondary ">Voltar</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Drawer;
