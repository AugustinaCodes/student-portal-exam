export default function StudentTable({ students, onEdit, onDelete }) {
  if (students.length === 0) {
    return (
      <div className="rounded border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
        No students found matching the registry filters.
      </div>
    );
  }

  const getCourseName = (courseId) => {
    const courses = {
      1: "Web Development",
      2: "European History",
      3: "Data Science",
    };
    return courses[courseId] || `Course #${courseId}`;
  };

  return (
    <div className="overflow-x-auto rounded border border-gray-200 bg-white shadow-sm">
      <table className="w-full border-collapse text-left text-sm text-gray-600">
        <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-700 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Full Name</th>
            <th className="px-6 py-3">Main Course</th>
            <th className="px-6 py-3">Enrolled Modules</th>
            <th className="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 font-mono text-xs text-gray-400">#{student.id}</td>
              <td className="px-6 py-4 font-medium text-gray-900">
                {student.first_name} {student.last_name}
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 border border-blue-100">
                  {getCourseName(student.course_id)}
                </span>
              </td>
              <td className="px-6 py-4">
                {student.modules && student.modules.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {student.modules.map((mod) => (
                      <span 
                        key={mod.id} 
                        className="inline-flex items-center rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600 border border-gray-200"
                        title={`${mod.credits} credits`}
                      >
                        {mod.title}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-gray-400 italic">None assigned</span>
                )}
              </td>
              <td className="px-6 py-4 text-right space-x-3 whitespace-nowrap">
                <button
                  onClick={() => onEdit(student)}
                  className="text-sm font-medium text-gray-900 hover:underline cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(student.id)}
                  className="text-sm font-medium text-red-600 hover:underline cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}