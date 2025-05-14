// import { getCurrentUser } from '@/lib/auth';
// import { getDb } from '@/lib/db';
// import { NextResponse } from 'next/server';

// export async function GET() {
//   const user = await getCurrentUser();
//   if (!user) {
//     return NextResponse.json(
//       { error: 'Unauthorized' },
//       { status: 401 }
//     );
//   }
  
//   const db = await getDb();
//   const tasks = await db.collection('tasks')
//     .find({ owner: user.username })
//     .sort({ dueDate: 1 })
//     .toArray();
  
//   return NextResponse.json(tasks);
// }

// export async function POST(request) {
//   const user = await getCurrentUser();
//   if (!user) {
//     return NextResponse.json(
//       { error: 'Unauthorized' },
//       { status: 401 }
//     );
//   }
  
//   const { title, description, dueDate, status } = await request.json();
  
//   const db = await getDb();
//   const result = await db.collection('tasks').insertOne({
//     title,
//     description,
//     dueDate: new Date(dueDate),
//     status: status || 'pending',
//     owner: user.username,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   });
  
//   return NextResponse.json({
//     _id: result.insertedId,
//     title,
//     description,
//     dueDate,
//     status,
//     owner: user.username
//   });
// }

//.....................................................................

import { getDb } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

// Helper to verify authorization
async function verifyUser() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  return user;
}

// GET all tasks for current user
export async function GET() {
  try {
    const user = await verifyUser();
    if (user.error) return user;

    const db = await getDb();
    const tasks = await db.collection('tasks')
      .find({ owner: user.username })
      .toArray();

    return NextResponse.json(tasks.map(task => ({
      ...task,
      _id: task._id.toString()
    })));
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// POST create new task
export async function POST(request) {
  try {
    const user = await verifyUser();
    if (user.error) return user;

    const { title, description, dueDate, status } = await request.json();
    const db = await getDb();

    const result = await db.collection('tasks').insertOne({
      title,
      description,
      dueDate: new Date(dueDate),
      status: status || 'pending',
      owner: user.username,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return NextResponse.json(
      { _id: result.insertedId.toString() },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}