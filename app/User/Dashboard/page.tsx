"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      router.push("/User/Login");
    }
  }, []);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>TaskFlow</h2>

        <nav>
          <button onClick={() => router.push("/User/Dashboard")}>
            Dashboard
          </button>

          {/* ✅ FIXED */}
          <button onClick={() => router.push("/User/Task")}>
            Tasks
          </button>

          <button  onClick={() => router.push("/User/Profile")}>
            Profile
          </button>

          <button
            onClick={() => {
              localStorage.clear();
              router.push("/User/Login");
            }}
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main */}
      <main className="content">
        <h1>Dashboard</h1>
        {/* cards & activity */}
      </main>
    </div>
  );
}
