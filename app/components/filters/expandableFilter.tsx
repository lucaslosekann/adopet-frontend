import React, { useState } from "react";

interface ExpandableFilterProps {
  title: string;
  children: React.ReactNode;
}

const ExpandableFilter: React.FC<ExpandableFilterProps> = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white p-4 rounded shadow">
      <button
        className="w-full text-left font-semibold text-slate-800"
        onClick={() => setOpen(!open)}
      >
        {title}
      </button>
      {open && <div className="mt-2">{children}</div>}
    </div>
  );
};

export default ExpandableFilter;