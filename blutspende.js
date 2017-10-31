var secs = new Array();
var timerID = new Array();
var timerRunning = new Array();
var delay = 1000;
var erstspender = parseInt(getCookie("erstspender"));
var bett = parseInt(getCookie("bett"));
var stuhl = parseInt(getCookie("stuhl"));
var ortsverein = "Ortsverein Schorndorf";
var datum = getCookie("datum");
var ort = getCookie("ort");

function InitializeTimer(typ, nummer) {
    if (typ == "bett") {
      secs[nummer] = 600;
      bett++;
    }
    if (typ == "stuhl") {
      secs[nummer] = 300;
      stuhl++;
    }
    if (typ == "erstspender") {
      secs[nummer] = 900;
      erstspender++;
      bett++;
    }
    StopTheClock(nummer);
    StartTheTimer(nummer);
    document.getElementById(nummer).classList.remove("start");
}

function StopTheClock(nummer) {
    if(timerRunning[nummer])
        clearTimeout(timerID[nummer]);
    timerRunning[nummer] = false;
}
function StartTheTimer(nummer) {
  document.getElementById(nummer).classList.remove("fertig");
  aktualisieren();
    if (secs[nummer]==0) {
        StopTheClock(nummer);
        document.getElementById(nummer).innerHTML = "";
        document.getElementById(nummer).classList.add("fertig");
    }
    else {
        document.getElementById(nummer).innerHTML = minuten(secs[nummer]);
        secs[nummer] = secs[nummer] - 1;
        timerRunning[nummer] = true;
        timerID[nummer] = window.setTimeout(function () {
          StartTheTimer(nummer);
        }, 1000);
    }
}

function aufstehen(bett) {
  document.getElementById(bett).classList.remove("fertig");
  document.getElementById(bett).classList.add("start");
}
function aktualisieren() {
  var d = new Date();
  d.setTime(d.getTime() + (60*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();

  document.getElementById("spender").innerHTML = bett + stuhl;
  document.getElementById("erstspender").innerHTML = erstspender;
  document.getElementById("stuhl").innerHTML = stuhl;
  document.getElementById("bett").innerHTML = bett;
  setCookie("erstspender", erstspender, 30);
  setCookie("stuhl", stuhl, 30);
  setCookie("bett", bett, 30);
}
function abbruch (nummer) {
  StopTheClock(nummer);
  document.getElementById(nummer).innerHTML = "";
  document.getElementById(nummer).classList.add("start");
}
function minuten(zeit) {
  var minuten = new Date();
  var sekunden = new Date();
  var rest;
  minuten = Math.floor( (zeit % 3600) / 60 );
  sekunden = Math.floor( zeit % 60 );
  if (minuten < 10) {
    rest = "0" + minuten + ":";
  }
  else {
    rest = minuten + ":";
  }
  if (sekunden < 10) {
    rest = rest + "0" + sekunden + " Minuten";
  }
  else {
    rest = rest + sekunden + " Minuten";
  }
  return rest;
}
function verlassen() {
  if (confirm("Press a button!") == true) {
    txt = "You pressed OK!";
  } else {
    txt = "You pressed Cancel!";
  }
}
var popit = true;
window.onbeforeunload = function() {
  if(popit == true) {
    popit = false;
    return "Are you sure you want to leave?";
  }
}

/* COOKIES */
function loadCookies() {
  document.getElementById("spender").innerHTML = bett + stuhl;
  document.getElementById("erstspender").innerHTML = erstspender;
  document.getElementById("stuhl").innerHTML = stuhl;
  document.getElementById("bett").innerHTML = bett;
  document.getElementById("ortsverein").innerHTML = ortsverein + "<br>Blutspende<br>";
  if (ort == 0) {
    ort = prompt("Ort eingeben:", "Bronnbachhalle Weiler");
    setCookie("ort", ort, 30);
  }
  if (datum == 0) {
    datum = prompt("Datum eingeben:", getDatum());
    setCookie("datum", datum, 30);
  }
  document.getElementById("printdatum").innerHTML = datum;
  document.getElementById("printort").innerHTML = ort;
  document.getElementById("printalle").innerHTML = bett + stuhl;
  document.getElementById("printbett").innerHTML = bett;
  document.getElementById("printerst").innerHTML = erstspender;
  document.getElementById("printstuhl").innerHTML = stuhl;
}
function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return 0;
}
function clearCookies() {
  setCookie("bett","",-1);
  setCookie("stuhl","",-1);
  setCookie("erstspender","",-1);
  setCookie("ort","",-1);
  setCookie("datum","",-1);
  bett = 0;
  stuhl = 0;
  erstspender = 0;
  loadCookies();
}
function getDatum() {
  var jetzt = new Date();
  var tag = jetzt.getDate();
  var monat = jetzt.getMonth() + 1;
  var jahr = jetzt.getFullYear();
  if (monat < 10) {
    monat = "0" + monat;
  }
  if (tag < 10) {
    tag = "0" + tag;
  }
  jetzt = tag + "." + monat + "." + jahr;
  return jetzt;
}
function korrektCookies(typ) {
  if (typ=="bett") {
    bett = bett - 1;
  }
  if (typ=="erstspender") {
    erstspender = erstspender - 1;
  }
  if (typ=="stuhl") {
    stuhl = stuhl - 1;
  }
  aktualisieren();
  loadCookies();
}
