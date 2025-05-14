// /src/app/api/tasks/delete/[id]/route.js
import { getDb } from '@/lib/db';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function DELETE(req, { params }) {
  const { id } = params;
  const db = await getDb();
  await db.collection('tasks').deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ success: true });
}
