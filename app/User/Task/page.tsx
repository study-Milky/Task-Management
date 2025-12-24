"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Task = {
  id: number;
  title: string;
  status: "pending" | "completed";
};

export default function TasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      router.push("/User/Login");
      return;
    }

    const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(saved);
  }, [router]);

  // ❌ DELETE TASK FUNCTION
  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="tasks-page">
      {/* Header */}
      <div className="tasks-header">
        <h1>Tasks</h1>
        <div className="tasks-header btn">
        <button  onClick={() => router.push("/User/AddTask")}>
          + Add Task
        </button>
        </div>
      </div>

      {/* Empty state */}
      {tasks.length === 0 && (
        <div className="empty-state">
          <p>No tasks yet</p>
        </div>
      )}

      {/* Task list */}
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={task.status}>
            <span>{task.title}</span>

            {/* 🗑 DELETE BUTTON */}
            <button
              onClick={() => deleteTask(task.id)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <button onClick={() => router.push("/User/Profile")}>
        Profile
      </button>
    </div>
  );
}
