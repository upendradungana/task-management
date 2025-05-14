// import { getCurrentUser } from '@/lib/auth';
// import { getDb } from '@/lib/db';
// import { ObjectId } from 'mongodb';
// import { NextResponse } from 'next/server';

// export async function GET(request, { params }) {
//   const user = await getCurrentUser();
//   if (!user) {
//     return NextResponse.json(
//       { error: 'Unauthorized' },
//       { status: 401 }
//     );
//   }
  
//   const db = await getDb();
//   const task = await db.collection('tasks').findOne({ 
//     _id: new ObjectId(params.id),
//     owner: user.username 
//   });
  
//   if (!task) {
//     return NextResponse.json(
//       { error: 'Task not found' },
//       { status: 404 }
//     );
//   }
  
//   return NextResponse.json(task);
// }

// export async function PUT(request, { params }) {
//   const user = await getCurrentUser();
//   if (!user) {
//     return NextResponse.json(
//       { error: 'Unauthorized' },
//       { status: 401 }
//     );
//   }
  
//   const { title, description, dueDate, status } = await request.json();
  
//   const db = await getDb();
//   const result = await db.collection('tasks').updateOne(
//     { 
//       _id: new ObjectId(params.id),
//       owner: user.username 
//     },
//     {
//       $set: {
//         title,
//         description,
//         dueDate: new Date(dueDate),
//         status,
//         updatedAt: new Date()
//       }
//     }
//   );
  
//   if (result.matchedCount === 0) {
//     return NextResponse.json(
//       { error: 'Task not found' },
//       { status: 404 }
//     );
//   }
  
//   return NextResponse.json({ success: true });
// }

// export async function DELETE(request, { params }) {
//   const user = await getCurrentUser();
//   if (!user) {
//     return NextResponse.json(
//       { error: 'Unauthorized' },
//       { status: 401 }
//     );
//   }
  
//   const db = await getDb();
//   const result = await db.collection('tasks').deleteOne({ 
//     _id: new ObjectId(params.id),
//     owner: user.username 
//   });
  
//   if (result.deletedCount === 0) {
//     return NextResponse.json(
//       { error: 'Task not found' },
//       { status: 404 }
//     );
//   }
  
//   return NextResponse.json({ success: true });
// }

//.............................................................

import { getDb } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

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

// GET single task
export async function GET(request, { params }) {
  try {
    const user = await verifyUser();
    if (user.error) return user;

    const db = await getDb();
    const task = await db.collection('tasks').findOne({
      _id: new ObjectId(params.id),
      owner: user.username
    });

    if (!task) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...task,
      _id: task._id.toString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch task' },
      { status: 500 }
    );
  }
}

// PUT update task
export async function PUT(request, { params }) {
  try {
    const user = await verifyUser();
    if (user.error) return user;

    const { title, description, dueDate, status } = await request.json();
    const db = await getDb();

    const result = await db.collection('tasks').updateOne(
      {
        _id: new ObjectId(params.id),
        owner: user.username
      },
      {
        $set: {
          title,
          description,
          dueDate: new Date(dueDate),
          status,
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

// DELETE task
export async function DELETE(request, { params }) {
  try {
    const user = await verifyUser();
    if (user.error) return user;

    const db = await getDb();
    const result = await db.collection('tasks').deleteOne({
      _id: new ObjectId(params.id),
      owner: user.username
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}