import React from "react";

interface MultiSelectCheckboxProps {
  options: {
    label: string,
    value: string | number | boolean;
  }[];
  selectedOptions: any[];
  onChange: (selected: string[]) => void;
}

const MultiSelectCheckbox: React.FC<MultiSelectCheckboxProps> = ({
  options,
  selectedOptions,
  onChange,
}) => {
  const toggle = (opt: string | number | boolean) => {
    onChange(
      selectedOptions.includes(opt)
        ? selectedOptions.filter((o) => o !== opt)
        : [...selectedOptions, opt]
    );
  };

  return (
    // Mude esta linha:
    <div className="flex flex-col gap-2"> {/* Alterado de 'flex flex-wrap gap-2' para 'flex flex-col gap-2' */}
      {options.map((opt) => (
        <label key={opt.label} className="flex items-center space-x-2"> {/* Alterado 'space-x-1' para 'space-x-2' para um pouco mais de espaço */}
          <input
            type="checkbox"
            checked={selectedOptions.includes(opt.value)}
            onChange={() => toggle(opt.value)}
            className="accent-blue-600"
          />
          <span className="text-sm">{opt.label}</span>
        </label>
      ))}
    </div>
  );
};

export default MultiSelectCheckbox;
