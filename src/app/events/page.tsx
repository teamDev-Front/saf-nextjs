"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Event } from '@prisma/client';



export default function Events() {
    const [events, setEvents] = useState<Event[]>([]);
    const [nextEvent, setNextEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedLocation, setSelectedLocation] = useState('Alle');
    const [locations, setLocations] = useState<string[]>(['Alle']);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('/api/events');
                const eventsData = await response.json();

                // Filtrar e ordenar eventos futuros
                const now = new Date();
                const futureEvents = eventsData
                    .filter((event: Event) => new Date(event.date) >= now)
                    .sort((a: Event, b: Event) => 
                        new Date(a.date).getTime() - new Date(b.date).getTime()
                    );

                setEvents(eventsData);

                // Definir próximo evento
                if (futureEvents.length > 0) {
                    setNextEvent(futureEvents[0]);
                }

                // Extrair localizações únicas
                const uniqueLocations = new Set<string>();
                eventsData.forEach((event: Event) => {
                    const parts = event.location.split(',');
                    if (parts.length > 0) {
                        let city = parts[parts.length - 1].trim().replace(/^\d+\s*/, '');
                        if (city) uniqueLocations.add(city);
                    }
                });

                setLocations(['Alle', ...Array.from(uniqueLocations)]);
            } catch (error) {
                console.error('Erro ao buscar eventos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    // Funções utilitárias de formatação (semelhantes à versão HTML)
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const getMonthName = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('de-DE', { month: 'short' });
    };

    const getDay = (dateString: string) => {
        const date = new Date(dateString);
        return date.getDate();
    };

    // Filtrar eventos por localização
    const filteredEvents = events.filter(event => {
        if (selectedLocation === 'Alle') return true;

        const parts = event.location.split(',');
        if (parts.length > 0) {
            let lastPart = parts[parts.length - 1].trim();
            let city = lastPart.replace(/^\d+\s*/, '').trim();
            return city === selectedLocation;
        }
        return false;
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-main-0"></div>
            </div>
        );
    }

    return (
        <>
            <section className="hero events-hero bg-[url('/assets/backgrounds/bg-full-screen.png')] bg-cover bg-no-repeat">
                <div className="hero-content pt-20">
                    <h1>Events</h1>
                    <p className="text-xl max-w-3xl">
                        Von lokalen Turnieren bis zu internationalen Wettkämpfen – erlebe die Spannung und Action des
                        Armwrestlings live.
                    </p>
                </div>
            </section>

            {nextEvent && (
                <section className="next-event section-padding" id="next-event">
                    <h2>Unser nächstes Event</h2>
                    <div className="event-details flex flex-col lg:flex-row gap-16">
                        <div className="event-image">
                            <Image
                                src={nextEvent.image_path || "/assets/images/babaevs-cup-event.jpg"}
                                alt={nextEvent.title}
                                width={528}
                                height={300}
                                className="rounded-lg w-full max-w-lg h-auto"
                            />
                        </div>
                        <div className="event-info">
                            <div className="event-date inline-block bg-main-0 text-white text-xl md:text-2xl font-semibold p-2 md:p-4 rounded mb-4">
                                {formatDate(nextEvent.date)}
                            </div>
                            <h2>{nextEvent.title}</h2>
                            <p className="mb-8">{nextEvent.description}</p>
                            <div className="event-highlights">
                                <h3>Wichtige Daten</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-4">
                                        <Image src="/assets/icons/i-sq-dot.svg" alt="" width={20} height={20} />
                                        <span className="text-white">{formatDate(nextEvent.date)}</span>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <Image src="/assets/icons/i-sq-dot.svg" alt="" width={20} height={20} />
                                        <span className="text-white">{nextEvent.location}</span>
                                    </li>
                                    {nextEvent.time && (
                                        <li className="flex items-start gap-4">
                                            <Image src="/assets/icons/i-sq-dot.svg" alt="" width={20} height={20} />
                                            <span className="text-white">{nextEvent.time}</span>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <Link href={`/events/${nextEvent.id}`} className="btn btn-primary mt-8">
                                Details ansehen
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            <section className="upcoming-events section-padding">
                <div className="selector-upcoming-events flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <h3 className="text-3xl text-white mb-4 md:mb-0">Bevorstehende Events</h3>
                    <div className="dropdown-container relative w-full max-w-xs">
                        <button
                            className="dropdown-button w-full text-left p-3 bg-black border border-gray-300 text-white rounded flex justify-between items-center"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            {selectedLocation}
                            <span className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}>▼</span>
                        </button>
                        {dropdownOpen && (
                            <div className="dropdown-content absolute w-full bg-black border border-gray-300 rounded mt-1 max-h-[200px] overflow-y-auto z-10">
                                {locations.map((location) => (
                                    <div
                                        key={location}
                                        className="dropdown-item p-2.5 cursor-pointer text-white hover:bg-gray-900"
                                        onClick={() => {
                                            setSelectedLocation(location);
                                            setDropdownOpen(false);
                                        }}
                                    >
                                        {location}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="event-list grid gap-16 mb-16">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map(event => (
                            <div key={event.id} className="event-item flex flex-col md:flex-row gap-6 md:gap-8 p-6 md:p-8 border border-gray-300 rounded-lg bg-black bg-opacity-40">
                                <Image
                                    src={event.image_path || "/assets/images/event-placeholder.jpg"}
                                    alt={event.title}
                                    width={528}
                                    height={293}
                                    className="rounded w-full md:w-[528px] h-auto object-cover max-w-full"
                                />
                                <div className="event-item-info flex gap-4">
                                    <div className="event-date flex flex-col items-center justify-center bg-main-0 rounded w-16 h-20 p-2">
                                        <span className="month text-sm uppercase text-white">{getMonthName(event.date)}</span>
                                        <span className="day text-2xl font-bold text-white">{getDay(event.date)}</span>
                                    </div>
                                    <div className="event-info-column flex-1">
                                        <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">{event.title}</h3>
                                        <p className="text-base mb-4">{event.description?.substring(0, 120)}...</p>
                                        <div className="h-px bg-gray-400 opacity-30 my-4"></div>
                                        <div className="event-date-text text-main-1 text-base font-semibold mb-1">{formatDate(event.date)}</div>
                                        <div className="event-location text-gray-400 text-base mb-4">{event.location}</div>
                                        <Link href={`/events/${event.id}`} className="btn btn-primary mt-4">
                                            Details ansehen
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-lg">Keine Events gefunden für den gewählten Standort.</p>
                    )}
                </div>
            </section>

            <section className="carousel-section py-16 bg-grey--1 bg-opacity-30">
                <div className="carousel-container mx-auto max-w-7xl px-6 md:px-20">
                    <div className="header text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Impressionen</h1>
                        <p className="text-xl">Erlebe die Atmosphäre vergangener Turniere und Events des SAF.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="carousel-item">
                            <Image
                                src="/assets/images/event-february-bern-cup.png"
                                alt="February Bern Cup Event"
                                width={400}
                                height={300}
                                className="w-full h-auto rounded-lg"
                            />
                        </div>
                        <div className="carousel-item">
                            <Image
                                src="/assets/images/june-geneva-power-clash.png"
                                alt="June Geneva Power Clash"
                                width={400}
                                height={300}
                                className="w-full h-auto rounded-lg"
                            />
                        </div>
                        <div className="carousel-item">
                            <Image
                                src="/assets/images/mar-basel-city-challenge.png"
                                alt="March Basel City Challenge"
                                width={400}
                                height={300}
                                className="w-full h-auto rounded-lg"
                            />
                        </div>
                        <div className="carousel-item">
                            <Image
                                src="/assets/images/swiss-open-2025.png"
                                alt="Swiss Open 2023"
                                width={400}
                                height={300}
                                className="w-full h-auto rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}