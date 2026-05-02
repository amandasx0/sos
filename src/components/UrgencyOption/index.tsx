
export type UrgentType = "urgente" | "medio" | "sem_urgencia";

type UrgencyOptionProps = {
  value: UrgentType;
  selected: string | null;
  onSelect: (value: UrgentType) => void;
  label: string;
  description: string;
};

const UrgencyOption = ({
  value,
  selected,
  onSelect,
  label,
  description,
}: UrgencyOptionProps) => {
  const isSelected = selected === value;

  const styles = {
    urgente: "border-red-400 bg-red-50 text-red-600",
    medio: "border-orange-400 bg-orange-50 text-orange-500",
    sem_urgencia: "border-green-400 bg-green-50 text-green-600",
  };

  return (
    <button
      onClick={() => onSelect(value)}
      className={`w-full flex items-center gap-3 p-4 rounded-xl border transition cursor-pointer
      ${
        isSelected
          ? styles[value]
          : "border-gray-300 hover:border-background-primary"
      }`}
    >
      <div
        className={`w-4 h-4 rounded-full border flex items-center justify-center
        ${
          isSelected
            ? styles[value].split(" ")[2] + " bg-current"
            : "border-gray-400"
        }`}
      >
        {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
      </div>

      <p className="text-sm font-medium">
        {label}  {value !== "urgente" && "—"} <span className="font-normal">{description}</span>
      </p>
    </button>
  );
};

export default UrgencyOption