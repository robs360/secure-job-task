import React from "react";

const NavBtn = ({ icon, label, active, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 w-full px-3 py-2 rounded ${
        active ? "bg-gray-800" : "hover:bg-gray-700"
      }`}
    >
      {icon} {label}
    </button>
  );

  export default NavBtn;