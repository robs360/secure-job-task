
import React from "react";
import Card from "./Card";
import Section from "./Section";

const Dashboard = ({
  products,
  users,
  orders,
  addOrder,
  filteredOrders,
  userById,
  productById,
  updateOrderStatus,
  ORDER_STATUSES,
}) => {
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
              <th className="border px-2 py-1">#</th>
              <th className="border px-2 py-1">User</th>
              <th className="border px-2 py-1">Product</th>
              <th className="border px-2 py-1">Qty</th>
              <th className="border px-2 py-1">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((o, i) => (
              <tr key={o.id}>
                <td className="border px-2 py-1">{i + 1}</td>
                <td className="border px-2 py-1">
                  {userById(o.userId)?.name || "-"}
                </td>
                <td className="border px-2 py-1">
                  {productById(o.productId)?.name || "-"}
                </td>
                <td className="border px-2 py-1">{o.qty}</td>
                <td className="border px-2 py-1">
                  <select
                    className="border px-1 py-0.5"
                    value={o.status}
                    onChange={(e) =>
                      updateOrderStatus(o.id, e.target.value)
                    }
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
