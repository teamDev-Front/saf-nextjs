// app/uber-uns/page.tsx
import Image from 'next/image';

export default function UberUns() {
  return (
    <section className="hero events-hero bg-[url('/assets/backgrounds/bg-full-screen.png')] bg-cover bg-no-repeat">
      <div className="hero-content pt-20 flex flex-col items-center">
        <Image 
          src="/assets/logos/logo-swiss-armsport-federation.svg" 
          alt="Swiss Armsport Federation Logo" 
          width={150} 
          height={150} 
          className="mb-6"
        />
        <h1>Swiss Armsport Federation</h1>
      </div>
    </section>
  );
}