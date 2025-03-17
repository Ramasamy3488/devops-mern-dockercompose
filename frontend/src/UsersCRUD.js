import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UsersCRUD = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", email: "", age: "", city: "" });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    } catch (error) {
      toast.error("Error fetching users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add User
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", form);
      toast.success("User added successfully!");
      fetchUsers();
      setForm({ id: "", name: "", email: "", age: "", city: "" });
    } catch (error) {
      toast.error("Error adding user");
    }
  };

  // Edit User
  const handleEditUser = (user) => {
    setForm(user);
    setIsEditing(true);
  };

  // Update User
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/users/${form.id}`, form);
      toast.success("User updated successfully!");
      fetchUsers();
      setForm({ id: "", name: "", email: "", age: "", city: "" });
      setIsEditing(false);
    } catch (error) {
      toast.error("Error updating user");
    }
  };

  // Delete User
  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/users/${id}`);
        toast.success("User deleted successfully!");
        fetchUsers();
      } catch (error) {
        toast.error("Error deleting user");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{isEditing ? "Edit User" : "Add User"}</h2>
      <form onSubmit={isEditing ? handleUpdateUser : handleAddUser} className="mb-4">
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border p-2 m-1" required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border p-2 m-1" required />
        <input type="number" name="age" placeholder="Age" value={form.age} onChange={handleChange} className="border p-2 m-1" required />
        <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} className="border p-2 m-1" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 m-1">{isEditing ? "Update" : "Add"}</button>
      </form>

      <h2 className="text-2xl font-bold mb-4">Users List</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Age</th>
            <th className="border p-2">City</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="text-center">
              <td className="border p-2">{user.id}</td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.age}</td>
              <td className="border p-2">{user.city}</td>
              <td className="border p-2">
                <button onClick={() => handleEditUser(user)} className="bg-yellow-500 text-white px-2 py-1 m-1">Edit</button>
                <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 text-white px-2 py-1 m-1">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersCRUD;

