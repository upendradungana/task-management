// import { loginUser, createSession } from '@/lib/auth';
// import { NextResponse } from 'next/server';
// import { getDb } from '@/lib/db';

// export async function POST(request) {
//   try {
//     const { username, password } = await request.json();

//     // Verify user credentials
//     const user = await loginUser(username, password);
//     if (!user) {
//       return NextResponse.json(
//         { error: 'Invalid username or password' },
//         { status: 401 }
//       );
//     }

//     // Create session
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
//     console.error('Login error:', error);
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
//     return NextResponse.json(
//       { error: 'Logout failed' },
//       { status: 500 }
//     );
//   }
// }

//.................................................................

import { createUser, getUserByUsername } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { username, password, email, name } = await request.json();

    // Validation
    if (!username || !password || !email || !name) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 409 }
      );
    }

    // Create user
    const userId = await createUser({ username, password, email, name });
    
    return NextResponse.json({ 
      success: true,
      userId
    }, { status: 201 });
    
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}