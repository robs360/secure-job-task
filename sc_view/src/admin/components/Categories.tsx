
import React from "react";
import { FaTrash } from "react-icons/fa";
import Section from "./Section";

const Categories = ({
  catInput,
  setCatInput,
  addCategory,
  categories,
  deleteCategory,
}) => {
  return (
    <Section title="Categories" actions={null}>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="New category"
          className="border px-2 py-1 rounded"
          value={catInput}
          onChange={(e) => setCatInput(e.target.value)}
        />
        <button
          onClick={addCategory}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Add
        </button>
      </div>
      <ul>
        {categories.map((c) => (
          <li
            key={c}
            className="flex justify-between border-b py-1 px-2"
          >
            {c}
            <button
              onClick={() => deleteCategory(c)}
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

export default Categories;
