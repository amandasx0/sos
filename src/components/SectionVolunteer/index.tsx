import CardOrder, { CardOrderType } from "../CardOrder";

type SectionProps = {
  title: string;
  data: CardOrderType[];
    onAccept?: (id: number) => void;

};

const SectionVolunteer = ({ title, data, onAccept }: SectionProps) => {
  if (data.length === 0) return null;
  

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold mb-4 text-text-secondary">
        {title} ({data.length})
      </h3>

       <div className="flex flex-wrap gap-4 mt-5">
          {data.map((item) => (
            <CardOrder
              key={item.id}
              id={item.id}
              tipo={item.tipo}
              descricao={item.descricao}
              urgencia={item.urgencia}
              status={item.status}
              endereco={item.endereco}
              cidade={item.cidade}
              estado={item.estado}
              criado_em={item.criado_em}
              nome={item.nome}
                onAccept={() => onAccept?.(item.id)}
            />
          ))}
        </div>
    </div>
  );
};

export default SectionVolunteer