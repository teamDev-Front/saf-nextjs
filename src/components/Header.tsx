// components/Header.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const isActive = (path: string) => {
    return pathname === path ? 'text-white font-semibold' : 'text-gray-300';
  };

  // Fechar menu ao redimensionar a janela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Adicionar classe ao body para evitar rolagem quando o menu estiver aberto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-0 w-full z-50 bg-black bg-opacity-90 backdrop-blur-sm">
      <nav className="flex justify-between items-center gap-3 px-4 py-4 md:px-6 lg:px-40 max-w-[1440px] mx-auto">
        <div className="logo">
          <Link href="/">
            <Image src="/assets/logos/logo-swiss-armsport-federation.svg" alt="SAF Logo" width={70} height={70} />
          </Link>
        </div>

        <button
          className="md:hidden text-3xl text-white absolute right-5 top-5 z-[1001]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          &#9776;
        </button>

        <div className={`nav-links ${mobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row fixed md:static top-0 left-0 w-full h-screen md:h-auto bg-black md:bg-transparent pt-20 md:pt-0 items-center gap-6 md:gap-8 z-[1000]`}>
          <Link
            href="/events"
            className={`nav-link ${isActive('/events')}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Events
          </Link>

          <Link
            href="/vereine"
            className={`nav-link ${isActive('/vereine')}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Vereine
          </Link>

          <Link
            href="/uber-uns"
            className={`nav-link ${isActive('/uber-uns')}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Über uns
          </Link>

          <Link
            href="/armwrestling"
            className={`nav-link ${isActive('/armwrestling')}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Armwrestling
          </Link>

          {mobileMenuOpen && user ? (
            <button
              className="mt-6 py-2 px-4 bg-main-0 text-white rounded"
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
            >
              Abmelden
            </button>
          ) : mobileMenuOpen && !user ? (
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/login"
                className="py-2 px-4 border border-white text-white rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="py-2 px-4 bg-main-0 text-white rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Registrieren
              </Link>
            </div>
          ) : null}
        </div>

        <div className="user-nav hidden md:flex ml-4">
          {!user ? (
            <div className="auth-links flex gap-4">
              <Link href="/login" className="text-white text-base font-medium py-1.5 px-3 rounded border border-white">
                Login
              </Link>
              <Link href="/register" className="text-white text-base font-medium py-1.5 px-3 rounded bg-main-0">
                Registrieren
              </Link>
            </div>
          ) : (
            <div className="user-menu relative">
              <div className="user-dropdown">
                <button
                  className="flex items-center bg-transparent border-none text-white text-base font-medium py-1.5 px-3 rounded gap-2"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <span>{user.name.split(' ')[0]}</span>
                  <Image
                    src="/assets/icons/i-arrow-down.svg"
                    alt="dropdown"
                    className={`w-3 h-3 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`}
                    width={12}
                    height={12}
                  />
                </button>

                {userMenuOpen && (
                  <div className="user-dropdown-content absolute right-0 top-full bg-grey--1 rounded min-w-[160px] shadow-lg z-50">
                    <Link
                      href="/profile"
                      className="text-white py-3 px-4 block hover:bg-main--2"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Profil
                    </Link>
                    <button
                      className="text-white py-3 px-4 block hover:bg-main--2 w-full text-left"
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                    >
                      Abmelden
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="contact-link hidden md:block">
          <a href="#contact" className="text-gray-300 text-base">Kontakt</a>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu-overlay fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80 z-[999]"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}