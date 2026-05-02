import Image, { StaticImageData } from "next/image";

type HelpOptionProps = {
  value: string;
  selected: string | null;
  onSelect: (value: string) => void;
  icon: StaticImageData;
  title: string;
  description: string;
};

const HelpOption = ({
  value,
  selected,
  onSelect,
  icon,
  title,
  description,
}: HelpOptionProps) => {
  const isSelected = selected === value;

  return (
    <button
      onClick={() => onSelect(value)}
      className={`flex items-center px-2 py-4 rounded-2xl w-full lg:w-1/3 cursor-pointer transition
      ${
        isSelected
          ? "bg-background-hover border border-background-primary"
          : "border border-gray-300 hover:bg-background-hover/70 hover:border-background-primary"
      }`}
    >
      <div className="bg-background-secondary p-2 rounded-md">
        <Image src={icon} alt={title} width={20} height={20} />
      </div>

      <div className="flex flex-col items-start ml-2">
        <h4 className="text-md font-medium">{title}</h4>
        <span className="text-xs text-text-primary">{description}</span>
      </div>
    </button>
  );
};

export default HelpOption