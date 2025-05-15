import React from "react";

interface MultiSelectCheckboxProps {
  options: string[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
}

const MultiSelectCheckbox: React.FC<MultiSelectCheckboxProps> = ({
  options,
  selectedOptions,
  onChange,
}) => {
  const toggle = (opt: string) => {
    onChange(
      selectedOptions.includes(opt)
        ? selectedOptions.filter((o) => o !== opt)
        : [...selectedOptions, opt]
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <label key={opt} className="flex items-center space-x-1">
          <input
            type="checkbox"
            checked={selectedOptions.includes(opt)}
            onChange={() => toggle(opt)}
            className="accent-blue-600"
          />
          <span className="text-sm">{opt}</span>
        </label>
      ))}
    </div>
  );
};

export default MultiSelectCheckbox;