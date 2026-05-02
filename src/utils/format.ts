export const parseDateBR = (dateString: string) => {
  const [date, time] = dateString.split(", ");
  const [day, month, year] = date.split("/");
  return new Date(`${year}-${month}-${day}T${time}`);
};

export const parseDate = (dateString: string) => {
  if (dateString.includes("T")) {
    return new Date(dateString);
  }

  const [date, time] = dateString.split(", ");
  const [day, month, year] = date.split("/");

  return new Date(`${year}-${month}-${day}T${time}`);
};

export const getTempoDecorrido = (criado_em: string) => {
  const createdAt = parseDate(criado_em);
  const now = new Date();

  const diffMs = now.getTime() - createdAt.getTime();

  const segundos = Math.floor(diffMs / 1000);
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);

  if (dias > 0) return `${dias}d`;
  if (horas > 0) return `${horas}h`;
  if (minutos > 0) return `${minutos}m`;
  return `${segundos}s`;
};

export const formatId = (id: number) => String(id).padStart(3, "0");

export const formatEndereco = (endereco: string) =>
  endereco
    .split(",")
    .slice(0, 2)
    .map((e) => e.trim())
    .join(", ");

export const formatTelefone = (telefone: string) => {
  const numeros = telefone.replace(/\D/g, "");

  if (numeros.length === 10) {
    return numeros.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
  }

  if (numeros.length === 11) {
    return numeros.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  }

  return telefone;
};

export const getCorOcupacao = (percent: number) => {
  if (percent === 100) return "bg-red-500";
  if (percent >= 80) return "bg-orange-400";
  if (percent >= 50) return "bg-green-500";
  return "bg-yellow-400";
};

export const formatDate = (date: string) => {
  if (date.includes("/")) {
    return date;
  }

  const parsed = new Date(date);

  if (isNaN(parsed.getTime())) {
    return "Data inválida";
  }

  return parsed.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};