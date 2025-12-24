"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateEmail = (email: string) => {
    return /^[^\s@]+@gmail\.com$/.test(email);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Enter valid Google email (gmail.com)");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    
    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    
    const exists = users.find(
      (u: any) => u.email === email.trim()
    );

    if (exists) {
      setError("Email already registered");
      return;
    }

    
    const newUser = {
  id: Date.now(),
  name: name.trim(),
  email: email.trim().toLowerCase(), 
  password: password.trim(),
  role: "User",
};

    
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

   
    localStorage.setItem("canLogin", "true");

    setError("");
    setSuccess("Registration successful ✅");

    setTimeout(() => {
      router.push("/User/Login");
    }, 1000);
  };

  return (
    <div className="form-container">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
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

        <button type="submit">Register</button>
      </form>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
}
