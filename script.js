let score = 0; // Startpunktzahl
const scoreDisplay = document.getElementById('score');
const slots = document.querySelectorAll('.slot'); // Alle Felder auf der Seite

// Funktion, um ein Bild an einem zufälligen Slot erscheinen zu lassen
function randomSlot() {
    // Verstecke alle Bilder zuerst
    slots.forEach(slot => {
        const img = slot.querySelector('img');
        if (img && img.style.opacity === '1') {
            img.style.opacity = '0'; // Bild unsichtbar machen, falls noch sichtbar
        }
    });

    // Wähle ein zufälliges Slot (vielleicht nur auf den Bereichen, die den Hügel abdecken)
    const randomIndex = Math.floor(Math.random() * slots.length); // Zufallszahl zwischen 0 und 8
    const randomSlot = slots[randomIndex];

    // Erstelle das Bild (Anfangsbild, z.B. der "Maulwurf")
    const img = document.createElement('img');
    img.src = 'mole.png';  // Bild, das erscheint, wenn der Maulwurf hochkommt
    randomSlot.appendChild(img);
    img.style.opacity = '1';  // Bild sichtbar machen

    // Nach 1 Sekunde verschwindet das Bild wieder, wenn es nicht getroffen wurde
    setTimeout(() => {
        img.style.opacity = '0';
    }, 1000);
}

// Funktion, um Punkte hinzuzufügen, wenn du ein Bild anklickst
function addScore(event) {
    const slot = event.target.closest('.slot'); // Slot herausfinden, der angeklickt wurde
    const img = slot.querySelector('img'); // Bild im Slot

    // Prüfen, ob das Bild sichtbar ist (also der Maulwurf gerade da ist)
    if (img && img.style.opacity === '1') {
        // Das Bild wird zu dem "getroffenen" Bild gewechselt
        img.src = 'hit_mole.png';  // Bild, das erscheint, wenn der Maulwurf getroffen wird
        score++; // Punktzahl erhöhen
        scoreDisplay.textContent = score; // Punktzahl aktualisieren

        // Wende die "Wackel"-Animation auf das Bild an
        img.classList.add('wobble');

        // Nach der Animation (0.5 Sekunden) verschwindet das Bild
        setTimeout(() => {
            img.style.opacity = '0';
        }, 500);
    }
}

// Klick-Event für jedes Slot
slots.forEach(slot => {
    slot.addEventListener('click', addScore);
});

// Alle 1,5 Sekunden erscheint ein Bild an einem zufälligen Slot
setInterval(randomSlot, 1500);