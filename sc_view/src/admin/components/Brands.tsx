
import React from "react";
import { FaTrash } from "react-icons/fa";
import Section from "./Section";

const Brands = ({ brandInput, setBrandInput, addBrand, brands, deleteBrand }) => {
  return (
    <Section title="Brands" actions={null}>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="New brand"
          className="border px-2 py-1 rounded"
          value={brandInput}
          onChange={(e) => setBrandInput(e.target.value)}
        />
        <button
          onClick={addBrand}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Add
        </button>
      </div>
      <ul>
        {brands.map((b) => (
          <li
            key={b}
            className="flex justify-between border-b py-1 px-2"
          >
            {b}
            <button
              onClick={() => deleteBrand(b)}
              className="text-red-500"
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default Brands;
