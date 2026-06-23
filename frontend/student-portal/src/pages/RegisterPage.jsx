import { useState } from "react";
import useAuthStore from "../store/useAuthStore";

export default function Register() {
  const { register, isLoading, error, clearError } = useAuthStore();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
    } catch (err) {}
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 border border-gray-200 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Create Account</h2>
        
        {error && (
          <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              onFocus={clearError}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              onFocus={clearError}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-gray-900 text-white rounded text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50"
          >
            {isLoading ? "Creating Account..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}