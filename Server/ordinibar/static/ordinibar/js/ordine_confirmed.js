function CaricaPagina() {

  $.ajaxSetup({
    headers: {
      "X-CSRFToken": getCookie("csrftoken")
    }
  });

  $.ajax({
    url: "/ordineconfermato/getlastpk",
    type: "POST",
    success: function (response) {
      new QRCode(document.getElementById("qr"), "00" + response.primary_key);//-->DA SISTEMARE
    }
  });

  //get informations
  $.ajax({
    url: "/ordineconfermato/getlastorderinformations",
    type: "POST",
    success: function (response) {
      //Visualizzazione di prezzo e orario
      document.getElementById("prezzo").innerHTML = response.prezzo + "€";
      document.getElementById("orario").innerHTML = response.orario;
    }
  });

}

function PassaggioIndietro() {
  //Pulizia del localStorage e ritorno alla pagina iniziale
  localStorage.clear();
  window.location.href = "/";
}

function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  } else {
    begin += 2;
  }
  var end = document.cookie.indexOf(";", begin);
  if (end == -1) {
    end = dc.length;
  }
  return unescape(dc.substring(begin + prefix.length, end));
}