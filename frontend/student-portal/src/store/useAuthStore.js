import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../api/axios";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post("/auth/login", credentials);
          const user = response.data?.user || response.data?.data?.user;

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
          return user;
        } catch (error) {
          const errMsg = error.response?.data?.message || "Invalid email or password";
          set({ isLoading: false, error: errMsg });
          throw new Error(errMsg);
        }
      },

      register: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post("/auth/register", credentials);
          const user = response.data?.user || response.data?.data?.user;

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
          return user;
        } catch (error) {
          const errMsg = error.response?.data?.message || "Registration failed";
          set({ isLoading: false, error: errMsg });
          throw new Error(errMsg);
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await api.post("/auth/logout");
        } catch (error) {
          console.error("Logout endpoint failed", error);
        } finally {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "student-portal-auth", 
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }), 
    }
  )
);

export default useAuthStore;