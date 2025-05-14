

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [error, setError] = useState(null);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Redirect to dashboard on success
      router.push('/dashboard');
      router.refresh(); // Ensure client-side state updates
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
      <form className="mt-10 space-y-8" onSubmit={handleSubmit}>
  <input type="hidden" name="remember" value="true" />

      <div className="rounded-lg shadow-lg p-6 bg-white space-y-4">
        <div>
          <label htmlFor="username" className="sr-only">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            className="appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Username"
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Password"
          />
        </div>
      </div>

      <div className="space-y-4">
        <button
          type="submit"
          className="group relative w-full flex justify-center items-center py-3 px-6 border border-transparent text-sm font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
        >
          Sign in
        </button>

    <div className="text-center py-3 px-4 rounded-md bg-green-100 hover:bg-green-200 transition">
      <a href="/register" className="text-sm font-medium text-indigo-700 hover:text-indigo-900">
        Don’t have an account? <span className="underline">Register</span>
      </a>
    </div>
  </div>
</form>

          
      </div>
    </div>
  );
}