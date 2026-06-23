import { create } from "zustand";
import api from "../api/axios";

const useModuleStore = create((set) => ({
  modules: [],
  isLoading: false,
  error: null,

  fetchModules: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get("/modules");
      const modules = response.data?.data?.modules || [];
      set({ modules, isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || "Failed to fetch modules" 
      });
    }
  },

  createModule: async (moduleData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/modules", moduleData);
      const newModule = response.data?.data?.module;
      
      set((state) => ({
        modules: [...state.modules, newModule].sort((a, b) => a.title.localeCompare(b.title)),
        isLoading: false
      }));
      return newModule;
    } catch (error) {
      const errMsg = error.response?.data?.message || "Failed to create module";
      set({ isLoading: false, error: errMsg });
      throw new Error(errMsg);
    }
  }
}));

export default useModuleStore;