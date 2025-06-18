import React from "react";

type ValueType = string | number | boolean;

interface MultiSelectCheckboxProps<T extends ValueType> {
    options: {
        label: string;
        value: T;
    }[];
    selectedOptions: T[];
    onChange: (selected: T[]) => void;
}

function MultiSelectCheckbox<T extends ValueType>({ options, selectedOptions, onChange }: MultiSelectCheckboxProps<T>) {
    const toggle = (opt: T) => {
        if (selectedOptions.includes(opt)) {
            onChange(selectedOptions.filter((o) => o !== opt));
        } else {
            onChange([...selectedOptions, opt]);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            {options.map((opt) => (
                <label key={String(opt.value)} className="flex items-center space-x-2">
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
}

export default MultiSelectCheckbox;
