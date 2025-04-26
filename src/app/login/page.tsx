// app/login/page.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function Login() {
    const { login, error } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationErrors, setValidationErrors] = useState({
        email: false,
        password: false
    });

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = {
            email: !email || !validateEmail(email),
            password: !password
        };

        setValidationErrors(newErrors);

        if (newErrors.email || newErrors.password) {
            return;
        }
        try {
            await login(email, password);
        } catch (err) {
            console.error('Login error:', err);
        }
    };

    return (
        <div className="login-container flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4 py-16 mt-20">
            <div className="login-form w-full max-w-md p-8 md:p-10 bg-grey--1 rounded-lg shadow-lg">
                <h2 className="form-title text-center text-2xl font-bold text-white mb-8">Login</h2>

                {error && (
                    <div className="alert alert-danger bg-red-800/20 text-red-400 border border-red-800/30 p-3 rounded mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-6">
                        <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">E-Mail</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-3 border border-gray-500 bg-black rounded text-white focus:outline-none focus:border-main-0"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {validationErrors.email && (
                            <div className="error-message text-main-1 text-sm mt-1">
                                Bitte geben Sie eine gültige E-Mail-Adresse ein.
                            </div>
                        )}
                    </div>

                    <div className="form-group mb-6">
                        <label htmlFor="password" className="block text-gray-300 mb-2 font-medium">Passwort</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-3 border border-gray-500 bg-black rounded text-white focus:outline-none focus:border-main-0"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {validationErrors.password && (
                            <div className="error-message text-main-1 text-sm mt-1">
                                Bitte geben Sie Ihr Passwort ein.
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="login-btn w-full py-3.5 px-4 bg-main-0 text-white border-none rounded font-semibold text-base cursor-pointer transition-colors hover:bg-main--1"
                    >
                        Anmelden
                    </button>
                </form>

                <div className="register-link text-center mt-6 text-gray-300">
                    Noch kein Konto? <Link href="/register" className="text-main-1 font-semibold">Registrieren</Link>
                </div>
            </div>
        </div>
    );
}