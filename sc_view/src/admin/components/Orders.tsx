
import React from "react";
import Section from "./Section";

const Orders = ({
  orderFilters,
  setOrderFilters,
  ORDER_STATUSES,
  users,
  filteredOrders,
  userById,
  productById,
  updateOrderStatus,
}) => {
  return (
    <Section title="Orders" actions={null}>
      <div className="flex gap-2 mb-4">
        <select
          value={orderFilters.status}
          onChange={(e) =>
            setOrderFilters({ ...orderFilters, status: e.target.value })
          }
          className="border px-2 py-1 rounded"
        >
          <option value="">All Statuses</option>
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={orderFilters.userId}
          onChange={(e) =>
            setOrderFilters({ ...orderFilters, userId: e.target.value })
          }
          className="border px-2 py-1 rounded"
        >
          <option value="">All Users</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
      </div>

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
                  onChange={(e) => updateOrderStatus(o.id, e.target.value)}
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
  );
};

export default Orders;
