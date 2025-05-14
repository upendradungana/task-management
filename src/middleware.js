// middleware.js in your Task Management System
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const response = NextResponse.next();
  
  response.headers.set('Access-Control-Allow-Origin', 'https://your-task-board.com');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  
  return response;
}