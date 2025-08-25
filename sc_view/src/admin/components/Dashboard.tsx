
import React, { useEffect, useState } from "react";
import Card from "./Card";
import Section from "./Section";
import axios from "axios";

const Dashboard = ({
  products,
  users,
  orders,
  addOrder,
  userById,
  productById,
  updateOrderStatus,
}) => {
 
  const [filteredOrders,setFilterOrders]=useState([])
  const [loading, setLoading] = useState(true);
     useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/products/orders");
        setFilterOrders(res.data); 
      } catch (err) {
        
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  const ORDER_STATUSES=["Pending", "Shipped", "Delivered", "Cancelled"]
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Products" value={products.length} />
        <Card title="Users" value={users.length} />
        <Card title="Orders" value={orders.length} />
      </div>
      <Section
        title="Recent Orders"
        actions={
          <button
            onClick={addOrder}
            className="btn bg-blue-500 text-white px-3 py-1 rounded"
          >
            + Add Order
          </button>
        }
      >
     <table className="w-full table-auto border-collapse border border-gray-300">
  <thead className="bg-gray-50">
    <tr>
      <th className="border px-2 py-1">User Name</th>
      <th className="border px-2 py-1">Email</th>
      <th className="border px-2 py-1">Product</th>
      <th className="border px-2 py-1">Qty</th>
      <th className="border px-2 py-1">Status</th>
    </tr>
  </thead>
  <tbody>
    {filteredOrders.map((o) => (
      <tr key={o._id}>
        <td className="border px-2 py-1">{o.name}</td>
        <td className="border px-2 py-1">{o.email}</td>
        <td className="border px-2 py-1">{o.product}</td>
        <td className="border px-2 py-1">{o.qty}</td>
        <td className="border px-2 py-1">
          <select
            className="border px-1 py-0.5"
            value={o.status}
            onChange={(e) => updateOrderStatus(o._id, e.target.value)}
          >
            {ORDER_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </Section>
    </>
  );
};

export default Dashboard;
