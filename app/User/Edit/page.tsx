"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      router.push("/User/Login");
      return;
    }

    const user = JSON.parse(
      localStorage.getItem("loggedInUser") || "{}"
    );

    setName(user.name || "");
    setEmail(user.email || "");
  }, []);

  const saveProfile = () => {
    if (!name.trim() || !email.trim()) return;

    const updatedUser = {
      ...JSON.parse(localStorage.getItem("loggedInUser") || "{}"),
      name: name.trim(),
      email: email.trim(),
    };

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(updatedUser)
    );

    // 🔁 Update user list also
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u: any) =>
      u.email === updatedUser.email ? updatedUser : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    router.push("/User/Profile");
  };

  return (
    <div className="edit-profile-page">
      <h1>Edit Profile</h1>

      <div className="edit-form">
        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="actions">
          <button onClick={saveProfile}>Save</button>
          <button className="cancel" onClick={() => router.back()}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
