// components/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="main-footer border-t border-main--2 py-16 px-6 md:px-20 lg:px-40">
      <div className="footer-top flex flex-col md:flex-row justify-between">
        <div className="footer-brand max-w-[300px]">
          <Image 
            src="/assets/logos/logo-swiss-armsport-federation.svg" 
            alt="SAF Logo" 
            width={100} 
            height={100}
            className="mb-8"
          />
          <p className="mb-6">Der offizielle Schweizer Armwrestling-Verband.</p>
          <div className="footer-links">
            <Link href="#" className="text-gray-300 mr-4">Impressum</Link>
            <Link href="#" className="text-gray-300">AGBs</Link>
          </div>
        </div>
        
        <div className="column-footer flex flex-col justify-between mt-8 md:mt-0">
          <nav className="footer-nav flex flex-col md:flex-row gap-8">
            <Link href="/" className="text-gray-300 text-2xl font-semibold">Home</Link>
            <Link href="/events" className="text-gray-300 text-2xl font-semibold">Events</Link>
            <Link href="/vereine" className="text-gray-300 text-2xl font-semibold">Vereine</Link>
            <Link href="/uber-uns" className="text-gray-300 text-2xl font-semibold">Über uns</Link>
            <Link href="/armwrestling" className="text-gray-300 text-2xl font-semibold">Armwrestling</Link>
          </nav>
          
          <div className="footer-bottom flex flex-col md:flex-row justify-between items-start md:items-center mt-12 gap-4">
            <p className="text-gray-400 text-sm">©2024 SAF, alle Rechte vorbehalten.</p>
            <div className="social-links flex gap-4">
              <a href="#" className="social-icon">
                <Image src="/assets/icons/i-instagram.svg" alt="Instagram" width={20} height={20} />
              </a>
              <a href="#" className="social-icon">
                <Image src="/assets/icons/i-facebook.svg" alt="Facebook" width={20} height={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}