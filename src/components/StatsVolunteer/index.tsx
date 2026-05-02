"use client";

import StatCard from "@/src/components/StatCard";

import iconGrafic from "../../../public/icon-grafic.png";
import iconPeople from "../../../public/icon-people-blue.png";
import iconCheck from "../../../public/icon-protection.png";

type StatsProps = {
  available: number;
  progress: number;
  resolved: number;
};

const StatsVolunteer = ({ available, progress, resolved }: StatsProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-10 px-0 lg:px-4">
      <StatCard
        icon={iconPeople}
        value={available}
        label="Disponíveis"
        bgIcon="bg-blue-100"
        home={false}
      />

      <StatCard
        icon={iconGrafic}
        value={progress}
        label="Em andamento"
        bgIcon="bg-orange-100"
        home={false}
      />

      <StatCard
        icon={iconCheck}
        value={resolved}
        label="Resolvidos"
        bgIcon="bg-green-100"
        home={false}
      />
    </div>
  );
};

export default StatsVolunteer;
