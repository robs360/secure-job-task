import React from "react";

const NumberField = ({ label, value, onChange }) => (
    <div className="flex flex-col">
      <label className="text-sm font-semibold mb-1">{label}</label>
      <input
        type="number"
        className="border px-2 py-1 rounded"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );

  export default NumberField;