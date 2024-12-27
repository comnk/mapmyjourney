"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Retrieve token from query parameters

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password (optional)
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    setError("");

    // Debugging: Log token and password before sending the request
    console.log("Submitting token:", token);
    console.log("Submitting password:", password);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      if (response.ok) {
        setMessage("Your password has been successfully reset.");
      } else {
        const data = await response.json(); // Try to retrieve error details
        setMessage(data.error || "Invalid token or something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting password reset request:", err);
      setMessage("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
}
