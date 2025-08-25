import React from "react";

const Card = ({ title, value }) => (
    <div className="bg-white p-5 rounded-xl shadow">
      <div className="text-gray-500">{title}</div>
      <div className="text-3xl font-semibold mt-1">{value}</div>
    </div>
  );

  export default Card;