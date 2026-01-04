import React from "react";

const UserCard = ({ user, handleDelete, handleEdit }) => {
  return (
    <div
      key={user.id}
      className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition"
    >
      <img
        src={
          user.imageUrl ||
          "https://images.unsplash.com/photo-1544723795-3fb6469f5ae5?auto=format&fit=crop&w=600&q=80"
        }
        alt={user.name}
        className="w-28 h-28 mx-auto rounded-full object-cover mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
      <p className="text-gray-600">{user.email}</p>
      <p className="text-sm text-gray-500 mb-4">
        {user.roles?.join(", ") || "No roles"}
      </p>
      <div className="flex justify-center gap-2">
        <button
          onClick={() => handleEdit(user)}
          className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => handleDelete(user.id)}
          className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
