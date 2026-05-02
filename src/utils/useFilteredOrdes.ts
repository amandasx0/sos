
import { CardOrderType } from "@/src/components/CardOrder";

export const useFilteredOrders = (orders: CardOrderType[]) => {
  const now = new Date();

  return orders.filter((order) => {
    const created = new Date(order.criado_em);
    const diff = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);

    return diff <= 3;
  });
};