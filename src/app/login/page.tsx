'use client';

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={() => signIn('google', { callbackUrl: "/vendors" })}
        className="px-6 py-3 bg-blue-500 text-white rounded-md shadow"
      >
        Sign in with Google
      </button>
    </div>
  );
}
