function startOver() {
  document.getElementById("imprumut").value = "";
  document.getElementById("ani").value = "";
  document.getElementById("dobanda").value = "";
  document.getElementById("imprumut_info").innerHTML = "";
  document.getElementById("table").innerHTML = "";
}
//document.querySelector 
function validate() {
  var imprumut = document.getElementById("imprumut").value;
  var ani = document.getElementById("ani").value;
  var dobanda = document.getElementById("dobanda").value;

  if (imprumut <= 0 || isNaN(Number(imprumut))) {
    alert("imprumut");
    document.getElementById("imprumut").value = "";
  } else if (ani <= 0 || parseInt(ani) != ani) {
    alert("ani");
    document.getElementById("ani").value = "";
  } else if (dobanda <= 0 || isNaN(Number(dobanda))) {
    alert("dobanda");
    document.getElementById("dobanda").value = "";
  } else {
    calculate(parseFloat(imprumut), parseInt(ani), parseFloat(dobanda));
  }
}

function calculate(imprumut, ani, dobanda) {
  i = dobanda / 100;
  var plataLunara =
    (imprumut * (i / 12) * Math.pow(1 + i / 12, ani)) /
    (Math.pow(1 + i / 12, ani) - 1);

  var info = "";

  info += "<table width='250'>";
  info += "<tr><td>Imprumut:</td>";
  info += "<td>RON" + imprumut + "</td></tr>";

  info += "<tr><td>Durata/Luni:</td>";
  info += "<td>" + ani + "</td></tr>";

  info += "<tr><td>Dobanda:</td>";
  info += "<td>" + dobanda + "%</td></tr>";

  info += "<tr><td>Rata Lunara:</td>";
  info += "<td>RON" + round(plataLunara, 2) + "</td></tr>";

  info += "<tr><td>Total de Plata:</td>";
  info += "<td>RON" + round(plataLunara, 2) + "</td></tr>";
  info += "</table>";
  document.getElementById("imprumut_info").innerHTML = info;

  //-----//
  var table = "";
  table += "<table cellpadding='15'>";

  table += "<tr>";
  table += "<td>0</td>";
  table += "<td>&nbsp;</td>";
  table += "<td>&nbsp;</td>";
  table += "<td>&nbsp;</td>";
  table += "<td>&nbsp;</td>";
  table += "<td>" + round(imprumut, 2) + "</td>";
  table += "</tr>";

  var bilantCurent = imprumut;
  var counterPlata = 1;
  var totalDobanda = 0;
  plataLunara = plataLunara;

  while (bilantCurent > 0) {
    plataDobanda = (i / 12) * bilantCurent; //parte din plata lunara

    if (plataLunara > bilantCurent) {
      plataLunara = bilantCurent + plataDobanda;
    }
    plataImprumut = plataLunara - plataDobanda;
    totalDobanda = totalDobanda + plataDobanda;
    bilantCurent = bilantCurent - plataImprumut;

    //display row
    table += "<tr>";
    table += "<td>" + counterPlata + "</td>";
    table += "<td>" + round(plataLunara, 2) + "</td>";
    table += "<td>" + round(plataImprumut, 2) + "</td>";
    table += "<td>" + round(plataDobanda, 2) + "</td>";
    table += "<td>" + round(totalDobanda, 2) + "</td>";
    table += "<td>" + round(bilantCurent, 2) + "</td>";
    table += "</tr>";

    counterPlata++;
  }

  table += "</table>";
  document.getElementById("table").innerHTML = table;
}

function round(num, dec) {
  return (Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec)).toFixed(dec);
}
