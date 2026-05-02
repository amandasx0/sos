"use client";

import StatCard from "@/src/components/StatCard";

 import iconAlert from "../../../public/icon-alert.png";
 import iconGrafic from "../../../public/icon-grafic.png";
import iconPeople from "../../../public/icon-people-blue.png";
import iconCheck from "../../../public/icon-protection.png";  

type StatsProps = {
  urgent: number;
  inProgress: number;
  volunteers: number;
  resolved: number;
};

const Stats = ({
  urgent,
  inProgress,
  volunteers,
  resolved,
}: StatsProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10 px-0 lg:px-4">
      
      <StatCard
        icon={iconAlert}
        value={urgent}
        label="Pedidos urgentes"
        bgIcon="bg-red-100"
      />

      <StatCard
        icon={iconGrafic}
        value={inProgress}
        label="Em atendimento"
        bgIcon="bg-orange-100"
      />

      <StatCard
        icon={iconPeople}
        value={volunteers}
        label="Voluntários ativos"
        bgIcon="bg-blue-100"
      />

      <StatCard
        icon={iconCheck}
        value={resolved}
        label="Resolvidos"
        bgIcon="bg-green-100"
      />
    </div>
  );
};

export default Stats;