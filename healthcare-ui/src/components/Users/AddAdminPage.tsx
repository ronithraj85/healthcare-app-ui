import { useState } from "react";
import { register } from "../../services/Auth.service";

export default function AddAdminPage({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    roles: "",
  });
  const [adminaddedMessage, setAdminaddedMessage] = useState("");

  const rolesList = ["Admin", "User", "Staff"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(
        form.name,
        form.username,
        form.email,
        form.password,
        form.roles
      );
      setAdminaddedMessage("User added successfully!");
      setTimeout(() => {
        setAdminaddedMessage("");
        onClose(); // close after success
      }, 2000);
    } catch {
      console.log("Adding user failed. Please try again after sometime!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Sliding Panel */}
      <div className="w-full max-w-md bg-white shadow-xl transform translate-x-0 transition-transform duration-300 ease-out p-6 overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Add User</h2>

        {adminaddedMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
            {adminaddedMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={form.username}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />

          <div>
            <label className="block font-semibold mb-2">Select Role:</label>
            <div className="flex space-x-4">
              {rolesList.map((roleOption) => (
                <label
                  key={roleOption}
                  className={`cursor-pointer px-4 py-2 rounded-lg border transition-colors ${
                    form.roles === roleOption
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-100 text-gray-700 border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="roles"
                    value={roleOption}
                    checked={form.roles === roleOption}
                    onChange={handleChange}
                    className="hidden"
                    required
                  />
                  {roleOption}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-green-300 to-blue-500 text-white font-semibold px-4 py-2 rounded w-full hover:opacity-90"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
