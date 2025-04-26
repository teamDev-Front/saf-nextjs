// app/armwrestling/page.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Armwrestling() {
  return (
    <>
      <section className="hero bg-[url('/assets/backgrounds/bg-armwrestling.png')] bg-cover bg-no-repeat" id="armwrestling">
        <div className="hero-content pt-20">
          <h1 className="mt-12 mb-0">Armwrestling</h1>
          <p className="text-xl max-w-3xl mx-auto my-8">
            Armwrestling ist mehr als ein Kräftemessen – es ist eine Kombination aus Strategie, Technik und mentaler
            Stärke. Lerne die Grundlagen und Techniken dieses spannenden Sports kennen.
          </p>
        </div>
      </section>

      <section className="intro-section py-64 md:py-64 lg:py-64 px-6 md:px-20 lg:px-40">
        <div className="content-wrapper flex flex-col lg:flex-row gap-16 items-start">
          <div className="text-content flex-1 flex flex-col gap-8">
            <h2>Was ist Armwrestling?</h2>
            <p className="text-white">
              Armwrestling ist ein Wettkampf zwischen zwei Personen, bei dem beide versuchen, den Arm des Gegners
              auf eine gepolsterte Unterlage zu drücken. Obwohl es auf den ersten Blick wie reiner Kraftsport
              wirkt, spielt die richtige Technik eine entscheidende Rolle. <br /> Das Ziel: Den Arm deines Gegners
              flach auf die Tischoberfläche zu drücken, während du deine eigene Position verteidigst.
            </p>
          </div>
          <div className="image-content">
            <Image 
              src="/assets/images/wa-ist-armwrestling.png" 
              alt="Armwrestling demonstration" 
              width={400} 
              height={500}
              className="w-full max-w-[400px] h-auto"
            />
          </div>
        </div>
      </section>

      <section className="rules-safety-section py-16 md:py-16 lg:py-32 px-6 md:px-20 lg:px-40 pb-32">
        <div className="content-grid flex flex-col lg:flex-row gap-32">
          <div className="rules-content flex-1 flex flex-col gap-8">
            <h2>Regeln</h2>
            <div className="rules-list flex flex-col gap-4">
              <div className="rule-item">
                <h3 className="text-white text-xl font-semibold leading-8">Ellbogen bleibt auf dem Pad</h3>
                <p className="text-gray-300 text-xl">
                  Der Ellbogen muss während des gesamten Matches auf dem Pad (Kissen) bleiben.
                </p>
              </div>
              <div className="rule-item">
                <h3 className="text-white text-xl font-semibold leading-8">Fairer Start</h3>
                <p className="text-gray-300 text-xl">
                  Beide Hände müssen korrekt greifen und das Handgelenk muss gerade sein, bevor der
                  Schiedsrichter den Start freigibt.
                </p>
              </div>
              <div className="rule-item">
                <h3 className="text-white text-xl font-semibold leading-8">Pin (Sieg)</h3>
                <p className="text-gray-300 text-xl">
                  Ein Sieg wird erzielt, wenn der Arm des Gegners flach auf der Unterlage landet.
                </p>
              </div>
            </div>
            <div className="additional-links">
              <h4 className="text-gray-300 text-base font-normal mb-2">weitere Links</h4>
              <Link href="#" className="text-main-0 text-xl font-semibold no-underline hover:underline">
                Wettkampf Reglement
              </Link>
              <Link href="#" className="block mt-2 text-main-0 text-xl font-semibold no-underline hover:underline">
                Schidsrichter Reglement
              </Link>
            </div>
          </div>

          <div className="safety-content flex-1 flex flex-col gap-8">
            <h2>Sicherheit</h2>
            <div className="safety-list flex flex-col gap-4">
              <div className="safety-item">
                <h3 className="text-white text-xl font-semibold leading-8">Position der Schultern</h3>
                <p className="text-gray-300 text-xl">
                  Beide Schultern sollten immer parallel zum Arm und zur Hand bleiben. Verdrehen des Körpers
                  kann zu Verletzungen führen.
                </p>
              </div>
              <div className="safety-item">
                <h3 className="text-white text-xl font-semibold leading-8">Handgelenkskontrolle</h3>
                <p className="text-gray-300 text-xl">
                  Das Handgelenk sollte immer stabil gehalten werden. Vermeide extreme Drehungen oder
                  Überstreckungen.
                </p>
              </div>
              <div className="safety-item">
                <h3 className="text-white text-xl font-semibold leading-8">Richtige Haltung</h3>
                <p className="text-gray-300 text-xl">
                  Halte immer den Ellbogen auf dem Tisch und den Handgelenksbereich zwischen den Schultern.
                  Diese Position schützt vor Verletzungen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="techniques-section py-32 px-6 md:px-20 lg:px-40 bg-[url('/assets/backgrounds/bg-armwrestling-techniken.png')] bg-cover bg-no-repeat">
        <div className="section-header flex flex-col gap-3 text-center mb-32">
          <h2>Armwrestling Techniken</h2>
          <p className="text-white text-xl mx-auto max-w-3xl">
            Armwrestling ist weit mehr als blosse Muskelkraft. Es gibt verschiedene Techniken, die du anwenden
            kannst, um deine Chancen auf den Sieg zu erhöhen. Hier sind die wichtigsten.
          </p>
        </div>

        <div className="techniques-grid flex flex-col gap-16">
          <div className="techniques-row flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="technique-card flex-1 p-8 bg-black bg-opacity-50 border border-main-0 flex flex-col gap-8 items-center text-center">
              <h3 className="text-4xl md:text-6xl font-bold text-white">Top Roll</h3>
              <p className="text-gray-300 text-xl">
                Eine Technik, bei der du versuchst, die Finger deines Gegners zu kontrollieren und dein
                Handgelenk nach aussen zu rollen. Dies bricht den Griff des Gegners und gibt dir einen Vorteil.
              </p>
            </div>
            <div className="technique-card flex-1 p-8 bg-black bg-opacity-50 border border-main-0 flex flex-col gap-8 items-center text-center">
              <h3 className="text-4xl md:text-6xl font-bold text-white">Hook</h3>
              <p className="text-gray-300 text-xl">
                Du bringst deinen Gegner nah an dich heran, winkelst den Arm ein und nutzt deine Armstärke und
                die Handgelenksspannung, um zu dominieren.
              </p>
            </div>
            <div className="technique-card flex-1 p-8 bg-black bg-opacity-50 border border-main-0 flex flex-col gap-8 items-center text-center">
              <h3 className="text-4xl md:text-6xl font-bold text-white">Press</h3>
              <p className="text-gray-300 text-xl">
                Eine direkte und kraftvolle Technik, bei der du deinen Körpergewicht nach vorne verlagerst und
                versuchst, den Gegner mit Druck nach unten zu besiegen.
              </p>
            </div>
          </div>
          <div className="techniques-row flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="technique-card flex-1 p-8 bg-black bg-opacity-50 border border-main-0 flex flex-col gap-8 items-center text-center">
              <h3 className="text-4xl md:text-6xl font-bold text-white">Kings Move</h3>
              <p className="text-gray-300 text-xl">
                Diese defensive Technik wird verwendet, um den Kampf in die Länge zu ziehen. Dabei wird der Arm
                nach unten gestreckt, um den Gegner zu ermüden.
              </p>
            </div>
            <div className="technique-card flex-1 p-8 bg-black bg-opacity-50 border border-main-0 flex flex-col gap-8 items-center text-center">
              <h3 className="text-4xl md:text-6xl font-bold text-white">Flop Press</h3>
              <p className="text-gray-300 text-xl">
                Hierbei wird das Handgelenk nach hinten gebeugt und das Körpergewicht stark genutzt, um durch
                rohe Kraft zu gewinnen. Eine riskante, aber kraftvolle Technik.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grip-section py-64 md:py-64 lg:py-64 px-6 md:px-20 lg:px-40">
        <div className="content-wrapper flex flex-col lg:flex-row gap-16">
          <div className="text-content flex-1 flex flex-col gap-16">
            <p className="intro-text text-white text-xl">
              Beim Armwrestling kann es vorkommen, dass der Griff der Hände während des Kampfes
              nicht gehalten werden kann. Dies nennt man einen Slip. Wenn beide Hände sich lösen, gibt es eine
              spezielle Regelung, die sogenannte Strap-Regel.
            </p>

            <div className="grip-info flex flex-col gap-8">
              <h2>Slip</h2>
              <p className="text-white text-xl">
                Tritt auf, wenn beide Athleten den Griff nicht halten können und die Hände auseinandergehen.
              </p>
            </div>

            <div className="grip-info flex flex-col gap-8">
              <h2>Strap</h2>
              <p className="text-white text-xl">
                Wenn ein Slip passiert, werden die Hände mit einem Strap verbunden, um sicherzustellen, dass der
                Griff stabil bleibt und beide Athleten unter gleichen Bedingungen weitermachen können. Der Strap
                erhöht die Herausforderung, da nun mehr Kraft aus dem Arm und weniger aus der Hand kommen muss.
              </p>
            </div>
          </div>
          <div className="image-content">
            <Image 
              src="/assets/images/close-picture-armwrestling.png" 
              alt="Grip demonstration" 
              width={485} 
              height={754}
              className="w-full max-w-[485px] h-auto"
            />
          </div>
        </div>
      </section>
    </>
  );
}