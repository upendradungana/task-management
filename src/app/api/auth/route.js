// import { createUser, getUserByUsername, loginUser, createSession } from '@/lib/auth';
// import { NextResponse } from 'next/server';

// export async function POST(request) {
//   try {
//     const { username, password } = await request.json();

//     const user = await loginUser(username, password);
//     if (!user) {
//       return NextResponse.json(
//         { error: 'Invalid username or password' },
//         { status: 401 }
//       );
//     }

//     await createSession(username);
//     return NextResponse.json({ 
//       success: true,
//       user: {
//         username: user.username,
//         name: user.name,
//         email: user.email
//       }
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE() {
//   try {
//     await destroySession();
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error('Logout error:', error);
//     return NextResponse.json(
//       { error: 'Logout failed' },
//       { status: 500 }
//     );
//   }
// }

//....................................................................


import { loginUser, createSession, destroySession } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const user = await loginUser(username, password);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    await createSession(username);
    return NextResponse.json({ 
      success: true,
      user: {
        username: user.username,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    await destroySession();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}
