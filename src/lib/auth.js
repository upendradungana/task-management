// import { getDb } from './db';
// import bcrypt from 'bcryptjs';
// import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';

// const SALT_ROUNDS = 10;

// // Password utilities
// export async function hashPassword(password) {
//   return await bcrypt.hash(password, SALT_ROUNDS);
// }

// export async function verifyPassword(password, hashedPassword) {
//   return await bcrypt.compare(password, hashedPassword);
// }

// // User management
// export async function createUser({ username, password, email, name }) {
//   const db = await getDb();
//   const hashedPassword = await hashPassword(password);
  
//   const user = {
//     username,
//     password: hashedPassword,
//     email,
//     name,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   };
  
//   const result = await db.collection('users').insertOne(user);
//   return result.insertedId;
// }

// export async function getUserByUsername(username) {
//   const db = await getDb();
//   return await db.collection('users').findOne({ username });
// }

// // Authentication functions
// export async function loginUser(username, password) {
//   const user = await getUserByUsername(username);
//   if (!user) return null;
  
//   const isValid = await verifyPassword(password, user.password);
//   if (!isValid) return null;
  
//   return user;
// }

// export async function getCurrentUser() {
//   const cookieStore = cookies();
//   const session = cookieStore.get('session');
  
//   if (!session?.value) return null;
  
//   const db = await getDb();
//   const user = await db.collection('users').findOne({ username: session.value });

//   // Return plain object without MongoDB-specific properties
//   return user ? {
//     username: user.username,
//     name: user.name,
//     email: user.email
//   } : null;
// }

// // Session management
// export async function createSession(username) {
//   const cookieStore = cookies();
//   cookieStore.set('session', username, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'strict',
//     maxAge: 60 * 60 * 24 * 7, // One week
//     path: '/',
//   });
// }

// export async function destroySession() {
//   const cookieStore = cookies();
//   cookieStore.delete('session');
// }

// // Route protection
// export async function protectRoute() {
//   const user = await getCurrentUser();
//   if (!user) {
//     redirect('/login');
//   }
//   return user;
// }

//......................................................

import { getDb } from './db';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const SALT_ROUNDS = 10;

// Password utilities
export async function hashPassword(password) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

// User management
export async function createUser({ username, password, email, name }) {
  const db = await getDb();
  const hashedPassword = await hashPassword(password);
  
  const user = {
    username,
    password: hashedPassword,
    email,
    name,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  const result = await db.collection('users').insertOne(user);
  return result.insertedId;
}

export async function getUserByUsername(username) {
  const db = await getDb();
  return await db.collection('users').findOne({ username });
}

// Authentication functions
export async function loginUser(username, password) {
  const user = await getUserByUsername(username);
  if (!user) return null;
  
  const isValid = await verifyPassword(password, user.password);
  if (!isValid) return null;
  
  return user;
}

export async function getCurrentUser() {
  const cookieStore = cookies();
  const session = cookieStore.get('session');
  
  if (!session?.value) return null;
  
  const db = await getDb();
  const user = await db.collection('users').findOne({ username: session.value });

  // Return plain object without MongoDB-specific properties
  return user ? {
    username: user.username,
    name: user.name,
    email: user.email
  } : null;
}

// Session management
export async function createSession(username) {
  const cookieStore = cookies();
  cookieStore.set('session', username, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/',
  });
}

export async function destroySession() {
  const cookieStore = cookies();
  cookieStore.delete('session');
}

// Route protection
export async function protectRoute() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }
  return user;
}