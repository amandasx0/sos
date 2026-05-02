export const getVagasDisponiveis = (
  capacidade_total: number,
  capacidade_ocupada: number
) => {
  return capacidade_total - capacidade_ocupada;
};