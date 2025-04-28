"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [nextEvent, setNextEvent] = useState<{
    id?: number;
    date: string;
    title: string;
    location: string;
    image_path?: string;
  } | null>(null);
  const [eventPassed, setEventPassed] = useState(false);

  useEffect(() => {
    const fetchNextEvent = async () => {
      try {
        const response = await fetch('/api/events/next');
        const event = await response.json();

        if (event) {
          setNextEvent(event);
        }
      } catch (error) {
        console.error('Erro ao buscar próximo evento:', error);
      }
    };

    fetchNextEvent();
  }, []);

  useEffect(() => {
    if (!nextEvent) return;

    const updateCountdown = () => {
      const now = new Date();
      const eventDate = new Date(nextEvent.date);
      
      // Ensure the date is being interpreted correctly
      console.log('Current Date:', now);
      console.log('Event Date:', eventDate);
      
      const distance = eventDate.getTime() - now.getTime();
      console.log('Time Distance (ms):', distance);

      if (distance < 0) {
        // The event has already started
        setEventPassed(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setEventPassed(false);
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [nextEvent]);

  // Format the event date for display
  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <>
      <section className="hero hero-home bg-[url('/assets/backgrounds/bg-home-triple-x-armwrestling.png')] bg-cover bg-no-repeat">
        <div className="hero-content">
          <h1 className="hero-large">Swiss Armsport Federation</h1>
          {nextEvent && (
            <div className="flex flex-col items-center gap-2">
              <p className="text-xl mb-0">
                {eventPassed 
                  ? "Event hat begonnen!" 
                  : `Countdown zum Taurus Armwrestling Cup`}
              </p>
              <p className="text-lg text-main-1 font-semibold">
                {formatEventDate(nextEvent.date)} in {nextEvent.location}
              </p>
            </div>
          )}
          {!nextEvent && (
            <p className="text-xl">
              Der offizielle Schweizer Armwrestling-Verband
            </p>
          )}
        </div>

        {nextEvent && !eventPassed && (
          <div className="countdown flex gap-2 md:gap-8">
            <div className="countdown-item w-24 md:w-40 p-3 md:p-8 bg-black bg-opacity-60 border-2 border-white flex flex-col items-center">
              <span className="countdown-number text-3xl md:text-6xl font-bold text-white">
                {timeLeft.days.toString().padStart(2, '0')}
              </span>
              <span className="countdown-label text-base md:text-xl font-medium text-white">Tagen</span>
            </div>
            <div className="countdown-item w-24 md:w-40 p-3 md:p-8 bg-black bg-opacity-60 border-2 border-white flex flex-col items-center">
              <span className="countdown-number text-3xl md:text-6xl font-bold text-white">
                {timeLeft.hours.toString().padStart(2, '0')}
              </span>
              <span className="countdown-label text-base md:text-xl font-medium text-white">Stunden</span>
            </div>
            <div className="countdown-item w-24 md:w-40 p-3 md:p-8 bg-black bg-opacity-60 border-2 border-white flex flex-col items-center">
              <span className="countdown-number text-3xl md:text-6xl font-bold text-white">
                {timeLeft.minutes.toString().padStart(2, '0')}
              </span>
              <span className="countdown-label text-base md:text-xl font-medium text-white">Minuten</span>
            </div>
            <div className="countdown-item w-24 md:w-40 p-3 md:p-8 bg-black bg-opacity-60 border-2 border-white flex flex-col items-center">
              <span className="countdown-number text-3xl md:text-6xl font-bold text-white">
                {timeLeft.seconds.toString().padStart(2, '0')}
              </span>
              <span className="countdown-label text-base md:text-xl font-medium text-white">Sekunden</span>
            </div>
          </div>
        )}

        <div className="hero-buttons flex flex-col md:flex-row gap-6 items-center">
          {nextEvent && (
            <Link 
              href={nextEvent.id ? `/events/${nextEvent.id}` : "/events"} 
              className="btn btn-outline"
            >
              <Image 
                src="/assets/icons/i-arrow-right.svg" 
                alt="arrow right" 
                width={20} 
                height={20} 
                className="mr-2" 
              />
              Zum Event
            </Link>
          )}
          <Image 
            src="/assets/logos/logo-x-triple.svg" 
            alt="Event logo" 
            className="h-12 md:h-16" 
            width={120} 
            height={60} 
          />
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
          <div className="mission-buttons flex flex-col md:flex-row gap-4">
            <Link href="/uber-uns" className="btn btn-primary">Über uns</Link>
            <Link href="/vereine" className="btn btn-outline">Vereine</Link>
          </div>
        </div>
      </section>

      <section className="swiss-open pt-[80vh] px-6 sm:px-20 lg:px-40 pb-0 bg-[url('/assets/backgrounds/bg-swiss-armwrestling-open-2024.png')] bg-cover bg-no-repeat min-h-screen">
        <div className="swiss-open-content flex justify-between items-center">
          <h2>Swiss Open 2024</h2>
          <Link href="/events" className="btn btn-primary">Nächstes Event</Link>
        </div>
      </section>

      <section className="about-sport section-padding">
        <div className="about-content flex flex-col lg:flex-row gap-16">
          <div className="text-content flex-1">
            <h2>Power. Technik. Intelligenz.</h2>
            <p className="mb-4">
              Armwrestling ist mehr als nur ein Test der Kraft – es ist ein faszinierender Sport, der Technik,
              Ausdauer und mentale Stärke vereint. Zwei Gegner treten sich gegenüber und versuchen, den Arm des
              anderen auf die Unterlage zu drücken. Dabei spielen nicht nur Muskelkraft, sondern auch Taktik,
              Geschwindigkeit und der richtige Einsatz des Körpers eine entscheidende Rolle.
            </p>
            <p className="mb-8">
              Als Wettkampfsport hat Armwrestling klare Regeln, etablierte Techniken und eine leidenschaftliche
              Community. Egal ob Hobby-Athlet oder Profi – der Sport ist für alle zugänglich, die ihre Stärke und
              Fähigkeiten auf die Probe stellen möchten.
            </p>
            <Link href="/armwrestling" className="btn btn-primary">Mehr erfahren</Link>
          </div>
          <div className="image-content">
            <Image
              src="/assets/images/armwrestling-demonstration-x-triple-fitness.png"
              alt="Armwrestling demonstration"
              width={460}
              height={600}
              className="w-full max-w-[460px] h-auto"
            />
          </div>
        </div>
      </section>

      <section className="sponsors section-padding bg-[url('/assets/backgrounds/bg-partners-saf-swiss-armwrestling-x-triple-fitness.png')] bg-cover bg-no-repeat text-center">
        <div className="sponsors-content">
          <h2>CHOICE OF CHAMPIONS</h2>
          <p className="mb-6">Unser Partner für Supplements:</p>
          <Image
            src="/assets/logos/logo-x-triple.svg"
            alt="Sponsor logo"
            width={404}
            height={100}
            className="max-w-[404px] h-auto mx-auto my-8"
          />
          <a href="https://xfitnessshop.ch" target="_blank" rel="noopener noreferrer" className="btn btn-outline inline-flex">
            <Image src="/assets/icons/i-arrow-right.svg" alt="arrow right" width={20} height={20} className="mr-2" />
            Zum Webshop
          </a>
        </div>
      </section>

      <section className="contact section-padding" id="contact">
        <div className="contact-content max-w-4xl">
          <h2>Kontakt</h2>
          <p className="mb-8">
            Hast du Fragen zum Armwrestling, möchtest du an einem Turnier teilnehmen oder brauchst mehr Informationen
            zur Swiss Armsport Federation?
          </p>
          <div className="contact-info flex flex-col md:flex-row gap-8">
            <div className="contact-item flex-1">
              <div className="icon-label flex items-center gap-2 mb-4">
                <Image src="/assets/icons/i-mail.svg" alt="Mail" width={20} height={20} />
                <span>Email</span>
              </div>
              <p>info@saf.ch</p>
            </div>
            <div className="contact-item flex-1">
              <div className="icon-label flex items-center gap-2 mb-4">
                <Image src="/assets/icons/i-phone.svg" alt="Phone" width={20} height={20} />
                <span>Telefon / WhatsApp</span>
              </div>
              <p>078 000 00 00</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}