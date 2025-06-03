import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface ExpandableFilterProps {
  title: string;
  children: React.ReactNode;
}

const ExpandableFilter: React.FC<ExpandableFilterProps> = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white p-4 rounded shadow relative">
      <button
        className="w-full flex justify-between items-center text-left font-semibold text-slate-800"
        onClick={() => setOpen(!open)}
      >
        <span>{title}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute top-full left-0 z-10 bg-white border border-gray-200 rounded-md mt-2 w-full max-h-40 overflow-y-auto shadow-lg">
          {/* Alterado de max-h-48 para max-h-40 para uma altura menor */}
          <div className="p-2">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpandableFilter;