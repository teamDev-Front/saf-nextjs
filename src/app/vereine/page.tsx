// app/vereine/page.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Dados dos clubes (em uma aplicação real, isso viria do banco de dados)
const clubs = [
    {
        id: 1,
        name: 'ASC Spartans',
        canton: 'St. Gallen',
        logo: '/assets/logos/asc-spartans-logo.svg',
        address: [
            'ASC Spartans',
            'Rickenkläranlagestrasse 561',
            '8726 Ricken'
        ],
        contact: {
            name: 'Dennis Leuenberger',
            email: 'dennis-l-92@hotmail.com'
        },
        social: {
            instagram: '#',
            facebook: '#',
            youtube: '#'
        }
    },
    {
        id: 2,
        name: 'ASC Grizzlys',
        canton: 'St. Gallen',
        logo: '/assets/logos/asc-spartans-logo.svg',
        address: [
            'ASC Grizzlys',
            'Nauen 88',
            '8638 Goldingen'
        ],
        contact: {
            name: 'Roger Braunwalder',
            email: null
        },
        social: {
            instagram: '#',
            facebook: '#',
            youtube: '#'
        }
    },
    {
        id: 3,
        name: 'Pulling Crew Zürich',
        canton: 'Zürich',
        logo: '/assets/logos/pulling-crew-zurich-logo.svg',
        address: [
            'Pulling Crew Zürich',
            'Stockerstrasse 44',
            '8002 Zürich'
        ],
        contact: {
            name: 'Luca Mastrogiovanni',
            email: 'mastrogiovanni_luca@hotmail.com'
        },
        social: {
            instagram: '#',
            facebook: '#',
            youtube: '#'
        }
    },
    {
        id: 4,
        name: 'ASC Wolf',
        canton: 'Aargau',
        logo: '/assets/logos/asc-spartans-logo.svg',
        address: [
            'ASC Wolf',
            'Huebweg 9b',
            '5235 Rüfenach AG'
        ],
        contact: {
            name: 'Sven Roller',
            email: 'jaecke.tattoo@gmx.ch'
        },
        social: {
            instagram: '#',
            facebook: '#',
            youtube: '#'
        }
    },
    {
        id: 5,
        name: 'L.A.C.',
        canton: 'Thurgau',
        logo: '/assets/logos/asc-spartans-logo.svg',
        address: [
            'L.A.C.',
            'Almensbergstrasse 8',
            '9314 Steinebrunn'
        ],
        contact: {
            name: 'Ivan Sciaroni',
            email: 'loewenarmcrew@gmail.com'
        },
        social: {
            instagram: '#',
            facebook: '#',
            youtube: '#'
        }
    },
    {
        id: 6,
        name: 'Gorillas Arm Wrestling',
        canton: 'Zürich',
        logo: '/assets/logos/asc-spartans-logo.svg',
        address: [
            'Gorillas Arm Wrestling',
            'Dorfstrasse 11',
            '8447 Dachsen'
        ],
        contact: {
            name: 'Patrick Wickli',
            email: 'patrick.wickli@uw-plus.ch'
        },
        social: {
            instagram: '#',
            facebook: '#',
            youtube: '#'
        }
    },
    {
        id: 7,
        name: 'ASC Ajoulot',
        canton: 'Jura',
        logo: '/assets/logos/asc-spartans-logo.svg',
        address: [
            'ASC Ajoulot',
            'Rue Paul-Montavon 2',
            '2950 Courgenay'
        ],
        contact: {
            name: 'Jimmy Lerch',
            email: 'brasdeferajoie@hotmail.ch'
        },
        social: {
            instagram: '#',
            facebook: '#',
            youtube: '#'
        }
    },
    {
        id: 8,
        name: 'ASC Kobra',
        canton: 'Bern',
        logo: '/assets/logos/asc-spartans-logo.svg',
        address: [
            'ASC Kobra',
            'Bielstrasse 32',
            '3053 Münchenbuchsee'
        ],
        contact: {
            name: 'Chrigu Schneiter',
            email: 'asckobra@gmail.com'
        },
        social: {
            instagram: '#',
            facebook: '#',
            youtube: '#'
        }
    },
    {
        id: 9,
        name: 'Underground Armsport',
        canton: 'Basel-Landschaft',
        logo: '/assets/logos/asc-spartans-logo.svg',
        address: [
            'Underground Armsport',
            'Hauptstrasse 57',
            '4451 Wintersingen BL'
        ],
        contact: {
            name: 'Pieter de Vries',
            email: 'pieterdevries.urk@gmail.com'
        },
        social: {
            instagram: '#',
            facebook: '#',
            youtube: '#'
        }
    },
    {
        id: 10,
        name: 'ASC Armpower',
        canton: 'St. Gallen',
        logo: '/assets/logos/asc-spartans-logo.svg',
        address: [
            'ASC Armpower',
            'Gewerbestrasse 3',
            '9445 Rebstein'
        ],
        contact: {
            name: 'Giovanni Mazza',
            email: 'giovanni-mazza@bluewin.ch'
        },
        social: {
            instagram: '#',
            facebook: '#',
            youtube: '#'
        }
    },
    {
        id: 11,
        name: 'Eagel Grip Geneva',
        canton: 'Genf',
        logo: '/assets/logos/asc-spartans-logo.svg',
        address: [
            'Eagel Grip Geneva',
            'Rue Blanche 4',
            '1205 Genf'
        ],
        contact: {
            name: 'Johann Braun',
            email: 'email@johannbraun.com'
        },
        social: {
            instagram: '#',
            facebook: '#',
            youtube: '#'
        }
    }
];

