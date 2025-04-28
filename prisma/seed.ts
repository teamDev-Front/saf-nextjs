// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Verificar se já existem eventos
  const existingEvents = await prisma.event.count();
  if (existingEvents > 0) {
    console.log('Eventos já existem. Pulando seed.');
    return;
  }

  // Criar eventos
  const eventsData = [
    {
      title: "Babaevs Cup",
      date: new Date("2025-04-26T12:30:00").toISOString(),
      time: "12:30 - 19:00",
      location: "Kornhaus, Friedrichhafnerstrasse 54, 8590 Romanshorn",
      description: "Internationales Armwrestling-Turnier mit Kategorien für alle Altersgruppen und Gewichtsklassen. Spannende Duelle für Junioren, Amateure, Profis und einen offenen Bereich für Teilnehmer mit Behinderungen.",
      image_path: "/assets/images/babaevs-cup-event.jpg",
      details: "Weigh-In: Freitag, 25.04. (19:00-21:00) & Samstag, 26.04. (09:00-11:00)\nTeilnahmegebühr: 20 Euro pro Hand",
    },
    {
      title: "East vs West World Qualifier Finals",
      date: new Date("2025-05-10T12:00:00").toISOString(),
      time: "Ganztägig",
      location: "The Green Park Pendik Hotel & Convention Center, Istanbul, Türkei",
      description: "Qualifikationsfinale für die Weltmeisterschaft mit Gewichtsklassen für Männer und Frauen. Die besten Armwrestler kämpfen um die Teilnahme am Finale.",
      image_path: "/assets/images/babaevs-cup-event-2.jpg",
      details: "Internationale Qualifikation\nGewichtsklassen für Männer und Frauen"
    },
    {
      title: "Taurus Armwrestling Cup",
      date: new Date("2025-06-14T10:00:00").toISOString(),
      time: "10:00 - 18:00",
      location: "Rock City, Spitalweidstrasse 2, 4665 Offtringen",
      description: "Der Taurus Cup in Offtringen bietet Kategorien für Junioren, Amateure und Profis – eine perfekte Gelegenheit, deine Kräfte zu messen.",
      image_path: "/assets/images/taurus-armwrestling-cup.jpg",
      details: "Kategorien:\n- Junioren\n- Amateure\n- Profis"
    },
    {
      title: "Bern Armwrestling Cup",
      date: new Date("2025-02-20T13:00:00").toISOString(),
      time: "13:00 - 20:00",
      location: "Wankdorfhalle, Papiermühlestr. 91, 3014 Bern",
      description: "Armwrestling live in Bern! Sei dabei, wenn die besten Athleten der Region um den Cup kämpfen.",
      image_path: "/assets/images/event-february-bern-cup.png",
      details: "Regionaler Wettkampf\nBeste Athleten aus Bern und Umgebung"
    },
    {
      title: "Basel City Challenge",
      date: new Date("2025-03-08T11:00:00").toISOString(),
      time: "11:00 - 19:00",
      location: "Eventhalle, Messeplatz 21, 4058 Basel",
      description: "Ein Wettkampf für Amateure und Profis – zeige deine Kraft bei der Basel City Challenge.",
      image_path: "/assets/images/mar-basel-city-challenge.png",
      details: "Offene Kategorien\nAmateure und Profis willkommen"
    },
    {
      title: "Geneva Power Clash",
      date: new Date("2025-06-16T12:00:00").toISOString(),
      time: "12:00 - 20:00",
      location: "Palexpo, Route François 30, 1205 Genève",
      description: "Ein hochkarätiges Turnier mit internationaler Besetzung – die Geneva Power Clash ist ein Muss für Armwrestling-Fans.",
      image_path: "/assets/images/june-geneva-power-clash.png",
      details: "Internationales Turnier\nTop-Athleten aus verschiedenen Ländern"
    },
    {
      title: "Swiss Open 2025",
      date: new Date("2025-09-14T10:00:00").toISOString(),
      time: "10:00 - 22:00",
      location: "Eventhalle, Kornstr. 12, 9000 St. Gallen",
      description: "Das Swiss Open vereint Armwrestler aus ganz Europa – kämpfe um den Titel oder geniesse als Zuschauer die packenden Duelle.",
      image_path: "/assets/images/swiss-open-2025.png",
      details: "Nationale Meisterschaft\nOffene Kategorien\nPreisgelder für Top-Platzierungen"
    }
  ];

  // Inserir eventos no banco de dados
  for (const eventData of eventsData) {
    await prisma.event.create({
      data: eventData
    });
  }

  console.log('Eventos criados com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro ao popular eventos:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });