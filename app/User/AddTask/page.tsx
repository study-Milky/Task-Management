"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AddTaskPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      router.push("/User/Login");
    }
  }, []);

  const saveTask = () => {
    if (!title.trim()) return;

    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      status: "pending",
    };

    localStorage.setItem("tasks", JSON.stringify([newTask, ...tasks]));
    router.push("/User/Task"); // 🔙 back to list
  };

  return (
    <div className="add-task-page">
      <h1>Add New Task</h1>

      <input
        placeholder="Enter task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && saveTask()}
      />

      <div className="actions">
        <button onClick={saveTask}>Save Task</button>
        <button className="cancel" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </div>
  );
}
