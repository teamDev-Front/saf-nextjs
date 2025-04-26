// app/register/page.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function Register() {
  const { register, error } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    // Mínimo 8 caracteres
    return password.length >= 8;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar entrada
    const newErrors = {
      name: !name,
      email: !email || !validateEmail(email),
      password: !password || !validatePassword(password),
      confirmPassword: password !== confirmPassword
    };
    
    setValidationErrors(newErrors);
    
    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    try {
      await register(name, email, password, confirmPassword);
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="register-container flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4 py-16 mt-20">
      <div className="register-form w-full max-w-md p-8 md:p-10 bg-grey--1 rounded-lg shadow-lg">
        <h2 className="form-title text-center text-2xl font-bold text-white mb-8">Registrieren</h2>
        
        {error && (
          <div className="alert alert-danger bg-red-800/20 text-red-400 border border-red-800/30 p-3 rounded mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-6">
            <label htmlFor="name" className="block text-gray-300 mb-2 font-medium">Name</label>
            <input 
              type="text" 
              id="name" 
              className="w-full p-3 border border-gray-500 bg-black rounded text-white focus:outline-none focus:border-main-0"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {validationErrors.name && (
              <div className="error-message text-main-1 text-sm mt-1">
                Bitte geben Sie Ihren Namen ein.
              </div>
            )}
          </div>
          
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
            <div className="password-requirements text-gray-400 text-xs mt-1">
              Das Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Großbuchstaben, einen Kleinbuchstaben und eine Zahl enthalten.
            </div>
            {validationErrors.password && (
              <div className="error-message text-main-1 text-sm mt-1">
                Das Passwort erfüllt nicht die Anforderungen.
              </div>
            )}
          </div>
          
          <div className="form-group mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-300 mb-2 font-medium">Passwort bestätigen</label>
            <input 
              type="password" 
              id="confirmPassword" 
              className="w-full p-3 border border-gray-500 bg-black rounded text-white focus:outline-none focus:border-main-0"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {validationErrors.confirmPassword && (
              <div className="error-message text-main-1 text-sm mt-1">
                Die Passwörter stimmen nicht überein.
              </div>
            )}
          </div>
          
          <button 
            type="submit" 
            className="register-btn w-full py-3.5 px-4 bg-main-0 text-white border-none rounded font-semibold text-base cursor-pointer transition-colors hover:bg-main--1"
          >
            Registrieren
          </button>
        </form>
        
        <div className="login-link text-center mt-6 text-gray-300">
          Bereits ein Konto? <Link href="/login" className="text-main-1 font-semibold">Anmelden</Link>
        </div>
      </div>
    </div>
  );
}