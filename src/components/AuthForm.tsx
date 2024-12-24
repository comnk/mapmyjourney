import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

interface AuthFormProps {
  mode: "login" | "register"; // "login" for Login page, "register" for Register page
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mode === "login") {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        setError(null);
        alert("Login successful!");
      }
    } else {
      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.error) {
          setError(data.error);
        } else {
          setError(null);
          alert("Signup successful! You can now log in.");
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div>
      <h1>{mode === "login" ? "Login" : "Register"}</h1>
      <form onSubmit={handleSubmit}>
        {mode === "register" && (
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required={mode === "register"}
            />
          </div>
        )}
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">{mode === "login" ? "Login" : "Register"}</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        {mode === "login" ? (
          <>
            Don't have an account? <Link href="/auth/register">Register</Link>
          </>
        ) : (
          <>
            Already have an account? <Link href="/auth/login">Login</Link>
          </>
        )}
      </p>
    </div>
  );
};