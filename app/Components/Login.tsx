"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    // ✅ Get users from localStorage
    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    // ✅ Find matching user
    const user = users.find(
      (u: any) =>
        u.email === email.trim() &&
        u.password === password.trim()
    );

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    // ✅ Save logged-in user
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");

    setError("");
    setSuccess("Login successful ✅");

    setTimeout(() => {
      router.push("/User/Dashboard"); // change if needed
    }, 1000);
  };

  return (
    <div className="form-container">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Gmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" >Login</button>
      </form>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
}
