import iconFoodRed from "../../public/icon-food-red.png";
import iconDoctorRed from "../../public/icon-doctor-red.png";
import iconRescueRed from "../../public/icon-rescue-red.png";

import iconFoodOrange from "../../public/icon-food-orange.png";
import iconDoctorOrange from "../../public/icon-doctor-orange.png";
import iconRescueOrange from "../../public/icon-rescue-orange.png";

import iconFoodGreen from "../../public/icon-food-green.png";
import iconDoctorGreen from "../../public/icon-doctor-green.png";
import iconRescueGreen from "../../public/icon-rescue-green.png";

export type Tipo = "resgate" | "medico" | "comida_e_agua";
export type Urgencia = "urgente" | "medio" | "sem_urgencia";
export type Status = "aberto" | "resolvido" | "em_andamento";

export const iconMap = {
  urgente: {
    resgate: iconRescueRed,
    comida_e_agua: iconFoodRed,
    medico: iconDoctorRed,
  },
  medio: {
    resgate: iconRescueOrange,
    comida_e_agua: iconFoodOrange,
    medico: iconDoctorOrange,
  },
  sem_urgencia: {
    resgate: iconRescueGreen,
    comida_e_agua: iconFoodGreen,
    medico: iconDoctorGreen,
  },
} as const;


export const urgenciaLabelMap = {
  urgente: "Urgente",
  medio: "Médio",
  sem_urgencia: "Baixa urgência",
} as const;

export const tipoLabelMap = {
  resgate: "Resgate",
  medico: "Médico",
  comida_e_agua: "Comida e água",
} as const;

export const statusLabelMap = {
  aberto: "Aberto",
  resolvido: "Resolvido",
  em_andamento: "Em andamento",
} as const;


export const urgenciaStyleMap = {
  urgente: "bg-red-600",
  medio: "bg-orange-400",
  sem_urgencia: "bg-green-800",
};

export const urgenciaBgLightMap = {
  urgente: "bg-red-100",
  medio: "bg-orange-100",
  sem_urgencia: "bg-green-100",
};

export const statusStyleMap = {
  aberto: "text-background-primary bg-background-primary/15 border-background-primary",
  resolvido: "bg-green-300/20 text-green-700 border-green-700",
  em_andamento: "bg-orange-300/20 text-orange-400 border-orange-400",
};

export const estadosSigla: Record<string, string> = {
  "Acre": "AC",
  "Alagoas": "AL",
  "Amapá": "AP",
  "Amazonas": "AM",
  "Bahia": "BA",
  "Ceará": "CE",
  "Distrito Federal": "DF",
  "Espírito Santo": "ES",
  "Goiás": "GO",
  "Maranhão": "MA",
  "Mato Grosso": "MT",
  "Mato Grosso do Sul": "MS",
  "Minas Gerais": "MG",
  "Pará": "PA",
  "Paraíba": "PB",
  "Paraná": "PR",
  "Pernambuco": "PE",
  "Piauí": "PI",
  "Rio de Janeiro": "RJ",
  "Rio Grande do Norte": "RN",
  "Rio Grande do Sul": "RS",
  "Rondônia": "RO",
  "Roraima": "RR",
  "Santa Catarina": "SC",
  "São Paulo": "SP",
  "Sergipe": "SE",
  "Tocantins": "TO",
};