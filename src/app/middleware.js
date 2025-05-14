import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const path = req.nextUrl.pathname;
  const session = req.cookies.get('session')?.value;

  // Protected paths
  const protectedPaths = ['/dashboard', '/dashboard/tasks'];
  
  // If trying to access protected path without session
  if (protectedPaths.some(p => path.startsWith(p))){
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // If logged in but trying to access auth pages
  const authPaths = ['/login', '/register'];
  if (authPaths.includes(path) && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}