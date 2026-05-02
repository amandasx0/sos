"use-client";

type Props = {
  filters: {
    search: string;
    tipo: string;
    urgencia: string;
  };
  onChange: (filters: Props["filters"]) => void;
};

const SearchOrder = ({ filters, onChange }: Props) => {
  const { search, tipo, urgencia } = filters;

  const urgencias = [
    { label: "todas", value: "todas" },
    { label: "urgente", value: "urgente" },
    { label: "médio", value: "medio" },
    { label: "baixa urgência", value: "sem_urgencia" },
  ];

  const tipos = [
    { label: "todos", value: "todos" },
    { label: "resgate", value: "resgate" },
    { label: "comida e água", value: "comida_e_agua" },
    { label: "médico", value: "medico" },
  ];

  return (
    <div className="bg-background-card border border-gray-300 rounded-2xl p-6 space-y-5 flex flex-col">
      <input
        value={search}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
        placeholder="Buscar por bairro, cidade ou descrição..."
        className="bg-background-secondary/30 p-2 rounded-lg border border-gray-300 text-sm"
      />

      <div>
        <h4 className="uppercase text-xs text-text-primary font-bold">Tipo</h4>
        <div className="flex gap-2 mt-2 flex-wrap">
          {tipos.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => onChange({ ...filters, tipo: value })}
              className={`px-4 py-2 rounded-4xl text-xs font-bold border uppercase cursor-pointer ${
                tipo === value
                  ? "bg-background-primary text-white"
                  : "bg-gray-100 text-text-secondary border-gray-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="uppercase text-xs text-text-primary font-bold">
          Urgência
        </h4>
        <div className="flex gap-2 mt-2 flex-wrap">
          {urgencias.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => onChange({ ...filters, urgencia: value })}
              className={`px-4 py-2 rounded-4xl text-xs font-bold border cursor-pointer uppercase  ${
                urgencia === value
                  ? "bg-background-primary text-white"
                  : "bg-gray-100 text-text-secondary border-gray-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchOrder;
