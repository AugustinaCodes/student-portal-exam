import { create } from "zustand";
import api from "../api/axios";

const useStudentStore = create((set, get) => ({
  students: [],
  isLoading: false,
  error: null,

  fetchStudents: async (filters = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get("/students", { params: filters });
      const students = response.data?.data?.students || [];
      set({ students, isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || "Failed to fetch students" 
      });
    }
  },

  addStudent: async (studentData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/students", studentData);
      const newStudent = response.data?.data?.student;
      
      set((state) => ({
        students: [newStudent, ...state.students],
        isLoading: false
      }));
      return newStudent;
    } catch (error) {
      const errMsg = error.response?.data?.message || "Failed to add student";
      set({ isLoading: false, error: errMsg });
      throw new Error(errMsg);
    }
  },

  updateStudent: async (id, updatedData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.patch(`/students/${id}`, updatedData);
      const updatedStudent = response.data?.data?.student;

      set((state) => ({
        students: state.students.map((student) => 
          student.id === id ? updatedStudent : student
        ),
        isLoading: false
      }));
      return updatedStudent;
    } catch (error) {
      const errMsg = error.response?.data?.message || "Failed to update student";
      set({ isLoading: false, error: errMsg });
      throw new Error(errMsg);
    }
  },

  removeStudent: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete(`/students/${id}`);
      
      set((state) => ({
        students: state.students.filter((student) => student.id !== id),
        isLoading: false
      }));
    } catch (error) {
      const errMsg = error.response?.data?.message || "Failed to delete student";
      set({ isLoading: false, error: errMsg });
      throw new Error(errMsg);
    }
  }
}));

export default useStudentStore;