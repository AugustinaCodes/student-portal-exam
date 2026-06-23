import { useEffect, useState } from "react";
import useStudentStore from "../store/useStudentStore";
import useModuleStore from "../store/useModuleStore";
import StudentTable from "../components/StudentTable";
import ModuleModal from "../components/ModuleModal";
import StudentModal from "../components/StudentModal";

export default function DashboardPage() {
  const { students, fetchStudents, removeStudent, isLoading } = useStudentStore();
  const { fetchModules } = useModuleStore();

  const [filters, setFilters] = useState({
    first_name: "",
    course_id: "",
  });
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [selectedStudentForEdit, setSelectedStudentForEdit] = useState(null);

  useEffect(() => {
    fetchStudents();
    fetchModules();
  }, [fetchStudents, fetchModules]);

  const handleFilterChange = (e) => {
    const updatedFilters = { ...filters, [e.target.name]: e.target.value };
    setFilters(updatedFilters);

    const apiParams = {};
    if (updatedFilters.first_name.trim()) apiParams.first_name = updatedFilters.first_name.trim();
    if (updatedFilters.course_id) apiParams.course_id = Number(updatedFilters.course_id);

    fetchStudents(apiParams);
  };

  const handleEditClick = (student) => {
    setSelectedStudentForEdit(student);
    setIsStudentModalOpen(true);
  };

  const handleAddStudentClick = () => {
    setSelectedStudentForEdit(null); 
    setIsStudentModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to remove this student and clear all their records?")) {
      await removeStudent(id);
    }
  };

  return (
  <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex-1 w-full">
    
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-5 mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Student Registry</h1>
        <p className="mt-1 text-sm text-gray-500">Manage portal student registration, program alignments, and active modules.</p>
      </div>
      <div className="mt-4 sm:mt-0 flex gap-3">
        <button 
          onClick={() => setIsModuleModalOpen(true)}
          className="rounded border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
        >
          + Create Module
        </button>
        <button 
          onClick={handleAddStudentClick}
          className="rounded bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800 transition cursor-pointer"
        >
          + Add Student
        </button>
      </div>
    </div>

    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3 max-w-3xl">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Search by Name</label>
        <input
          type="text"
          name="first_name"
          placeholder="Type first name..."
          value={filters.first_name}
          onChange={handleFilterChange}
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-900"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Filter Course</label>
        <select
          name="course_id"
          value={filters.course_id}
          onChange={handleFilterChange}
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm bg-white focus:outline-none focus:border-gray-900"
        >
          <option value="">All Academic Programs</option>
          <option value="1">Web Development</option>
          <option value="2">European History</option>
          <option value="3">Data Science</option>
        </select>
      </div>
    </div>

    {isLoading ? (
      <div className="py-12 text-center text-sm font-medium text-gray-500">
        Syncing student registry data...
      </div>
    ) : (
      <StudentTable 
        students={students} 
        onEdit={handleEditClick} 
        onDelete={handleDeleteClick} 
      />
    )}

    <ModuleModal 
      isOpen={isModuleModalOpen} 
      onClose={() => setIsModuleModalOpen(false)} 
    />
    
    <StudentModal 
      isOpen={isStudentModalOpen} 
      studentToEdit={selectedStudentForEdit}
      onClose={() => {
        setIsStudentModalOpen(false);
        setSelectedStudentForEdit(null);
      }} 
    />

  </div>
);
}