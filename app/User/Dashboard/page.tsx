"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  status: "pending" | "in-progress" | "completed";
};

export default function Dashboard() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      router.push("/User/Login");
    }

    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // 🔢 Status count
  const pending = tasks.filter(t => t.status === "pending").length;
  const inProgress = tasks.filter(t => t.status === "in-progress").length;
  const completed = tasks.filter(t => t.status === "completed").length;

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>TaskFlow</h2>

        <nav>
          <button onClick={() => router.push("/User/Dashboard")}>
            Dashboard
          </button>

          <button onClick={() => router.push("/User/Task")}>
            Tasks
          </button>

          <button onClick={() => router.push("/User/Profile")}>
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

        {/* ✅ Status Cards */}
        <div className="status-cards">
          <div className="card pending">
            <h3>Pending</h3>
            <p>{pending}</p>
          </div>

          <div className="card progress">
            <h3>In Progress</h3>
            <p>{inProgress}</p>
          </div>

          <div className="card completed">
            <h3>Completed</h3>
            <p>{completed}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
