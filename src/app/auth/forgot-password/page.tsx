"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/auth/forgot-password", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email }),
            });
      
            const data = await response.json();
      
            if (data.error) {
              setError(data.error);
              setMessage(null);
            } else {
              setError(null);
              setMessage(
                "If the email is registered, a password reset link has been sent. Please check your inbox."
              );
            }
          } catch(err) {
            setError("Something went wrong. Please try again.")
            setMessage(null);
        }
    }

    return (
        <div>
            <h1>Forgot Password?</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={((e) => setEmail(e.target.value))}
                        required
                    />
                </div>
                <button type="submit">Send Reset Link</button>
            </form>
            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <p>
                Remembered your password? <Link href="/auth/login">Login</Link>
            </p>
        </div>
    );
}