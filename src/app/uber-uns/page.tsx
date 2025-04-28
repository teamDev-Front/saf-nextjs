// app/uber-uns/page.tsx
import Image from 'next/image';

export default function UberUns() {
  return (
    <>
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

      <section className="mission section-padding">
        <div className="mission-content max-w-4xl">
          <h2>Unsere Mission</h2>
          <p className="mb-8">
            Die Swiss Armsport Federation fördert und entwickelt Armwrestling in der Schweiz. Wir vereinen Athleten,
            Vereine und Fans, um den Sport auf nationaler und internationaler Ebene voranzubringen. Durch Turniere,
            Training und Gemeinschaft stärken wir die Werte von Fairness, Respekt und sportlicher Exzellenz.
          </p>
        </div>
      </section>
    </>
  );
}