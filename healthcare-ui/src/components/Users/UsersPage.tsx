import React, { useEffect, useState } from "react";
import { deleteUser, getUsers, updateUser } from "./user.service";
import type UserResponseDto from "../../types/UserResponseDto";
import AddAdminPage from "./AddAdminPage";
import EditUserModal from "./EditUserModal";
import UserCard from "./UserCard";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [editMessage, setEditMessage] = useState("");
  const [editingUser, setEditingUser] = useState<UserResponseDto | null>(null);
  const [formData, setFormData] = useState<Partial<UserResponseDto>>({});
  const [addUser, setAddUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const usersResp = await getUsers();
        setUsers(usersResp);
      } catch {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      setDeleteMessage("User deleted successfully!");
      setTimeout(() => setDeleteMessage(""), 3000);
    } catch {
      setError("Failed to delete user");
    }
  };

  const handleEdit = (user: UserResponseDto) => {
    setEditingUser(user);
    setFormData(user);
  };

  const handleSave = async () => {
    if (!editingUser) return;
    try {
      const updated = await updateUser(editingUser.id, formData);
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === editingUser.id ? updated : u))
      );
      setEditingUser(null);
      setEditMessage("User updated successfully!");
      setTimeout(() => setEditMessage(""), 3000);
    } catch {
      setError("Failed to update user");
    }
  };

  const filteredUsers = users.filter((u) =>
    `${u.name} ${u.username} ${u.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p className="text-center text-gray-600 mt-10">Loading users...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 mt-10">{error}</p>;
  }

  return (
    <div className="p-8">
      {/* Hero Banner */}
      <div className="relative mb-10">
        <img
          src="/images/users-banner.png"
          alt="Our Dedicated Users"
          className="w-full h-[30rem] object-cover object-top rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent rounded-lg flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold text-center px-4">
            OUR DEDICATED USERS
          </h1>
        </div>
      </div>

      {/* Search + Add */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          type="text"
          placeholder="Search users by name, username, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-md transition"
          onClick={() => setAddUser(true)}
        >
          ➕ New User
        </button>
      </div>

      {/* Alerts */}
      {deleteMessage && (
        <div className="mb-4 p-3 bg-green-200 text-green-800 rounded">
          {deleteMessage}
        </div>
      )}
      {editMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
          {editMessage}
        </div>
      )}

      {/* User Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredUsers.length === 0 ? (
          <p className="text-center text-gray-500 col-span-3">
            No users found.
          </p>
        ) : (
          filteredUsers.map((user) => (
            <UserCard
              user={user}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))
        )}
      </div>

      {/* Add User Modal */}
      {addUser && <AddAdminPage onClose={() => setAddUser(false)} />}

      {/* Edit User Modal */}
      {editingUser && (
        <EditUserModal
          formData={formData}
          setFormData={setFormData}
          onClose={() => setEditingUser(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default UsersPage;
