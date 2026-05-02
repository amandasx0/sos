"use client";

import { useState } from "react";
import { getVagasDisponiveis } from "@/src/utils/shelters";
import api from "@/src/services/api";

const RequestShelterForm = ({
  shelterId,
  total,
  ocupada,
}: {
  shelterId: number;
  total: number;
  ocupada: number;
}) => {
  const [quantidade, setQuantidade] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [sucess, setSucess] = useState(false);
  const [loading, setLoading] = useState(false);

  const vagasDisponiveis = getVagasDisponiveis(total, ocupada);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!quantidade || Number(quantidade) <= 0) {
      setErrorMessage("Informe uma quantidade válida");
      return;
    }

    if (Number(quantidade) > vagasDisponiveis) {
      setErrorMessage("Quantidade maior que vagas disponíveis");
      return;
    }

    try {
      setLoading(true);

      await api.post(`/shelters/${shelterId}/request`, {
        quantidade: Number(quantidade),
      });

      setSucess(true);
      setQuantidade("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {sucess ? (
       <span className="text-xs text-text-primary">Solicitação enviada com sucesso. Em breve entraremos em contato.</span>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
            <label className="text-sm font-semibold text-text-secondary">
              Quantidade de vagas: *
            </label>

            <input
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              placeholder="Ex: 2"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              min={1}
            />

            {errorMessage && (
              <p className="text-xs mt-1 text-text-error">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-background-primary text-sm text-center text-white py-2 rounded-lg cursor-pointer hover:bg-blue-900 transition"
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default RequestShelterForm;
