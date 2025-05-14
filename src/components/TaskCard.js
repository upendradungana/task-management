'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TaskCard({ task }) {
  const router = useRouter();

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this task?');
    if (!confirmed) return;

    await fetch(`/api/tasks/delete/${task._id}`, {
      method: 'DELETE',
    });

    router.refresh(); // Or redirect if needed
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{task.title}</h3>
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              task.status === 'completed'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {task.status}
          </span>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-500">{task.description}</p>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500">Due: {formatDate(task.dueDate)}</p>
        </div>
        <div className="mt-5 flex space-x-2">
          <Link
            href={`/dashboard/tasks/${task._id}`}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
