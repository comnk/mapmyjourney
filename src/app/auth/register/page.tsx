'use client';

import AuthForm from "@/components/AuthForm";

export default function RegisterPage() {
    return (
        <div>
            <h1>Register</h1>
            <AuthForm formType="signup"/>
            <p>Already have an account? <a href="/auth/login">Login Now!</a></p>
        </div>
    );
}