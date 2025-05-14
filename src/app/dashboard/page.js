import { getDb } from '@/lib/db';
import { protectRoute, destroySession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import TaskCard from '@/components/TaskCard';
import Link from 'next/link';

export default async function DashboardPage() {
  const user = await protectRoute();
  const db = await getDb();
  
  // Convert MongoDB cursor to array and serialize
  const tasks = (await db.collection('tasks')
    .find({ owner: user.username })
    .sort({ dueDate: 1 })
    .toArray()).map(task => ({
      ...task,
      _id: task._id.toString(),
      dueDate: task.dueDate.toISOString()
    }));

  return (
    <div className="min-h-screen bg-gray-600">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-50">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-900 text-2xl">Welcome, {user.name}</span>
            <form action={async () => {
              'use server';
              await destroySession();
              redirect('/login');
            }}>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-50">Your Tasks</h2>
            <Link
              href="/dashboard/tasks/new"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add New Task
            </Link>
          </div>
          
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-50">You don't have any tasks yet.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tasks.map(task => (
                <TaskCard key={task._id} task={task} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
