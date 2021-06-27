/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*********************************************!*\
  !*** ../Project #1/dist/static/js/local.js ***!
  \*********************************************/

// Starten wenn DOM geladen wurde
document.addEventListener('DOMContentLoaded', function () {
    var _a, _b;
    const element = document.getElementById('tic-tac-toe');
    /** Spieler der grad dran ist 0: x; 1: o */
    let current = 0;
    const players = ['x', 'o'];
    const field = document.createElement('table');
    const caption = document.createElement('caption');
    const labels = [
        ['oben links', 'oben mittig', 'oben rechts'],
        ['Mitte links', 'Mitte mittig', 'Mitte rechts'],
        ['unten links', 'unten mittig', 'unten rechts']
    ];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const messages = {
        'o-turn': 'Spieler O ist am Zug.',
        'x-turn': 'Spieler X ist am Zug.',
        'o-wins': 'Spieler O gewinnt.',
        'x-wins': 'Spieler X gewinnt.',
        draw: 'Das Spiel endet unentschieden.',
        instructions: 'Zum Spielen bitte abwechselnd in die Spielfelder klicken!',
        select: 'wählen',
        'new game?': 'Neues Spiel?'
    };
    let finished;
    let b;
    let c;
    let r;
    let tr;
    function check() {
        var _a;
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
            if (tds[0 + i].className != '' &&
                tds[0 + i].className == tds[3 + i].className &&
                tds[3 + i].className == tds[6 + i].className) {
                // we have a winner!
                winner = tds[0 + i].className;
                highlightCells([tds[i], tds[3 + i], tds[6 + i]]);
            }
            // waagrecht
            if (tds[i * 3 + 0].className != '' &&
                tds[i * 3 + 0].className == tds[i * 3 + 1].className &&
                tds[i * 3 + 1].className == tds[i * 3 + 2].className) {
                // we have a winner!
                winner = tds[i * 3].className;
                highlightCells([tds[i * 3], tds[i * 3 + 1], tds[i * 3 + 2]]);
            }
        }
        // diagonal links oben nach rechts unten
        if (tds[0].className != '' &&
            tds[0].className == tds[4].className &&
            tds[4].className == tds[8].className) {
            winner = tds[0].className;
            highlightCells([tds[0], tds[4], tds[8]]);
        }
        // diagonal rechts oben nach links unten
        if (tds[2].className != '' &&
            tds[2].className == tds[4].className &&
            tds[4].className == tds[6].className) {
            winner = tds[2].className;
            highlightCells([tds[2], tds[4], tds[6]]);
        }
        // Spiel rum? Wenn Sieger or Spiel voll ist
        if (full || winner) {
            finished = true;
            field.className = 'game-over';
            if (winner) {
                caption.innerHTML = messages[players[current] + '-wins'];
            }
            else {
                caption.innerHTML = messages['draw'];
            }
            // restliche Buttons entfernen
            let buttons = field.getElementsByTagName('button');
            while (buttons.length) {
                (_a = buttons[0].parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(buttons[0]);
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
                current = 0;
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
    function highlightCells(cells) {
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
    function mark(event) {
        // Tabellenzelle bestimmen
        let td = event.target;
        // Button oder Zelle?
        while (td && td.tagName.toLowerCase() != 'td' && td != field) {
            td = td.parentNode;
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
        (_a = field.lastChild) === null || _a === void 0 ? void 0 : _a.appendChild(tr);
        for (c = 0; c < 3; c++) {
            // neue Tabellenzelle
            tr.appendChild(document.createElement('td'));
            // Klickbutton
            b = document.createElement('button');
            b.innerHTML = labels[r][c] + ' ' + messages['select'];
            (_b = tr.lastChild) === null || _b === void 0 ? void 0 : _b.appendChild(b);
        }
    }
    // Ereignis bei Tabelle überwachen
    field.addEventListener('click', mark);
});
//# sourceMappingURL=local.js.map
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aWN0YWN0b2UvLi4vUHJvamVjdFx1MDAwMCMxL2Rpc3Qvc3RhdGljL2pzL2xvY2FsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0EsbUJBQW1CLGdCQUFnQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE9BQU87QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixPQUFPO0FBQ2xDLCtCQUErQixPQUFPO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxlQUFlLDRCQUE0QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGVBQWUsV0FBVztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBLG9CQUFvQjtBQUNwQjtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixPQUFPO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELGlDIiwiZmlsZSI6ImxvY2FsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBTdGFydGVuIHdlbm4gRE9NIGdlbGFkZW4gd3VyZGVcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpYy10YWMtdG9lJyk7XG4gICAgLyoqIFNwaWVsZXIgZGVyIGdyYWQgZHJhbiBpc3QgMDogeDsgMTogbyAqL1xuICAgIGxldCBjdXJyZW50ID0gMDtcbiAgICBjb25zdCBwbGF5ZXJzID0gWyd4JywgJ28nXTtcbiAgICBjb25zdCBmaWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJyk7XG4gICAgY29uc3QgY2FwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhcHRpb24nKTtcbiAgICBjb25zdCBsYWJlbHMgPSBbXG4gICAgICAgIFsnb2JlbiBsaW5rcycsICdvYmVuIG1pdHRpZycsICdvYmVuIHJlY2h0cyddLFxuICAgICAgICBbJ01pdHRlIGxpbmtzJywgJ01pdHRlIG1pdHRpZycsICdNaXR0ZSByZWNodHMnXSxcbiAgICAgICAgWyd1bnRlbiBsaW5rcycsICd1bnRlbiBtaXR0aWcnLCAndW50ZW4gcmVjaHRzJ11cbiAgICBdO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgY29uc3QgbWVzc2FnZXMgPSB7XG4gICAgICAgICdvLXR1cm4nOiAnU3BpZWxlciBPIGlzdCBhbSBadWcuJyxcbiAgICAgICAgJ3gtdHVybic6ICdTcGllbGVyIFggaXN0IGFtIFp1Zy4nLFxuICAgICAgICAnby13aW5zJzogJ1NwaWVsZXIgTyBnZXdpbm50LicsXG4gICAgICAgICd4LXdpbnMnOiAnU3BpZWxlciBYIGdld2lubnQuJyxcbiAgICAgICAgZHJhdzogJ0RhcyBTcGllbCBlbmRldCB1bmVudHNjaGllZGVuLicsXG4gICAgICAgIGluc3RydWN0aW9uczogJ1p1bSBTcGllbGVuIGJpdHRlIGFid2VjaHNlbG5kIGluIGRpZSBTcGllbGZlbGRlciBrbGlja2VuIScsXG4gICAgICAgIHNlbGVjdDogJ3fDpGhsZW4nLFxuICAgICAgICAnbmV3IGdhbWU/JzogJ05ldWVzIFNwaWVsPydcbiAgICB9O1xuICAgIGxldCBmaW5pc2hlZDtcbiAgICBsZXQgYjtcbiAgICBsZXQgYztcbiAgICBsZXQgcjtcbiAgICBsZXQgdHI7XG4gICAgZnVuY3Rpb24gY2hlY2soKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgdGRzID0gZmllbGQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RkJyk7XG4gICAgICAgIGxldCBmdWxsID0gdHJ1ZTtcbiAgICAgICAgbGV0IGk7XG4gICAgICAgIGxldCB3aW5uZXI7IC8vIFRoZSBXaW5uZXJcbiAgICAgICAgLy8gYWxsZSBGZWxkZXIgbWFya2llcnQ/XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0ZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0ZHNbaV0uY2xhc3NOYW1lID09ICcnKSB7XG4gICAgICAgICAgICAgICAgZnVsbCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIEdld2lubmVyIGVybWl0dGVsblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICAvLyBzZW5rcmVjaHRcbiAgICAgICAgICAgIGlmICh0ZHNbMCArIGldLmNsYXNzTmFtZSAhPSAnJyAmJlxuICAgICAgICAgICAgICAgIHRkc1swICsgaV0uY2xhc3NOYW1lID09IHRkc1szICsgaV0uY2xhc3NOYW1lICYmXG4gICAgICAgICAgICAgICAgdGRzWzMgKyBpXS5jbGFzc05hbWUgPT0gdGRzWzYgKyBpXS5jbGFzc05hbWUpIHtcbiAgICAgICAgICAgICAgICAvLyB3ZSBoYXZlIGEgd2lubmVyIVxuICAgICAgICAgICAgICAgIHdpbm5lciA9IHRkc1swICsgaV0uY2xhc3NOYW1lO1xuICAgICAgICAgICAgICAgIGhpZ2hsaWdodENlbGxzKFt0ZHNbaV0sIHRkc1szICsgaV0sIHRkc1s2ICsgaV1dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHdhYWdyZWNodFxuICAgICAgICAgICAgaWYgKHRkc1tpICogMyArIDBdLmNsYXNzTmFtZSAhPSAnJyAmJlxuICAgICAgICAgICAgICAgIHRkc1tpICogMyArIDBdLmNsYXNzTmFtZSA9PSB0ZHNbaSAqIDMgKyAxXS5jbGFzc05hbWUgJiZcbiAgICAgICAgICAgICAgICB0ZHNbaSAqIDMgKyAxXS5jbGFzc05hbWUgPT0gdGRzW2kgKiAzICsgMl0uY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICAgICAgLy8gd2UgaGF2ZSBhIHdpbm5lciFcbiAgICAgICAgICAgICAgICB3aW5uZXIgPSB0ZHNbaSAqIDNdLmNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICBoaWdobGlnaHRDZWxscyhbdGRzW2kgKiAzXSwgdGRzW2kgKiAzICsgMV0sIHRkc1tpICogMyArIDJdXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gZGlhZ29uYWwgbGlua3Mgb2JlbiBuYWNoIHJlY2h0cyB1bnRlblxuICAgICAgICBpZiAodGRzWzBdLmNsYXNzTmFtZSAhPSAnJyAmJlxuICAgICAgICAgICAgdGRzWzBdLmNsYXNzTmFtZSA9PSB0ZHNbNF0uY2xhc3NOYW1lICYmXG4gICAgICAgICAgICB0ZHNbNF0uY2xhc3NOYW1lID09IHRkc1s4XS5jbGFzc05hbWUpIHtcbiAgICAgICAgICAgIHdpbm5lciA9IHRkc1swXS5jbGFzc05hbWU7XG4gICAgICAgICAgICBoaWdobGlnaHRDZWxscyhbdGRzWzBdLCB0ZHNbNF0sIHRkc1s4XV0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGRpYWdvbmFsIHJlY2h0cyBvYmVuIG5hY2ggbGlua3MgdW50ZW5cbiAgICAgICAgaWYgKHRkc1syXS5jbGFzc05hbWUgIT0gJycgJiZcbiAgICAgICAgICAgIHRkc1syXS5jbGFzc05hbWUgPT0gdGRzWzRdLmNsYXNzTmFtZSAmJlxuICAgICAgICAgICAgdGRzWzRdLmNsYXNzTmFtZSA9PSB0ZHNbNl0uY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICB3aW5uZXIgPSB0ZHNbMl0uY2xhc3NOYW1lO1xuICAgICAgICAgICAgaGlnaGxpZ2h0Q2VsbHMoW3Rkc1syXSwgdGRzWzRdLCB0ZHNbNl1dKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTcGllbCBydW0/IFdlbm4gU2llZ2VyIG9yIFNwaWVsIHZvbGwgaXN0XG4gICAgICAgIGlmIChmdWxsIHx8IHdpbm5lcikge1xuICAgICAgICAgICAgZmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgZmllbGQuY2xhc3NOYW1lID0gJ2dhbWUtb3Zlcic7XG4gICAgICAgICAgICBpZiAod2lubmVyKSB7XG4gICAgICAgICAgICAgICAgY2FwdGlvbi5pbm5lckhUTUwgPSBtZXNzYWdlc1twbGF5ZXJzW2N1cnJlbnRdICsgJy13aW5zJ107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYXB0aW9uLmlubmVySFRNTCA9IG1lc3NhZ2VzWydkcmF3J107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyByZXN0bGljaGUgQnV0dG9ucyBlbnRmZXJuZW5cbiAgICAgICAgICAgIGxldCBidXR0b25zID0gZmllbGQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2J1dHRvbicpO1xuICAgICAgICAgICAgd2hpbGUgKGJ1dHRvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgKF9hID0gYnV0dG9uc1swXS5wYXJlbnROb2RlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVtb3ZlQ2hpbGQoYnV0dG9uc1swXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBOZXVlcyBTcGllbD9cbiAgICAgICAgICAgIGJ1dHRvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIGJ1dHRvbnMuaW5uZXJIVE1MID0gbWVzc2FnZXNbJ25ldyBnYW1lPyddO1xuICAgICAgICAgICAgY2FwdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnICcpKTtcbiAgICAgICAgICAgIGNhcHRpb24uYXBwZW5kQ2hpbGQoYnV0dG9ucyk7XG4gICAgICAgICAgICBidXR0b25zLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGxzID0gZmllbGQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RkJyk7XG4gICAgICAgICAgICAgICAgbGV0IGJ1dHRvbjtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbDtcbiAgICAgICAgICAgICAgICAvLyBTcGllbCB6dXJ1w7xja3NldHplblxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSAwO1xuICAgICAgICAgICAgICAgIGZpbmlzaGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZmllbGQucmVtb3ZlQXR0cmlidXRlKCdjbGFzcycpO1xuICAgICAgICAgICAgICAgIGZvciAociA9IDA7IHIgPCAzOyByKyspIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjID0gMDsgYyA8IDM7IGMrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gWmVsbGVuIHp1csO8Y2tzZXR6ZW5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwgPSBjZWxsc1tyICogMyArIGNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbC5yZW1vdmVBdHRyaWJ1dGUoJ2NsYXNzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQnV0dG9uIGhpbnp1ZsO8Z2VuXG4gICAgICAgICAgICAgICAgICAgICAgICBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBsYWJlbHNbcl1bY10gKyAnICcgKyBtZXNzYWdlc1snc2VsZWN0J107XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gSGlud2VpcyBoaW56dWbDvGdlblxuICAgICAgICAgICAgICAgIGNhcHRpb24uaW5uZXJIVE1MID0gbWVzc2FnZXNbcGxheWVyc1tjdXJyZW50XSArICctdHVybiddO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqIFplbGxlIHdlacOfIGhlcnZvcmhlYmVuXG4gICAgICogQHBhcmFtIHtIVE1MVGFibGVEYXRhQ2VsbEVsZW1lbnQ+W119IGNlbGxzXG4gICAgICovXG4gICAgZnVuY3Rpb24gaGlnaGxpZ2h0Q2VsbHMoY2VsbHMpIHtcbiAgICAgICAgY2VsbHMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHJvbmcnKTtcbiAgICAgICAgICAgIGVsLmlubmVySFRNTCA9IG5vZGUuaW5uZXJIVE1MO1xuICAgICAgICAgICAgbm9kZS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQoZWwpO1xuICAgICAgICAgICAgbm9kZS5jbGFzc0xpc3QuYWRkKCdoaWdobGlnaHRlZCcpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xpY2tlbiB2ZXJhcmJlaXRlblxuICAgICAqIEBwYXJhbSB7TW91c2VFdmVudH0gZXZlbnRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBtYXJrKGV2ZW50KSB7XG4gICAgICAgIC8vIFRhYmVsbGVuemVsbGUgYmVzdGltbWVuXG4gICAgICAgIGxldCB0ZCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgLy8gQnV0dG9uIG9kZXIgWmVsbGU/XG4gICAgICAgIHdoaWxlICh0ZCAmJiB0ZC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT0gJ3RkJyAmJiB0ZCAhPSBmaWVsZCkge1xuICAgICAgICAgICAgdGQgPSB0ZC5wYXJlbnROb2RlO1xuICAgICAgICB9XG4gICAgICAgIC8vIFplbGxlIGJlaSBCZWRhcmYgbWFya2llcmVuXG4gICAgICAgIGlmICh0ZCAmJiAhZmluaXNoZWQgJiYgdGQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09ICd0ZCcgJiYgdGQuY2xhc3NOYW1lLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHRkLmNsYXNzTmFtZSA9IHBsYXllcnNbY3VycmVudF07IC8vIEtsYXNzZW5uYW1lbiB2ZXJnZWJlblxuICAgICAgICAgICAgLy8gdGQuaW5uZXJIVE1MID0gcGxheWVyc1tjdXJyZW50XTtcbiAgICAgICAgICAgIGNoZWNrKCk7IC8vIFNwaWVsIHp1ZW5kZT9cbiAgICAgICAgICAgIGlmICghZmluaXNoZWQpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gMSAtIGN1cnJlbnQ7IC8vIHp3aXNjaGVuIDAgdW5kIDEgaGluLSB1bmQgaGVyc2NoYWx0ZW5cbiAgICAgICAgICAgICAgICAvLyBIaW53ZWlzIGFrdHVhbGlzaWVyZW5cbiAgICAgICAgICAgICAgICBjYXB0aW9uLmlubmVySFRNTCA9IG1lc3NhZ2VzW3BsYXllcnNbY3VycmVudF0gKyAnLXR1cm4nXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBTcGllbGFubGVpdHVuZyBpbnMgRG9rdW1lbnQgZWluZsO8Z2VuXG4gICAgYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBiLmlubmVySFRNTCA9IG1lc3NhZ2VzWydpbnN0cnVjdGlvbnMnXTtcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGIpO1xuICAgIC8vIFRhYmVsbGUgaW5zIERva3VtZW50IGVpbmbDvGdlblxuICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoZmllbGQpO1xuICAgIC8vIFRhYmVsbGUgYXVmYmF1ZW5cbiAgICBmaWVsZC5hcHBlbmRDaGlsZChjYXB0aW9uKTsgLy8gQmVzY2hyaWZ0dW5nXG4gICAgZmllbGQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGJvZHknKSk7XG4gICAgLy8gSGlud2VpcyBlaW5yaWNodGVuXG4gICAgY2FwdGlvbi5pbm5lckhUTUwgPSBtZXNzYWdlc1twbGF5ZXJzW2N1cnJlbnRdICsgJy10dXJuJ107XG4gICAgZm9yIChyID0gMDsgciA8IDM7IHIrKykge1xuICAgICAgICAvLyBuZXVlIFRhYmVsbGVuemVpbGVcbiAgICAgICAgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuICAgICAgICAoX2EgPSBmaWVsZC5sYXN0Q2hpbGQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hcHBlbmRDaGlsZCh0cik7XG4gICAgICAgIGZvciAoYyA9IDA7IGMgPCAzOyBjKyspIHtcbiAgICAgICAgICAgIC8vIG5ldWUgVGFiZWxsZW56ZWxsZVxuICAgICAgICAgICAgdHIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7XG4gICAgICAgICAgICAvLyBLbGlja2J1dHRvblxuICAgICAgICAgICAgYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgYi5pbm5lckhUTUwgPSBsYWJlbHNbcl1bY10gKyAnICcgKyBtZXNzYWdlc1snc2VsZWN0J107XG4gICAgICAgICAgICAoX2IgPSB0ci5sYXN0Q2hpbGQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5hcHBlbmRDaGlsZChiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBFcmVpZ25pcyBiZWkgVGFiZWxsZSDDvGJlcndhY2hlblxuICAgIGZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbWFyayk7XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxvY2FsLmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=