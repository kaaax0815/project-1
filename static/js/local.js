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
    const messages = {
        'o-turn': 'Spieler ๐ ist am Zug.',
        'x-turn': 'Spieler โ ist am Zug.',
        'o-wins': 'Spieler ๐ gewinnt.',
        'x-wins': 'Spieler โ gewinnt.',
        draw: 'Das Spiel endet unentschieden.',
        instructions: 'Zum Spielen bitte abwechselnd in die Spielfelder klicken!',
        select: 'wรคhlen',
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
                // Spiel zuruรผcksetzen
                current = Math.round(Math.random());
                finished = false;
                field.removeAttribute('class');
                for (r = 0; r < 3; r++) {
                    for (c = 0; c < 3; c++) {
                        // Zellen zurรผcksetzen
                        cell = cells[r * 3 + c];
                        cell.removeAttribute('class');
                        cell.innerHTML = '';
                        // Button hinzufรผgen
                        button = document.createElement('button');
                        button.innerHTML = labels[r][c] + ' ' + messages['select'];
                        cell.appendChild(button);
                    }
                }
                // Hinweis hinzufรผgen
                caption.innerHTML = messages[players[current] + '-turn'];
            });
        }
    }
    /** Zelle weiร hervorheben
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
    // Spielanleitung ins Dokument einfรผgen
    b = document.createElement('p');
    b.innerHTML = messages['instructions'];
    element.appendChild(b);
    // Tabelle ins Dokument einfรผgen
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
            const td = document.createElement('td');
            td.tabIndex = r == 0 ? r + 1 + c : r == 1 ? r + 2 + c + 1 : r + 4 + c + 1;
            tr.appendChild(td);
            // Klickbutton
            b = document.createElement('button');
            b.innerHTML = labels[r][c] + ' ' + messages['select'];
            (_b = tr.lastChild) === null || _b === void 0 ? void 0 : _b.appendChild(b);
        }
    }
    // Ereignis bei Tabelle รผberwachen
    field.addEventListener('click', mark);
});
//# sourceMappingURL=local.js.map
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aWN0YWN0b2UvLi4vUHJvamVjdFx1MDAwMCMxL2Rpc3Qvc3RhdGljL2pzL2xvY2FsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0EsbUJBQW1CLGdCQUFnQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE9BQU87QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsT0FBTztBQUNsQywrQkFBK0IsT0FBTztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsZUFBZSw0QkFBNEI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxlQUFlLFdBQVc7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsT0FBTztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsaUMiLCJmaWxlIjoibG9jYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbi8vIFN0YXJ0ZW4gd2VubiBET00gZ2VsYWRlbiB3dXJkZVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGljLXRhYy10b2UnKTtcbiAgICAvKiogU3BpZWxlciBkZXIgZ3JhZCBkcmFuIGlzdCAwOiB4OyAxOiBvICovXG4gICAgbGV0IGN1cnJlbnQgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpO1xuICAgIGNvbnN0IHBsYXllcnMgPSBbJ3gnLCAnbyddO1xuICAgIGNvbnN0IGZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKTtcbiAgICBjb25zdCBjYXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FwdGlvbicpO1xuICAgIGNvbnN0IGxhYmVscyA9IFtcbiAgICAgICAgWydvYmVuIGxpbmtzJywgJ29iZW4gbWl0dGlnJywgJ29iZW4gcmVjaHRzJ10sXG4gICAgICAgIFsnTWl0dGUgbGlua3MnLCAnTWl0dGUgbWl0dGlnJywgJ01pdHRlIHJlY2h0cyddLFxuICAgICAgICBbJ3VudGVuIGxpbmtzJywgJ3VudGVuIG1pdHRpZycsICd1bnRlbiByZWNodHMnXVxuICAgIF07XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBjb25zdCBtZXNzYWdlcyA9IHtcbiAgICAgICAgJ28tdHVybic6ICdTcGllbGVyIPCfnoUgaXN0IGFtIFp1Zy4nLFxuICAgICAgICAneC10dXJuJzogJ1NwaWVsZXIg4pyWIGlzdCBhbSBadWcuJyxcbiAgICAgICAgJ28td2lucyc6ICdTcGllbGVyIPCfnoUgZ2V3aW5udC4nLFxuICAgICAgICAneC13aW5zJzogJ1NwaWVsZXIg4pyWIGdld2lubnQuJyxcbiAgICAgICAgZHJhdzogJ0RhcyBTcGllbCBlbmRldCB1bmVudHNjaGllZGVuLicsXG4gICAgICAgIGluc3RydWN0aW9uczogJ1p1bSBTcGllbGVuIGJpdHRlIGFid2VjaHNlbG5kIGluIGRpZSBTcGllbGZlbGRlciBrbGlja2VuIScsXG4gICAgICAgIHNlbGVjdDogJ3fDpGhsZW4nLFxuICAgICAgICAnbmV3IGdhbWU/JzogJ05ldWVzIFNwaWVsPydcbiAgICB9O1xuICAgIGxldCBmaW5pc2hlZDtcbiAgICBsZXQgYjtcbiAgICBsZXQgYztcbiAgICBsZXQgcjtcbiAgICBsZXQgdHI7XG4gICAgZnVuY3Rpb24gY2hlY2soKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgdGRzID0gZmllbGQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RkJyk7XG4gICAgICAgIGxldCBmdWxsID0gdHJ1ZTtcbiAgICAgICAgbGV0IGk7XG4gICAgICAgIGxldCB3aW5uZXI7IC8vIFRoZSBXaW5uZXJcbiAgICAgICAgLy8gYWxsZSBGZWxkZXIgbWFya2llcnQ/XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0ZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0ZHNbaV0uY2xhc3NOYW1lID09ICcnKSB7XG4gICAgICAgICAgICAgICAgZnVsbCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIEdld2lubmVyIGVybWl0dGVsblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICAvLyBzZW5rcmVjaHRcbiAgICAgICAgICAgIGlmICh0ZHNbMCArIGldLmNsYXNzTmFtZSAhPSAnJyAmJlxuICAgICAgICAgICAgICAgIHRkc1swICsgaV0uY2xhc3NOYW1lID09IHRkc1szICsgaV0uY2xhc3NOYW1lICYmXG4gICAgICAgICAgICAgICAgdGRzWzMgKyBpXS5jbGFzc05hbWUgPT0gdGRzWzYgKyBpXS5jbGFzc05hbWUpIHtcbiAgICAgICAgICAgICAgICAvLyB3ZSBoYXZlIGEgd2lubmVyIVxuICAgICAgICAgICAgICAgIHdpbm5lciA9IHRkc1swICsgaV0uY2xhc3NOYW1lO1xuICAgICAgICAgICAgICAgIGhpZ2hsaWdodENlbGxzKFt0ZHNbaV0sIHRkc1szICsgaV0sIHRkc1s2ICsgaV1dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHdhYWdyZWNodFxuICAgICAgICAgICAgaWYgKHRkc1tpICogMyArIDBdLmNsYXNzTmFtZSAhPSAnJyAmJlxuICAgICAgICAgICAgICAgIHRkc1tpICogMyArIDBdLmNsYXNzTmFtZSA9PSB0ZHNbaSAqIDMgKyAxXS5jbGFzc05hbWUgJiZcbiAgICAgICAgICAgICAgICB0ZHNbaSAqIDMgKyAxXS5jbGFzc05hbWUgPT0gdGRzW2kgKiAzICsgMl0uY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICAgICAgLy8gd2UgaGF2ZSBhIHdpbm5lciFcbiAgICAgICAgICAgICAgICB3aW5uZXIgPSB0ZHNbaSAqIDNdLmNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICBoaWdobGlnaHRDZWxscyhbdGRzW2kgKiAzXSwgdGRzW2kgKiAzICsgMV0sIHRkc1tpICogMyArIDJdXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gZGlhZ29uYWwgbGlua3Mgb2JlbiBuYWNoIHJlY2h0cyB1bnRlblxuICAgICAgICBpZiAodGRzWzBdLmNsYXNzTmFtZSAhPSAnJyAmJlxuICAgICAgICAgICAgdGRzWzBdLmNsYXNzTmFtZSA9PSB0ZHNbNF0uY2xhc3NOYW1lICYmXG4gICAgICAgICAgICB0ZHNbNF0uY2xhc3NOYW1lID09IHRkc1s4XS5jbGFzc05hbWUpIHtcbiAgICAgICAgICAgIHdpbm5lciA9IHRkc1swXS5jbGFzc05hbWU7XG4gICAgICAgICAgICBoaWdobGlnaHRDZWxscyhbdGRzWzBdLCB0ZHNbNF0sIHRkc1s4XV0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGRpYWdvbmFsIHJlY2h0cyBvYmVuIG5hY2ggbGlua3MgdW50ZW5cbiAgICAgICAgaWYgKHRkc1syXS5jbGFzc05hbWUgIT0gJycgJiZcbiAgICAgICAgICAgIHRkc1syXS5jbGFzc05hbWUgPT0gdGRzWzRdLmNsYXNzTmFtZSAmJlxuICAgICAgICAgICAgdGRzWzRdLmNsYXNzTmFtZSA9PSB0ZHNbNl0uY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICB3aW5uZXIgPSB0ZHNbMl0uY2xhc3NOYW1lO1xuICAgICAgICAgICAgaGlnaGxpZ2h0Q2VsbHMoW3Rkc1syXSwgdGRzWzRdLCB0ZHNbNl1dKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTcGllbCBydW0/IFdlbm4gU2llZ2VyIG9yIFNwaWVsIHZvbGwgaXN0XG4gICAgICAgIGlmIChmdWxsIHx8IHdpbm5lcikge1xuICAgICAgICAgICAgZmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHdpbm5lcikge1xuICAgICAgICAgICAgICAgIGNhcHRpb24uaW5uZXJIVE1MID0gbWVzc2FnZXNbcGxheWVyc1tjdXJyZW50XSArICctd2lucyddO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FwdGlvbi5pbm5lckhUTUwgPSBtZXNzYWdlc1snZHJhdyddO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gcmVzdGxpY2hlIEJ1dHRvbnMgZW50ZmVybmVuXG4gICAgICAgICAgICBsZXQgYnV0dG9ucyA9IGZpZWxkLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdidXR0b24nKTtcbiAgICAgICAgICAgIHdoaWxlIChidXR0b25zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIChfYSA9IGJ1dHRvbnNbMF0ucGFyZW50Tm9kZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlbW92ZUNoaWxkKGJ1dHRvbnNbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gTmV1ZXMgU3BpZWw/XG4gICAgICAgICAgICBidXR0b25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBidXR0b25zLmlubmVySFRNTCA9IG1lc3NhZ2VzWyduZXcgZ2FtZT8nXTtcbiAgICAgICAgICAgIGNhcHRpb24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJyAnKSk7XG4gICAgICAgICAgICBjYXB0aW9uLmFwcGVuZENoaWxkKGJ1dHRvbnMpO1xuICAgICAgICAgICAgYnV0dG9ucy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxscyA9IGZpZWxkLmdldEVsZW1lbnRzQnlUYWdOYW1lKCd0ZCcpO1xuICAgICAgICAgICAgICAgIGxldCBidXR0b247XG4gICAgICAgICAgICAgICAgbGV0IGNlbGw7XG4gICAgICAgICAgICAgICAgLy8gU3BpZWwgenVydcO8Y2tzZXR6ZW5cbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKTtcbiAgICAgICAgICAgICAgICBmaW5pc2hlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGZpZWxkLnJlbW92ZUF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgICAgICAgICAgICAgICBmb3IgKHIgPSAwOyByIDwgMzsgcisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoYyA9IDA7IGMgPCAzOyBjKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFplbGxlbiB6dXLDvGNrc2V0emVuXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsID0gY2VsbHNbciAqIDMgKyBjXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwucmVtb3ZlQXR0cmlidXRlKCdjbGFzcycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJ1dHRvbiBoaW56dWbDvGdlblxuICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBidXR0b24uaW5uZXJIVE1MID0gbGFiZWxzW3JdW2NdICsgJyAnICsgbWVzc2FnZXNbJ3NlbGVjdCddO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbC5hcHBlbmRDaGlsZChidXR0b24pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIEhpbndlaXMgaGluenVmw7xnZW5cbiAgICAgICAgICAgICAgICBjYXB0aW9uLmlubmVySFRNTCA9IG1lc3NhZ2VzW3BsYXllcnNbY3VycmVudF0gKyAnLXR1cm4nXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKiBaZWxsZSB3ZWnDnyBoZXJ2b3JoZWJlblxuICAgICAqIEBwYXJhbSB7SFRNTFRhYmxlRGF0YUNlbGxFbGVtZW50PltdfSBjZWxsc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGhpZ2hsaWdodENlbGxzKGNlbGxzKSB7XG4gICAgICAgIGNlbGxzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3Ryb25nJyk7XG4gICAgICAgICAgICBlbC5pbm5lckhUTUwgPSBub2RlLmlubmVySFRNTDtcbiAgICAgICAgICAgIG5vZGUuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKGVsKTtcbiAgICAgICAgICAgIG5vZGUuY2xhc3NMaXN0LmFkZCgnaGlnaGxpZ2h0ZWQnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsaWNrZW4gdmVyYXJiZWl0ZW5cbiAgICAgKiBAcGFyYW0ge01vdXNlRXZlbnR9IGV2ZW50XG4gICAgICovXG4gICAgZnVuY3Rpb24gbWFyayhldmVudCkge1xuICAgICAgICAvLyBUYWJlbGxlbnplbGxlIGJlc3RpbW1lblxuICAgICAgICBsZXQgdGQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIC8vIEJ1dHRvbiBvZGVyIFplbGxlP1xuICAgICAgICB3aGlsZSAodGQgJiYgdGQudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9ICd0ZCcgJiYgdGQgIT0gZmllbGQpIHtcbiAgICAgICAgICAgIHRkID0gdGQucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBaZWxsZSBiZWkgQmVkYXJmIG1hcmtpZXJlblxuICAgICAgICBpZiAodGQgJiYgIWZpbmlzaGVkICYmIHRkLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PSAndGQnICYmIHRkLmNsYXNzTmFtZS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICB0ZC5jbGFzc05hbWUgPSBwbGF5ZXJzW2N1cnJlbnRdOyAvLyBLbGFzc2VubmFtZW4gdmVyZ2ViZW5cbiAgICAgICAgICAgIC8vIHRkLmlubmVySFRNTCA9IHBsYXllcnNbY3VycmVudF07XG4gICAgICAgICAgICBjaGVjaygpOyAvLyBTcGllbCB6dWVuZGU/XG4gICAgICAgICAgICBpZiAoIWZpbmlzaGVkKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IDEgLSBjdXJyZW50OyAvLyB6d2lzY2hlbiAwIHVuZCAxIGhpbi0gdW5kIGhlcnNjaGFsdGVuXG4gICAgICAgICAgICAgICAgLy8gSGlud2VpcyBha3R1YWxpc2llcmVuXG4gICAgICAgICAgICAgICAgY2FwdGlvbi5pbm5lckhUTUwgPSBtZXNzYWdlc1twbGF5ZXJzW2N1cnJlbnRdICsgJy10dXJuJ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gU3BpZWxhbmxlaXR1bmcgaW5zIERva3VtZW50IGVpbmbDvGdlblxuICAgIGIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgYi5pbm5lckhUTUwgPSBtZXNzYWdlc1snaW5zdHJ1Y3Rpb25zJ107XG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChiKTtcbiAgICAvLyBUYWJlbGxlIGlucyBEb2t1bWVudCBlaW5mw7xnZW5cbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGZpZWxkKTtcbiAgICAvLyBUYWJlbGxlIGF1ZmJhdWVuXG4gICAgZmllbGQuYXBwZW5kQ2hpbGQoY2FwdGlvbik7IC8vIEJlc2NocmlmdHVuZ1xuICAgIGZpZWxkLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rib2R5JykpO1xuICAgIC8vIEhpbndlaXMgZWlucmljaHRlblxuICAgIGNhcHRpb24uaW5uZXJIVE1MID0gbWVzc2FnZXNbcGxheWVyc1tjdXJyZW50XSArICctdHVybiddO1xuICAgIGZvciAociA9IDA7IHIgPCAzOyByKyspIHtcbiAgICAgICAgLy8gbmV1ZSBUYWJlbGxlbnplaWxlXG4gICAgICAgIHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgICAgICAgKF9hID0gZmllbGQubGFzdENoaWxkKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYXBwZW5kQ2hpbGQodHIpO1xuICAgICAgICBmb3IgKGMgPSAwOyBjIDwgMzsgYysrKSB7XG4gICAgICAgICAgICAvLyBuZXVlIFRhYmVsbGVuemVsbGVcbiAgICAgICAgICAgIGNvbnN0IHRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgICAgIHRkLnRhYkluZGV4ID0gciA9PSAwID8gciArIDEgKyBjIDogciA9PSAxID8gciArIDIgKyBjICsgMSA6IHIgKyA0ICsgYyArIDE7XG4gICAgICAgICAgICB0ci5hcHBlbmRDaGlsZCh0ZCk7XG4gICAgICAgICAgICAvLyBLbGlja2J1dHRvblxuICAgICAgICAgICAgYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgYi5pbm5lckhUTUwgPSBsYWJlbHNbcl1bY10gKyAnICcgKyBtZXNzYWdlc1snc2VsZWN0J107XG4gICAgICAgICAgICAoX2IgPSB0ci5sYXN0Q2hpbGQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5hcHBlbmRDaGlsZChiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBFcmVpZ25pcyBiZWkgVGFiZWxsZSDDvGJlcndhY2hlblxuICAgIGZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbWFyayk7XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxvY2FsLmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=