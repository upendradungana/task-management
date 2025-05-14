import TaskForm from '@/components/TaskForm';
import { protectRoute } from '@/lib/auth';

export default async function NewTaskPage() {
  await protectRoute();
  
  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Task</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white p-6 rounded-lg shadow">
            <TaskForm />
          </div>
        </div>
      </main>
    </div>
  );
}