"use client";

import Image, { StaticImageData } from "next/image";

type StatCardProps = {
  icon: StaticImageData;
  value: number;
  label: string;
  bgIcon?: string;
  home?: boolean
};

const StatCard = ({ icon, value, label, bgIcon, home = true }: StatCardProps) => {
  return (
    <div className={`bg-white rounded-2xl shadow-md px-4 py-4 flex items-center gap-3 w-full ${!home && "flex-col sm:items-start w-1/3"}`}>
      <div className={`p-2 rounded-lg ${bgIcon || "bg-gray-100"}`}>
        <Image src={icon} alt={label} width={18} height={18} />
      </div>

      <div>
        <p className={`text-2xl font-bold text-start ${!home && "text-center sm:text-start"}`}>{value}</p>
        <span className="text-xs text-gray-500">{label}</span>
      </div>
    </div>
  );
};

export default StatCard;