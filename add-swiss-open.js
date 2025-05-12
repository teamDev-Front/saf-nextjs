// add-swiss-open.js - Coloque este arquivo na raiz do projeto
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // Verificar se o evento já existe
    const existingEvent = await prisma.event.findFirst({
      where: {
        title: "Swiss Open 2025",
        date: {
          gte: new Date("2025-10-01")
        }
      }
    });

    if (existingEvent) {
      console.log("O evento Swiss Open 2025 já existe com ID:", existingEvent.id);
      
      // Atualizar o evento existente
      const updatedEvent = await prisma.event.update({
        where: { id: existingEvent.id },
        data: {
          date: new Date("2025-10-31T08:00:00"),
          time: "08:00 - 20:00 (31.10) & 08:00 - 20:00 (01.11)",
          location: "Stadthalle Bülach, Almendstrasse 8, 8180 Bülach/Zürich, Switzerland",
          description: "Internationales Armwrestling-Turnier mit Kategorien für alle Altersgruppen und Gewichtsklassen. Das Event ist Teil der East vs. West Qualifikation und bietet Preisgelder für die Senior-Kategorien.",
          image_path: "/assets/images/east-vs-west.jpg", // Usando a imagem que já foi adicionada
          details: `Weight In (Amateur/Disabled/Juniors/Masters):
- Donnerstag, 30.10.2025: 18:00-20:00
- Freitag, 31.10.2025: 08:00-10:00

Weight In (Seniors):
- Freitag, 31.10.2025: 18:00-20:00
- Samstag, 01.11.2025: 08:00-10:00

Wettkampfbeginn:
- Amateur/Disabled/Juniors/Masters: Freitag, 31.10.2025, 11:00
- Seniors: Samstag, 01.11.2025, 11:00

East vs. West:
- Pressekonferenz: Freitag, 31.10.2025, 19:00
- Armfight: Samstag, 01.11.2025, 19:00

Gewichtsklassen:
- Männer Links/Rechts: Disabled (Sitzend/Stehend Open), Amateur (-75, -85, -90, +95 kg), Junior U18 (-75, -90, +90 kg), Junior U23 (-75, -90, +90 kg), Master (-75, -90, +90 kg), Senior (-75, -85, -95, -105, +105 kg)
- Frauen Links/Rechts: Junior U23 (-60, -70, +70 kg), Master Open, Senior (-60, -70, +70 kg)

Preisgelder (Senior-Kategorien):
- Männer: 1. 400€, 2. 200€, 3. 100€
- Frauen: 1. 300€, 2. 150€, 3. 50€

Startgebühr: 30 CHF pro Hand

Kontakt: LOEWENARMCREW@GMAIL.COM`
        }
      });
      
      console.log("Evento atualizado com sucesso!");
      return;
    }

    // Criar novo evento se não existir
    const newEvent = await prisma.event.create({
      data: {
        title: "Swiss Open 2025",
        date: new Date("2025-10-31T08:00:00"),
        time: "08:00 - 20:00 (31.10) & 08:00 - 20:00 (01.11)",
        location: "Stadthalle Bülach, Almendstrasse 8, 8180 Bülach/Zürich, Switzerland",
        description: "Internationales Armwrestling-Turnier mit Kategorien für alle Altersgruppen und Gewichtsklassen. Das Event ist Teil der East vs. West Qualifikation und bietet Preisgelder für die Senior-Kategorien.",
        image_path: "/assets/images/east-vs-west.jpg", // Usando a imagem que já foi adicionada
        details: `Weight In (Amateur/Disabled/Juniors/Masters):
- Donnerstag, 30.10.2025: 18:00-20:00
- Freitag, 31.10.2025: 08:00-10:00

Weight In (Seniors):
- Freitag, 31.10.2025: 18:00-20:00
- Samstag, 01.11.2025: 08:00-10:00

Wettkampfbeginn:
- Amateur/Disabled/Juniors/Masters: Freitag, 31.10.2025, 11:00
- Seniors: Samstag, 01.11.2025, 11:00

East vs. West:
- Pressekonferenz: Freitag, 31.10.2025, 19:00
- Armfight: Samstag, 01.11.2025, 19:00

Gewichtsklassen:
- Männer Links/Rechts: Disabled (Sitzend/Stehend Open), Amateur (-75, -85, -90, +95 kg), Junior U18 (-75, -90, +90 kg), Junior U23 (-75, -90, +90 kg), Master (-75, -90, +90 kg), Senior (-75, -85, -95, -105, +105 kg)
- Frauen Links/Rechts: Junior U23 (-60, -70, +70 kg), Master Open, Senior (-60, -70, +70 kg)

Preisgelder (Senior-Kategorien):
- Männer: 1. 400€, 2. 200€, 3. 100€
- Frauen: 1. 300€, 2. 150€, 3. 50€

Startgebühr: 30 CHF pro Hand

Kontakt: LOEWENARMCREW@GMAIL.COM`
      }
    });
    
    console.log("Novo evento Swiss Open 2025 criado com ID:", newEvent.id);
  } catch (error) {
    console.error("Erro ao adicionar/atualizar evento:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();