import TaskForm from '@/components/TaskForm';
import { getCurrentUser } from '@/lib/auth';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/db';
import { notFound, redirect } from 'next/navigation';

export default async function EditTaskPage({ params }) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  
  const db = await getDb();
  const task = await db.collection('tasks').findOne({ 
    _id: new ObjectId(params.id),
    owner: user.username 
  });
  
  if (!task) notFound();
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Task</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white p-6 rounded-lg shadow">
            <TaskForm task={task} />
          </div>
        </div>
      </main>
    </div>
  );
}