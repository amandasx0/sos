import Link from "next/link";
import { useAuth } from "@/src/hook/auth";
import { formatDate } from "../../utils/format";

export type Status =
  | "pendente"
  | "aprovado"
  | "recusado"
  | "em_andamento"
  | "resolvido";

type ReservationType = {
  id: number;
  quantidade?: number;
  descricao?: string;
  status: Status;
  tipo: string;
  criado_em: string;
  titulo: string;
};

type Props = {
  data: ReservationType;

  onReservationAction?: (id: number, status: "aprovado" | "recusado") => void;

  onFinish?: (id: number) => void;
};

const statusStyle: Record<Status, string> = {
  pendente: "bg-yellow-100 text-yellow-700",
  aprovado: "bg-green-100 text-green-700",
  recusado: "bg-red-100 text-red-700",

  em_andamento: "bg-orange-100 text-orange-700",
  resolvido: "bg-green-100 text-green-700",
};

const statusLabel: Record<Status, string> = {
  pendente: "Pendente",
  aprovado: "Aprovado",
  recusado: "Recusado",

  em_andamento: "Em andamento",
  resolvido: "Resolvido",
};

const CardReservation = ({ data, onReservationAction, onFinish }: Props) => {
  const { user } = useAuth()

  
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col gap-4 w-full lg:w-[calc(50%-10px)] hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-base">{data.titulo}</h4>
          {data.tipo === "reserva" && (
            <p className="text-xs text-text-primary">{data.descricao}</p>
          )}
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle[data.status]}`}
        >
          {statusLabel[data.status]}
        </span>
      </div>

      {data.tipo === "reserva" && (
        <div className="flex justify-between text-sm text-text-primary">
          <p>
            🧍‍♂️ <strong>{data.quantidade}</strong> vagas
          </p>
        </div>
      )}

      <p className="text-xs text-text-secondary">{formatDate(data.criado_em)}</p>

      {data.tipo === "reserva" && data.status === "pendente" && (
        <div className="flex gap-2 mt-2 flex-wrap">
          <button
            onClick={() => onReservationAction?.(data.id, "aprovado")}
            className="lg:flex-1 bg-green-600 text-white py-2 rounded-lg w-full text-center block"
          >
            Aceitar
          </button>

          <button
            onClick={() => onReservationAction?.(data.id, "recusado")}
            className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg w-full cursor-pointer"
          >
            Recusar
          </button>
        </div>
      )}

      {data.tipo === "pedido" && data.status === "em_andamento" && (
        <div className="flex gap-2 mt-auto flex-wrap">
          <Link
            href={`/mensagens/${data.id}`}
            className="lg:flex-1 bg-green-600 text-white py-2 rounded-lg w-full text-center block"
          >
            Enviar mensagem
          </Link>

        {user?.tipo !== "afetado" && (
            <button
            onClick={() => onFinish?.(data.id)}
            className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg w-full cursor-pointer"
          >
            Finalizar pedido
          </button>
        )}
        
        </div>
      )}
    </div>
  );
};

export default CardReservation;
