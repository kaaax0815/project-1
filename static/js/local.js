/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*********************************************!*\
  !*** ../Project #1/dist/static/js/local.js ***!
  \*********************************************/

// Starten wenn DOM geladen wurde
document.addEventListener('DOMContentLoaded', function () {
    function TicTacToe(element) {
        var _a, _b;
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
    }
    // finde alle Spiel-Platzhalter
    const games = document.querySelectorAll('.tic-tac-toe');
    for (let i = 0; i < games.length; i++) {
        TicTacToe(games[i]); // aktuelles Fundstück steht in games[i]
    }
});
//# sourceMappingURL=local.js.map
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aWN0YWN0b2UvLi4vUHJvamVjdFx1MDAwMCMxL2Rpc3Qvc3RhdGljL2pzL2xvY2FsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0EsdUJBQXVCLGdCQUFnQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLE9BQU87QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixPQUFPO0FBQ3RDLG1DQUFtQyxPQUFPO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsNEJBQTRCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFdBQVc7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixPQUFPO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixPQUFPO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGtCQUFrQjtBQUNyQyw0QkFBNEI7QUFDNUI7QUFDQSxDQUFDO0FBQ0QsaUMiLCJmaWxlIjoibG9jYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbi8vIFN0YXJ0ZW4gd2VubiBET00gZ2VsYWRlbiB3dXJkZVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUaWNUYWNUb2UoZWxlbWVudCkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAvKiogU3BpZWxlciBkZXIgZ3JhZCBkcmFuIGlzdCAwOiB4OyAxOiBvICovXG4gICAgICAgIGxldCBjdXJyZW50ID0gMDtcbiAgICAgICAgY29uc3QgcGxheWVycyA9IFsneCcsICdvJ107XG4gICAgICAgIGNvbnN0IGZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKTtcbiAgICAgICAgY29uc3QgY2FwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhcHRpb24nKTtcbiAgICAgICAgY29uc3QgbGFiZWxzID0gW1xuICAgICAgICAgICAgWydvYmVuIGxpbmtzJywgJ29iZW4gbWl0dGlnJywgJ29iZW4gcmVjaHRzJ10sXG4gICAgICAgICAgICBbJ01pdHRlIGxpbmtzJywgJ01pdHRlIG1pdHRpZycsICdNaXR0ZSByZWNodHMnXSxcbiAgICAgICAgICAgIFsndW50ZW4gbGlua3MnLCAndW50ZW4gbWl0dGlnJywgJ3VudGVuIHJlY2h0cyddXG4gICAgICAgIF07XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VzID0ge1xuICAgICAgICAgICAgJ28tdHVybic6ICdTcGllbGVyIE8gaXN0IGFtIFp1Zy4nLFxuICAgICAgICAgICAgJ3gtdHVybic6ICdTcGllbGVyIFggaXN0IGFtIFp1Zy4nLFxuICAgICAgICAgICAgJ28td2lucyc6ICdTcGllbGVyIE8gZ2V3aW5udC4nLFxuICAgICAgICAgICAgJ3gtd2lucyc6ICdTcGllbGVyIFggZ2V3aW5udC4nLFxuICAgICAgICAgICAgZHJhdzogJ0RhcyBTcGllbCBlbmRldCB1bmVudHNjaGllZGVuLicsXG4gICAgICAgICAgICBpbnN0cnVjdGlvbnM6ICdadW0gU3BpZWxlbiBiaXR0ZSBhYndlY2hzZWxuZCBpbiBkaWUgU3BpZWxmZWxkZXIga2xpY2tlbiEnLFxuICAgICAgICAgICAgc2VsZWN0OiAnd8OkaGxlbicsXG4gICAgICAgICAgICAnbmV3IGdhbWU/JzogJ05ldWVzIFNwaWVsPydcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IGZpbmlzaGVkO1xuICAgICAgICBsZXQgYjtcbiAgICAgICAgbGV0IGM7XG4gICAgICAgIGxldCByO1xuICAgICAgICBsZXQgdHI7XG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrKCkge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgY29uc3QgdGRzID0gZmllbGQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RkJyk7XG4gICAgICAgICAgICBsZXQgZnVsbCA9IHRydWU7XG4gICAgICAgICAgICBsZXQgaTtcbiAgICAgICAgICAgIGxldCB3aW5uZXI7IC8vIFRoZSBXaW5uZXJcbiAgICAgICAgICAgIC8vIGFsbGUgRmVsZGVyIG1hcmtpZXJ0P1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHRkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0ZHNbaV0uY2xhc3NOYW1lID09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGZ1bGwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBHZXdpbm5lciBlcm1pdHRlbG5cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgICAgICAvLyBzZW5rcmVjaHRcbiAgICAgICAgICAgICAgICBpZiAodGRzWzAgKyBpXS5jbGFzc05hbWUgIT0gJycgJiZcbiAgICAgICAgICAgICAgICAgICAgdGRzWzAgKyBpXS5jbGFzc05hbWUgPT0gdGRzWzMgKyBpXS5jbGFzc05hbWUgJiZcbiAgICAgICAgICAgICAgICAgICAgdGRzWzMgKyBpXS5jbGFzc05hbWUgPT0gdGRzWzYgKyBpXS5jbGFzc05hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gd2UgaGF2ZSBhIHdpbm5lciFcbiAgICAgICAgICAgICAgICAgICAgd2lubmVyID0gdGRzWzAgKyBpXS5jbGFzc05hbWU7XG4gICAgICAgICAgICAgICAgICAgIGhpZ2hsaWdodENlbGxzKFt0ZHNbaV0sIHRkc1szICsgaV0sIHRkc1s2ICsgaV1dKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gd2FhZ3JlY2h0XG4gICAgICAgICAgICAgICAgaWYgKHRkc1tpICogMyArIDBdLmNsYXNzTmFtZSAhPSAnJyAmJlxuICAgICAgICAgICAgICAgICAgICB0ZHNbaSAqIDMgKyAwXS5jbGFzc05hbWUgPT0gdGRzW2kgKiAzICsgMV0uY2xhc3NOYW1lICYmXG4gICAgICAgICAgICAgICAgICAgIHRkc1tpICogMyArIDFdLmNsYXNzTmFtZSA9PSB0ZHNbaSAqIDMgKyAyXS5jbGFzc05hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gd2UgaGF2ZSBhIHdpbm5lciFcbiAgICAgICAgICAgICAgICAgICAgd2lubmVyID0gdGRzW2kgKiAzXS5jbGFzc05hbWU7XG4gICAgICAgICAgICAgICAgICAgIGhpZ2hsaWdodENlbGxzKFt0ZHNbaSAqIDNdLCB0ZHNbaSAqIDMgKyAxXSwgdGRzW2kgKiAzICsgMl1dKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBkaWFnb25hbCBsaW5rcyBvYmVuIG5hY2ggcmVjaHRzIHVudGVuXG4gICAgICAgICAgICBpZiAodGRzWzBdLmNsYXNzTmFtZSAhPSAnJyAmJlxuICAgICAgICAgICAgICAgIHRkc1swXS5jbGFzc05hbWUgPT0gdGRzWzRdLmNsYXNzTmFtZSAmJlxuICAgICAgICAgICAgICAgIHRkc1s0XS5jbGFzc05hbWUgPT0gdGRzWzhdLmNsYXNzTmFtZSkge1xuICAgICAgICAgICAgICAgIHdpbm5lciA9IHRkc1swXS5jbGFzc05hbWU7XG4gICAgICAgICAgICAgICAgaGlnaGxpZ2h0Q2VsbHMoW3Rkc1swXSwgdGRzWzRdLCB0ZHNbOF1dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGRpYWdvbmFsIHJlY2h0cyBvYmVuIG5hY2ggbGlua3MgdW50ZW5cbiAgICAgICAgICAgIGlmICh0ZHNbMl0uY2xhc3NOYW1lICE9ICcnICYmXG4gICAgICAgICAgICAgICAgdGRzWzJdLmNsYXNzTmFtZSA9PSB0ZHNbNF0uY2xhc3NOYW1lICYmXG4gICAgICAgICAgICAgICAgdGRzWzRdLmNsYXNzTmFtZSA9PSB0ZHNbNl0uY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICAgICAgd2lubmVyID0gdGRzWzJdLmNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICBoaWdobGlnaHRDZWxscyhbdGRzWzJdLCB0ZHNbNF0sIHRkc1s2XV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU3BpZWwgcnVtPyBXZW5uIFNpZWdlciBvciBTcGllbCB2b2xsIGlzdFxuICAgICAgICAgICAgaWYgKGZ1bGwgfHwgd2lubmVyKSB7XG4gICAgICAgICAgICAgICAgZmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGZpZWxkLmNsYXNzTmFtZSA9ICdnYW1lLW92ZXInO1xuICAgICAgICAgICAgICAgIGlmICh3aW5uZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbi5pbm5lckhUTUwgPSBtZXNzYWdlc1twbGF5ZXJzW2N1cnJlbnRdICsgJy13aW5zJ107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uLmlubmVySFRNTCA9IG1lc3NhZ2VzWydkcmF3J107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIHJlc3RsaWNoZSBCdXR0b25zIGVudGZlcm5lblxuICAgICAgICAgICAgICAgIGxldCBidXR0b25zID0gZmllbGQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2J1dHRvbicpO1xuICAgICAgICAgICAgICAgIHdoaWxlIChidXR0b25zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAoX2EgPSBidXR0b25zWzBdLnBhcmVudE5vZGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZW1vdmVDaGlsZChidXR0b25zWzBdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gTmV1ZXMgU3BpZWw/XG4gICAgICAgICAgICAgICAgYnV0dG9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgICAgIGJ1dHRvbnMuaW5uZXJIVE1MID0gbWVzc2FnZXNbJ25ldyBnYW1lPyddO1xuICAgICAgICAgICAgICAgIGNhcHRpb24uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJyAnKSk7XG4gICAgICAgICAgICAgICAgY2FwdGlvbi5hcHBlbmRDaGlsZChidXR0b25zKTtcbiAgICAgICAgICAgICAgICBidXR0b25zLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjZWxscyA9IGZpZWxkLmdldEVsZW1lbnRzQnlUYWdOYW1lKCd0ZCcpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYnV0dG9uO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbDtcbiAgICAgICAgICAgICAgICAgICAgLy8gU3BpZWwgenVydcO8Y2tzZXR6ZW5cbiAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGZpbmlzaGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGZpZWxkLnJlbW92ZUF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChyID0gMDsgciA8IDM7IHIrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjID0gMDsgYyA8IDM7IGMrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFplbGxlbiB6dXLDvGNrc2V0emVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbCA9IGNlbGxzW3IgKiAzICsgY107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbC5yZW1vdmVBdHRyaWJ1dGUoJ2NsYXNzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBCdXR0b24gaGluenVmw7xnZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXR0b24uaW5uZXJIVE1MID0gbGFiZWxzW3JdW2NdICsgJyAnICsgbWVzc2FnZXNbJ3NlbGVjdCddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBIaW53ZWlzIGhpbnp1ZsO8Z2VuXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb24uaW5uZXJIVE1MID0gbWVzc2FnZXNbcGxheWVyc1tjdXJyZW50XSArICctdHVybiddO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qKiBaZWxsZSB3ZWnDnyBoZXJ2b3JoZWJlblxuICAgICAgICAgKiBAcGFyYW0ge0hUTUxUYWJsZURhdGFDZWxsRWxlbWVudD5bXX0gY2VsbHNcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGhpZ2hsaWdodENlbGxzKGNlbGxzKSB7XG4gICAgICAgICAgICBjZWxscy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHJvbmcnKTtcbiAgICAgICAgICAgICAgICBlbC5pbm5lckhUTUwgPSBub2RlLmlubmVySFRNTDtcbiAgICAgICAgICAgICAgICBub2RlLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQoZWwpO1xuICAgICAgICAgICAgICAgIG5vZGUuY2xhc3NMaXN0LmFkZCgnaGlnaGxpZ2h0ZWQnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDbGlja2VuIHZlcmFyYmVpdGVuXG4gICAgICAgICAqIEBwYXJhbSB7TW91c2VFdmVudH0gZXZlbnRcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIG1hcmsoZXZlbnQpIHtcbiAgICAgICAgICAgIC8vIFRhYmVsbGVuemVsbGUgYmVzdGltbWVuXG4gICAgICAgICAgICBsZXQgdGQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICAvLyBCdXR0b24gb2RlciBaZWxsZT9cbiAgICAgICAgICAgIHdoaWxlICh0ZCAmJiB0ZC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT0gJ3RkJyAmJiB0ZCAhPSBmaWVsZCkge1xuICAgICAgICAgICAgICAgIHRkID0gdGQucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFplbGxlIGJlaSBCZWRhcmYgbWFya2llcmVuXG4gICAgICAgICAgICBpZiAodGQgJiYgIWZpbmlzaGVkICYmIHRkLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PSAndGQnICYmIHRkLmNsYXNzTmFtZS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAgICAgdGQuY2xhc3NOYW1lID0gcGxheWVyc1tjdXJyZW50XTsgLy8gS2xhc3Nlbm5hbWVuIHZlcmdlYmVuXG4gICAgICAgICAgICAgICAgLy8gdGQuaW5uZXJIVE1MID0gcGxheWVyc1tjdXJyZW50XTtcbiAgICAgICAgICAgICAgICBjaGVjaygpOyAvLyBTcGllbCB6dWVuZGU/XG4gICAgICAgICAgICAgICAgaWYgKCFmaW5pc2hlZCkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gMSAtIGN1cnJlbnQ7IC8vIHp3aXNjaGVuIDAgdW5kIDEgaGluLSB1bmQgaGVyc2NoYWx0ZW5cbiAgICAgICAgICAgICAgICAgICAgLy8gSGlud2VpcyBha3R1YWxpc2llcmVuXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb24uaW5uZXJIVE1MID0gbWVzc2FnZXNbcGxheWVyc1tjdXJyZW50XSArICctdHVybiddO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBTcGllbGFubGVpdHVuZyBpbnMgRG9rdW1lbnQgZWluZsO8Z2VuXG4gICAgICAgIGIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIGIuaW5uZXJIVE1MID0gbWVzc2FnZXNbJ2luc3RydWN0aW9ucyddO1xuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGIpO1xuICAgICAgICAvLyBUYWJlbGxlIGlucyBEb2t1bWVudCBlaW5mw7xnZW5cbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChmaWVsZCk7XG4gICAgICAgIC8vIFRhYmVsbGUgYXVmYmF1ZW5cbiAgICAgICAgZmllbGQuYXBwZW5kQ2hpbGQoY2FwdGlvbik7IC8vIEJlc2NocmlmdHVuZ1xuICAgICAgICBmaWVsZC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpKTtcbiAgICAgICAgLy8gSGlud2VpcyBlaW5yaWNodGVuXG4gICAgICAgIGNhcHRpb24uaW5uZXJIVE1MID0gbWVzc2FnZXNbcGxheWVyc1tjdXJyZW50XSArICctdHVybiddO1xuICAgICAgICBmb3IgKHIgPSAwOyByIDwgMzsgcisrKSB7XG4gICAgICAgICAgICAvLyBuZXVlIFRhYmVsbGVuemVpbGVcbiAgICAgICAgICAgIHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgICAgICAgICAgIChfYSA9IGZpZWxkLmxhc3RDaGlsZCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFwcGVuZENoaWxkKHRyKTtcbiAgICAgICAgICAgIGZvciAoYyA9IDA7IGMgPCAzOyBjKyspIHtcbiAgICAgICAgICAgICAgICAvLyBuZXVlIFRhYmVsbGVuemVsbGVcbiAgICAgICAgICAgICAgICB0ci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpKTtcbiAgICAgICAgICAgICAgICAvLyBLbGlja2J1dHRvblxuICAgICAgICAgICAgICAgIGIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgICAgICBiLmlubmVySFRNTCA9IGxhYmVsc1tyXVtjXSArICcgJyArIG1lc3NhZ2VzWydzZWxlY3QnXTtcbiAgICAgICAgICAgICAgICAoX2IgPSB0ci5sYXN0Q2hpbGQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5hcHBlbmRDaGlsZChiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBFcmVpZ25pcyBiZWkgVGFiZWxsZSDDvGJlcndhY2hlblxuICAgICAgICBmaWVsZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG1hcmspO1xuICAgIH1cbiAgICAvLyBmaW5kZSBhbGxlIFNwaWVsLVBsYXR6aGFsdGVyXG4gICAgY29uc3QgZ2FtZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGljLXRhYy10b2UnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIFRpY1RhY1RvZShnYW1lc1tpXSk7IC8vIGFrdHVlbGxlcyBGdW5kc3TDvGNrIHN0ZWh0IGluIGdhbWVzW2ldXG4gICAgfVxufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sb2NhbC5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9