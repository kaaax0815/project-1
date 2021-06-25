import $ from 'jquery';
import Peer, { DataConnection } from 'peerjs';
import qrcode from 'qrcode';

// Available Players
const players = ['x', 'o'];
let globalMe: string;
/** If Origin of Click comes from Jquery (-> Remote) */
let globalJquery: boolean;
/** If Origin of New CLick comes from Jquery (-> Remote) */
let globalNewGame: boolean;

document.addEventListener('DOMContentLoaded', () => {
  $('#tttwrapper').hide();
  // Last Part of Url
  const peeridregex = /[a-z,0-9]+-[a-z,0-9]+-[a-z,0-9]+-[a-z,0-9]+-[a-z,0-9]+/;
  const peer = new Peer();
  peer.on('open', (id) => {
    $('#ownpeerid').text(id);
    qrcode.toCanvas(
      document.getElementById('ownpeeridqr'),
      `${window.location.href}?peerid=${id}`,
      { errorCorrectionLevel: 'high' },
      (error) => error && console.error(error)
    );
    $('#ownpeeridqrlink').attr('target', '_blank');
    $('#ownpeeridqrlink').attr('href', `${window.location.href}?peerid=${id}`);
  });
  const peerid = getUrlVars()['peerid'];
  if (peeridregex.test(peerid)) {
    $('#partnerpeerid').val(peerid);
  }
  peer.on('connection', connection);
  $('#partnerstartbtn').on('click', () => {
    const partnerpeerid = <string>$('#partnerpeerid').val();
    if (!peeridregex.test(partnerpeerid)) {
      $('#partnerstartbtn').text('Falsches Format');
    } else {
      $('#partnerstartbtn').text('Verbinden...');
      globalMe = players[Math.floor(Math.random() * players.length)];
      connection(peer.connect(partnerpeerid));
    }
  });
});

/**
 * Runs on connection
 * @param {DataConnection} conn
 * @see <https://peerjs.com/docs.html#dataconnection>
 */
let globalConn: DataConnection;
async function connection(conn: DataConnection) {
  conn.on('open', () => {
    $('#partnerstartbtn').text('Verbunden');
    $('#peerjs').hide();
    conn.on('data', data);
    conn.on('error', error);
    if (globalMe) {
      conn.send({ action: 'start', player: players[1 - players.indexOf(globalMe)] });
    } else {
      conn.send({ action: 'start' });
    }
    globalConn = conn;
  });
}

/** Handle Errors
 * @see <https://peerjs.com/docs.html#dataconnection-on-error>
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function error(err: any) {
  console.error(err);
}

let globalSelf: string;
/**
 * Handle data
 * @see <https://peerjs.com/docs.html#dataconnection-on-data>
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function data(data: any) {
  console.log(data);
  if (data.action == 'start') {
    $('#tttwrapper').show();
    globalSelf = data.player;
    console.log(globalMe || globalSelf);
    TicTacToe(document.querySelectorAll('.tic-tac-toe')[0]);
  } else if (data.action == 'mark') {
    globalJquery = true;
    $(`button:contains(${data.loc})`).trigger('click');
  } else if (data.action == 'newgame') {
    globalNewGame = true;
    $('button:contains(Neues Spiel?)').trigger('click');
  }
}

function TicTacToe(element: Element) {
  /** Who I am (x or o) */
  const whois = globalMe || globalSelf;
  $('#whois').text(whois.toUpperCase());
  /** Spieler der grad dran ist 0: x; 1: o */
  let current = 0;
  const field = document.createElement('table');
  const caption = document.createElement('caption');
  const labels = [
    ['oben links', 'oben mittig', 'oben rechts'],
    ['Mitte links', 'Mitte mittig', 'Mitte rechts'],
    ['unten links', 'unten mittig', 'unten rechts']
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const messages: any = {
    myturn: 'Du bist dran!',
    otherturn: 'Du bist nicht dran!',
    oturn: 'Spieler O ist am Zug.',
    xturn: 'Spieler X ist am Zug.',
    owins: 'Spieler O gewinnt.',
    xwins: 'Spieler X gewinnt.',
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

      field.className = 'game-over';

      if (winner) {
        caption.innerHTML = messages[players[current] + 'wins'];
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
        if (globalNewGame) {
          globalNewGame = false;
        } else {
          globalConn.send({ action: 'newgame' });
        }
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
        if ((current == 0 && whois == 'x') || (current == 1 && whois == 'o')) {
          caption.innerHTML = messages['myturn'] + '<br>' + messages[players[current] + 'turn'];
        } else {
          caption.innerHTML = messages['otherturn'] + '<br>' + messages[players[current] + 'turn'];
        }
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
    // pass if x is allowed and i am x or if o is allowed and i am o
    if ((current == 0 && whois == 'x') || (current == 1 && whois == 'o')) {
      console.log('You are permitted!');
    } else {
      if (globalJquery) {
        console.log('Remote is permitted');
        globalJquery = false;
      } else {
        return console.log('You are NOT permitted!');
      }
    }
    // Tabellenzelle bestimmen
    let td = <HTMLElement>event.target;

    // Button oder Zelle?
    while (td && td.tagName.toLowerCase() != 'td' && td != field) {
      td = <HTMLElement>td.parentNode;
    }

    // Zelle bei Bedarf markieren
    if (td && !finished && td.tagName.toLowerCase() == 'td' && td.className.length < 1) {
      td.className = players[current]; // Klassennamen vergeben
      // td.innerHTML = players[current]; <- not needed
      if (globalConn) {
        globalConn.send({ action: 'mark', loc: td.children[0].textContent! });
      }

      check(); // Spiel zuende?

      if (!finished) {
        current = 1 - current; // zwischen 0 und 1 hin- und herschalten

        // Hinweis aktualisieren
        if ((current == 0 && whois == 'x') || (current == 1 && whois == 'o')) {
          caption.innerHTML = messages['myturn'] + '<br>' + messages[players[current] + 'turn'];
        } else {
          caption.innerHTML = messages['otherturn'] + '<br>' + messages[players[current] + 'turn'];
        }
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
  if ((current == 0 && whois == 'x') || (current == 1 && whois == 'o')) {
    caption.innerHTML = messages['myturn'] + '<br>' + messages[players[current] + 'turn'];
  } else {
    caption.innerHTML = messages['otherturn'] + '<br>' + messages[players[current] + 'turn'];
  }

  for (r = 0; r < 3; r++) {
    // neue Tabellenzeile
    tr = document.createElement('tr');

    field.lastChild?.appendChild(tr);

    for (c = 0; c < 3; c++) {
      // neue Tabellenzelle
      tr.appendChild(document.createElement('td'));

      // Klickbutton
      b = document.createElement('button');
      b.innerHTML = labels[r][c] + ' ' + messages['select'];

      tr.lastChild?.appendChild(b);
    }
  }

  $('td').hover(changeCursor);

  // Ereignis bei Tabelle überwachen
  field.addEventListener('click', mark);

  /** Switch Cursor between pointer and not-allowed */
  function changeCursor() {
    if ((current == 0 && whois == 'x') || (current == 1 && whois == 'o')) {
      console.log('cursor pointer');
      $('td').css('cursor', 'pointer');
    } else {
      console.log('cursor not-allowed');
      $('td').css('cursor', 'not-allowed');
    }
  }
}

/** get querystring
 * @author https://stackoverflow.com/a/4656873/13707908
 */
function getUrlVars() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vars: any = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let hash: any;
  const hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (let i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}
