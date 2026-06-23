import { useState, useEffect } from "react";
import useStudentStore from "../store/useStudentStore";
import useModuleStore from "../store/useModuleStore";

export default function StudentModal({ isOpen, onClose, studentToEdit }) {
  const { addStudent, updateStudent } = useStudentStore();
  const { modules } = useModuleStore();

  const isEditMode = !!studentToEdit;

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    course_id: "",
    selectedModules: [], 
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEditMode && studentToEdit) {
      setFormData({
        first_name: studentToEdit.first_name,
        last_name: studentToEdit.last_name,
        course_id: String(studentToEdit.course_id),
        selectedModules: studentToEdit.modules ? studentToEdit.modules.map((m) => m.id) : [],
      });
    } else {
      setFormData({ first_name: "", last_name: "", course_id: "", selectedModules: [] });
    }
  }, [isEditMode, studentToEdit, isOpen]);

  if (!isOpen) return null;

  const handleCheckboxChange = (moduleId) => {
    setFormData((prev) => {
      const alreadyChecked = prev.selectedModules.includes(moduleId);
      return {
        ...prev,
        selectedModules: alreadyChecked
          ? prev.selectedModules.filter((id) => id !== moduleId)
          : [...prev.selectedModules, moduleId],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const submissionData = {
      first_name: formData.first_name.trim(),
      last_name: formData.last_name.trim(),
      course_id: Number(formData.course_id),
      module_ids: formData.selectedModules,
    };

    try {
      if (isEditMode) {
        await updateStudent(studentToEdit.id, submissionData);
      } else {
        await addStudent(submissionData);
      }
      onClose();
    } catch (err) {
      setError(err.message || "An error occurred compiling student data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg border border-gray-200 shadow-xl my-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {isEditMode ? "Modify Student Details" : "Register New Student"}
        </h3>

        {error && (
          <div className="mb-4 p-2.5 text-xs text-red-600 bg-red-50 border border-red-200 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">First Name</label>
              <input
                type="text"
                required
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Last Name</label>
              <input
                type="text"
                required
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Main Course Program</label>
            <select
              required
              value={formData.course_id}
              onChange={(e) => setFormData({ ...formData, course_id: e.target.value })}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm bg-white focus:outline-none focus:border-gray-900"
            >
              <option value="">Choose main program...</option>
              <option value="1">Web Development</option>
              <option value="2">European History</option>
              <option value="3">Data Science</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Assign Module Coursework</label>
            {modules.length === 0 ? (
              <p className="text-xs text-gray-400 italic">No modules built yet. Add modules first.</p>
            ) : (
              <div className="mt-1 max-h-40 overflow-y-auto rounded border border-gray-200 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {modules.map((mod) => (
                  <label key={mod.id} className="flex items-start gap-2 text-xs text-gray-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="mt-0.5 rounded border-gray-300 focus:ring-0"
                      checked={formData.selectedModules.includes(mod.id)}
                      onChange={() => handleCheckboxChange(mod.id)}
                    />
                    <span>
                      {mod.title} <span className="text-gray-400">({mod.credits}cr)</span>
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800 transition disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Saving..." : isEditMode ? "Apply Changes" : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}