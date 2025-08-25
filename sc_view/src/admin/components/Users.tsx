
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Section from "./Section";
import TextField from "./TextField";
import SelectField from "./SelectField";

const Users = ({
  saveUser,
  editingUserId,
  userForm,
  setUserForm,
  users,
  editUser,
  deleteUser,
}) => {
  return (
    <Section
      title="Users"
      actions={
        <button
          onClick={saveUser}
          className="btn bg-green-500 text-white px-3 py-1 rounded"
        >
          {editingUserId ? "Update" : "Add"} User
        </button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <TextField
          label="Name"
          value={userForm.name}
          onChange={(v) => setUserForm({ ...userForm, name: v })}
        />
        <TextField
          label="Email"
          value={userForm.email}
          onChange={(v) => setUserForm({ ...userForm, email: v })}
        />
        <SelectField
          label="Role"
          value={userForm.role}
          options={["Admin", "Customer"]}
          onChange={(v) => setUserForm({ ...userForm, role: v })}
        />
      </div>

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="border px-2 py-1">#</th>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Role</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={u.id}>
              <td className="border px-2 py-1">{i + 1}</td>
              <td className="border px-2 py-1">{u.name}</td>
              <td className="border px-2 py-1">{u.email}</td>
              <td className="border px-2 py-1">{u.role}</td>
              <td className="border px-2 py-1 flex gap-1">
                <button
                  onClick={() => editUser(u)}
                  className="text-blue-500"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => deleteUser(u.id)}
                  className="text-red-500"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
};

export default Users;
