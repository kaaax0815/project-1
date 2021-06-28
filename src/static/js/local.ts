// Starten wenn DOM geladen wurde
document.addEventListener('DOMContentLoaded', function () {
  const element = document.getElementById('tic-tac-toe')!;
  /** Spieler der grad dran ist 0: x; 1: o */
  let current = Math.round(Math.random());
  const players = ['x', 'o'];
  const field = document.createElement('table');
  const caption = document.createElement('caption');
  const labels = [
    ['oben links', 'oben mittig', 'oben rechts'],
    ['Mitte links', 'Mitte mittig', 'Mitte rechts'],
    ['unten links', 'unten mittig', 'unten rechts']
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const messages: any = {
    'o-turn': 'Spieler 🞅 ist am Zug.',
    'x-turn': 'Spieler ✖ ist am Zug.',
    'o-wins': 'Spieler 🞅 gewinnt.',
    'x-wins': 'Spieler ✖ gewinnt.',
    draw: 'Das Spiel endet unentschieden.',
    instructions: 'Zum Spielen bitte abwechselnd in die Spielfelder klicken!',
    select: 'wählen',
    'new game?': 'Neues Spiel?'
  };
  let finished: boolean;
  let b;
  let c;
  let r;
  let tr;

  function check() {
    const tds = field.getElementsByTagName('td');
    let full = true;
    let i;
    let winner; // The Winner

    // alle Felder markiert?
    for (i = 0; i < tds.length; i++) {
      if (tds[i].className == '') {
        full = false;
      }
    }

    // Gewinner ermitteln
    for (i = 0; i < 3; i++) {
      // senkrecht
      if (
        tds[0 + i].className != '' &&
        tds[0 + i].className == tds[3 + i].className &&
        tds[3 + i].className == tds[6 + i].className
      ) {
        // we have a winner!
        winner = tds[0 + i].className;

        highlightCells([tds[i], tds[3 + i], tds[6 + i]]);
      }

      // waagrecht
      if (
        tds[i * 3 + 0].className != '' &&
        tds[i * 3 + 0].className == tds[i * 3 + 1].className &&
        tds[i * 3 + 1].className == tds[i * 3 + 2].className
      ) {
        // we have a winner!
        winner = tds[i * 3].className;

        highlightCells([tds[i * 3], tds[i * 3 + 1], tds[i * 3 + 2]]);
      }
    }

    // diagonal links oben nach rechts unten
    if (
      tds[0].className != '' &&
      tds[0].className == tds[4].className &&
      tds[4].className == tds[8].className
    ) {
      winner = tds[0].className;

      highlightCells([tds[0], tds[4], tds[8]]);
    }

    // diagonal rechts oben nach links unten
    if (
      tds[2].className != '' &&
      tds[2].className == tds[4].className &&
      tds[4].className == tds[6].className
    ) {
      winner = tds[2].className;

      highlightCells([tds[2], tds[4], tds[6]]);
    }

    // Spiel rum? Wenn Sieger or Spiel voll ist
    if (full || winner) {
      finished = true;

      if (winner) {
        caption.innerHTML = messages[players[current] + '-wins'];
      } else {
        caption.innerHTML = messages['draw'];
      }

      // restliche Buttons entfernen
      let buttons: HTMLButtonElement | HTMLCollectionOf<HTMLButtonElement> =
        field.getElementsByTagName('button');

      while (buttons.length) {
        buttons[0].parentNode?.removeChild(buttons[0]);
      }

      // Neues Spiel?
      buttons = document.createElement('button');
      buttons.innerHTML = messages['new game?'];

      caption.appendChild(document.createTextNode(' '));
      caption.appendChild(buttons);

      buttons.addEventListener('click', () => {
        const cells = field.getElementsByTagName('td');
        let button;
        let cell;

        // Spiel zuruücksetzen
        current = Math.round(Math.random());
        finished = false;
        field.removeAttribute('class');

        for (r = 0; r < 3; r++) {
          for (c = 0; c < 3; c++) {
            // Zellen zurücksetzen
            cell = cells[r * 3 + c];
            cell.removeAttribute('class');
            cell.innerHTML = '';

            // Button hinzufügen
            button = document.createElement('button');
            button.innerHTML = labels[r][c] + ' ' + messages['select'];

            cell.appendChild(button);
          }
        }

        // Hinweis hinzufügen
        caption.innerHTML = messages[players[current] + '-turn'];
      });
    }
  }
  /** Zelle weiß hervorheben
   * @param {HTMLTableDataCellElement>[]} cells
   */
  function highlightCells(cells: HTMLTableDataCellElement[]) {
    cells.forEach((node) => {
      const el = document.createElement('strong');

      el.innerHTML = node.innerHTML;

      node.innerHTML = '';
      node.appendChild(el);
      node.classList.add('highlighted');
    });
  }

  /**
   * Clicken verarbeiten
   * @param {MouseEvent} event
   */
  function mark(event: MouseEvent) {
    // Tabellenzelle bestimmen
    let td = <HTMLElement>event.target;

    // Button oder Zelle?
    while (td && td.tagName.toLowerCase() != 'td' && td != field) {
      td = <HTMLElement>td.parentNode;
    }

    // Zelle bei Bedarf markieren
    if (td && !finished && td.tagName.toLowerCase() == 'td' && td.className.length < 1) {
      td.className = players[current]; // Klassennamen vergeben
      // td.innerHTML = players[current];

      check(); // Spiel zuende?

      if (!finished) {
        current = 1 - current; // zwischen 0 und 1 hin- und herschalten

        // Hinweis aktualisieren
        caption.innerHTML = messages[players[current] + '-turn'];
      }
    }
  }

  // Spielanleitung ins Dokument einfügen
  b = document.createElement('p');
  b.innerHTML = messages['instructions'];
  element.appendChild(b);

  // Tabelle ins Dokument einfügen
  element.appendChild(field);

  // Tabelle aufbauen
  field.appendChild(caption); // Beschriftung
  field.appendChild(document.createElement('tbody'));

  // Hinweis einrichten
  caption.innerHTML = messages[players[current] + '-turn'];

  for (r = 0; r < 3; r++) {
    // neue Tabellenzeile
    tr = document.createElement('tr');

    field.lastChild?.appendChild(tr);

    for (c = 0; c < 3; c++) {
      // neue Tabellenzelle
      const td = document.createElement('td');
      td.tabIndex = r == 0 ? r + 1 + c : r == 1 ? r + 2 + c + 1 : r + 4 + c + 1;
      tr.appendChild(td);

      // Klickbutton
      b = document.createElement('button');
      b.innerHTML = labels[r][c] + ' ' + messages['select'];

      tr.lastChild?.appendChild(b);
    }
  }

  // Ereignis bei Tabelle überwachen
  field.addEventListener('click', mark);
});
