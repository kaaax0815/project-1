(()=>{"use strict";document.addEventListener("DOMContentLoaded",(function(){function e(e){var t,n;let a=0;const s=["x","o"],l=document.createElement("table"),c=document.createElement("caption"),i=[["oben links","oben mittig","oben rechts"],["Mitte links","Mitte mittig","Mitte rechts"],["unten links","unten mittig","unten rechts"]],m={oturn:"Spieler O ist am Zug.",xturn:"Spieler X ist am Zug.",owins:"Spieler O gewinnt.",xwins:"Spieler X gewinnt.",draw:"Das Spiel endet unentschieden.",instructions:"Zum Spielen bitte abwechselnd in die Spielfelder klicken!",select:"wählen","new game?":"Neues Spiel?"};let r,d,o,u,N;function p(e){e.forEach((e=>{const t=document.createElement("strong");t.innerHTML=e.innerHTML,e.innerHTML="",e.appendChild(t),e.classList.add("highlighted")}))}for(d=document.createElement("p"),d.innerHTML=m.instructions,e.appendChild(d),e.appendChild(l),l.appendChild(c),l.appendChild(document.createElement("tbody")),c.innerHTML=m[s[a]+"turn"],u=0;u<3;u++)for(N=document.createElement("tr"),null===(t=l.lastChild)||void 0===t||t.appendChild(N),o=0;o<3;o++)N.appendChild(document.createElement("td")),d=document.createElement("button"),d.innerHTML=i[u][o]+" "+m.select,null===(n=N.lastChild)||void 0===n||n.appendChild(d);l.addEventListener("click",(function(e){let t=e.target;for(;t&&"td"!=t.tagName.toLowerCase()&&t!=l;)t=t.parentNode;t&&!r&&"td"==t.tagName.toLowerCase()&&t.className.length<1&&(t.className=s[a],function(){var e;const t=l.getElementsByTagName("td");let n,d,N=!0;for(n=0;n<t.length;n++)""==t[n].className&&(N=!1);for(n=0;n<3;n++)""!=t[0+n].className&&t[0+n].className==t[3+n].className&&t[3+n].className==t[6+n].className&&(d=t[0+n].className,p([t[n],t[3+n],t[6+n]])),""!=t[3*n+0].className&&t[3*n+0].className==t[3*n+1].className&&t[3*n+1].className==t[3*n+2].className&&(d=t[3*n].className,p([t[3*n],t[3*n+1],t[3*n+2]]));if(""!=t[0].className&&t[0].className==t[4].className&&t[4].className==t[8].className&&(d=t[0].className,p([t[0],t[4],t[8]])),""!=t[2].className&&t[2].className==t[4].className&&t[4].className==t[6].className&&(d=t[2].className,p([t[2],t[4],t[6]])),N||d){r=!0,l.className="game-over",c.innerHTML=d?m[s[a]+"wins"]:m.draw;let t=l.getElementsByTagName("button");for(;t.length;)null===(e=t[0].parentNode)||void 0===e||e.removeChild(t[0]);t=document.createElement("button"),t.innerHTML=m["new game?"],c.appendChild(document.createTextNode(" ")),c.appendChild(t),t.addEventListener("click",(()=>{const e=l.getElementsByTagName("td");let t,n;for(a=0,r=!1,l.removeAttribute("class"),u=0;u<3;u++)for(o=0;o<3;o++)n=e[3*u+o],n.removeAttribute("class"),n.innerHTML="",t=document.createElement("button"),t.innerHTML=i[u][o]+" "+m.select,n.appendChild(t);c.innerHTML=m[s[a]+"turn"]}))}}(),r||(a=1-a,c.innerHTML=m[s[a]+"turn"]))}))}const t=document.querySelectorAll(".tic-tac-toe");for(let n=0;n<t.length;n++)e(t[n])}))})();