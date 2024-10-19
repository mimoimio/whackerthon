// pages/register.js
import { useState } from "react";
import { useRouter } from "next/router";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      router.push("/login");
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <form className="max-w-md w-full" onSubmit={handleSubmit}>
        <h3 className="text-gray-800 text-3xl font-extrabold mb-8">Register</h3>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full px-4 py-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full px-4 py-2"
          required
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white"
        >
          Register
        </button>
      </form>
    </div>
  );
}