export default function Vereine() {
    const [selectedCanton, setSelectedCanton] = useState('Alle');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const uniqueCantons = new Set<string>();
    clubs.forEach(club => uniqueCantons.add(club.canton));
    const cantons = ['Alle', ...Array.from(uniqueCantons)];

    // Filtrar clubes por cantão
    const filteredClubs = selectedCanton === 'Alle'
        ? clubs
        : clubs.filter(club => club.canton === selectedCanton);

    return (
        <>
            <section className="hero vereine-hero bg-[url('/assets/backgrounds/bg-full-screen.png')] bg-cover bg-no-repeat">
                <div className="hero-content pt-20">
                    <h1>Vereine</h1>
                    <p className="text-xl max-w-3xl">
                        Finde einen Verein in deiner Nähe und werde Teil der Schweizer Armwrestling-Community.
                    </p>
                </div>
                <div className="stats-container flex justify-center gap-16 mt-6">
                    <div className="stat-item flex flex-col items-center text-center">
                        <span className="stat-number text-4xl md:text-6xl font-bold text-white">11</span>
                        <span className="stat-label text-xl font-semibold text-white mt-4">Vereine</span>
                    </div>
                    <div className="stat-item flex flex-col items-center text-center">
                        <span className="stat-number text-4xl md:text-6xl font-bold text-white">100+</span>
                        <span className="stat-label text-xl font-semibold text-white mt-4">Mitglieder</span>
                    </div>
                </div>
            </section>

            <section className="clubs-section py-0 md:py-0 px-6 lg:px-40 pb-20">
                <div className="selector-upcoming-events flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                    <h3 className="text-3xl text-white mb-4 md:mb-0">Alle Schweizer Vereine</h3>
                    <div className="dropdown-container relative w-full max-w-xs">
                        <button
                            className="dropdown-button w-full text-left p-3 bg-black border border-gray-300 text-white rounded flex justify-between items-center"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            {selectedCanton}
                            <span className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}>▼</span>
                        </button>
                        {dropdownOpen && (
                            <div className="dropdown-content absolute w-full bg-black border border-gray-300 rounded mt-1 max-h-[200px] overflow-y-auto z-10">
                                {cantons.map((canton) => (
                                    <div
                                        key={canton}
                                        className="dropdown-item p-2.5 cursor-pointer text-white hover:bg-gray-900"
                                        onClick={() => {
                                            setSelectedCanton(canton);
                                            setDropdownOpen(false);
                                        }}
                                    >
                                        {canton}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="clubs-grid grid grid-cols-1 lg:grid-cols-2 gap-16 2xl:gap-x-48 2xl:gap-y-16">
                    {filteredClubs.map(club => (
                        <article key={club.id} className="club-card flex flex-col md:flex-row gap-8">
                            <div className="club-logo w-full md:w-30 flex flex-col items-center gap-4">
                                <Image src={club.logo} alt={`${club.name} Logo`} width={120} height={120} />
                                <div className="social-links flex gap-4">
                                    <a href={club.social.instagram} className="social-link">
                                        <Image src="/assets/icons/i-insta-red.svg" alt="Instagram" width={20} height={20} />
                                    </a>
                                    <a href={club.social.facebook} className="social-link">
                                        <Image src="/assets/icons/i-facebook-red.svg" alt="Facebook" width={20} height={20} />
                                    </a>
                                    <a href={club.social.youtube} className="social-link">
                                        <Image src="/assets/icons/i-youtube-red.svg" alt="Website" width={20} height={20} />
                                    </a>
                                </div>
                            </div>
                            <div className="club-info flex-1">
                                <div className="club-header mb-8">
                                    <span className="canton-label block text-main-0 text-xl font-semibold leading-8 mb-2">
                                        {club.canton}
                                    </span>
                                    <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                                        {club.name}
                                    </h3>
                                </div>
                                <div className="contact-details flex flex-col gap-4">
                                    <div className="address">
                                        <h4 className="text-gray-400 text-base mb-2">Adresse</h4>
                                        {club.address.map((line, index) => (
                                            <p key={index} className="text-white text-xl font-semibold leading-8 m-0">{line}</p>
                                        ))}
                                    </div>
                                    <div className="contact">
                                        <h4 className="text-gray-400 text-base mb-2">Kontakt</h4>
                                        <p className="text-white text-xl font-semibold leading-8 m-0">{club.contact.name}</p>
                                        {club.contact.email && (
                                            <a href={`mailto:${club.contact.email}`} className="text-white text-xl font-semibold leading-8 underline">
                                                {club.contact.email}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </>
    );
}