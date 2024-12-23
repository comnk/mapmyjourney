'use client';

import AuthForm from "@/components/AuthForm";

export default function login() {


  return (
    <div>
      <h1>Login</h1>
      <AuthForm formType="login"/>
      <p>Don't have account? <a href="/auth/register">Register Now!</a></p>
    </div>
  );
}
