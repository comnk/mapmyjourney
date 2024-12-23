import { useState } from "react";

type AuthFormProps = {
    formType: "login" | "signup";
    onSubmit?: (data : { email: string; password: string; name?: string }) => Promise<void>;
};

export default function AuthForm({ formType, onSubmit }: AuthFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <form className="auth-form">
                <div>
                    <label>
                        Email:
                        <input type="email" required />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input type="password" required />
                    </label>
                </div>
                <button type="submit">{formType === 'login' ? 'Log In' : 'Sign Up' }</button>
            </form>
        </div>
    );
}