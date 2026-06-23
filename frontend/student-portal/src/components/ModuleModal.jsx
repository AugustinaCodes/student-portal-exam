import { useState } from "react";
import useModuleStore from "../store/useModuleStore";

export default function ModuleModal({ isOpen, onClose }) {
  const { createModule } = useModuleStore();
  const [formData, setFormData] = useState({ title: "", credits: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await createModule({
        title: formData.title.trim(),
        credits: Number(formData.credits),
      });
      setFormData({ title: "", credits: "" }); 
      onClose();
    } catch (err) {
      setError(err.message || "Failed to save module.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg border border-gray-200 shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Module</h3>

        {error && (
          <div className="mb-4 p-2.5 text-xs text-red-600 bg-red-50 border border-red-200 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Module Title</label>
            <input
              type="text"
              required
              placeholder="e.g., Python Fundamentals"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Academic Credits</label>
            <input
              type="number"
              required
              min="1"
              placeholder="e.g., 5"
              value={formData.credits}
              onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-900"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
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
              {isSubmitting ? "Saving..." : "Save Module"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}