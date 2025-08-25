
import React from "react";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaTags,
  FaBuilding,
  FaUsers,
  FaShoppingCart,
} from "react-icons/fa";
import NavBtn from "./NavBtn";

const Layout = ({ active, setActive, children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-900 text-white flex flex-col">
        <div className="px-5 py-4 text-2xl font-bold border-b border-gray-800">
          Admin Dashboard
        </div>
        <nav className="p-3 space-y-2 text-sm">
          <NavBtn
            icon={<FaTachometerAlt />}
            label="Dashboard"
            active={active === "dashboard"}
            onClick={() => setActive("dashboard")}
          />
          <NavBtn
            icon={<FaBoxOpen />}
            label="Products"
            active={active === "products"}
            onClick={() => setActive("products")}
          />
          <NavBtn
            icon={<FaTags />}
            label="Categories"
            active={active === "categories"}
            onClick={() => setActive("categories")}
          />
          <NavBtn
            icon={<FaBuilding />}
            label="Brands"
            active={active === "brands"}
            onClick={() => setActive("brands")}
          />
          <NavBtn
            icon={<FaUsers />}
            label="Users"
            active={active === "users"}
            onClick={() => setActive("users")}
          />
          <NavBtn
            icon={<FaShoppingCart />}
            label="Orders"
            active={active === "orders"}
            onClick={() => setActive("orders")}
          />
        </nav>
        <div className="mt-auto p-4 text-xs text-gray-400 border-t border-gray-800">
          UI-only • Tailwind + React Icons
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
