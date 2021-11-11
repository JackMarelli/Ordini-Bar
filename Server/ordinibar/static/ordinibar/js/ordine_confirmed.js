function CaricaPagina() {
  //Visualizzazione di prezzo e orario
  document.getElementById("prezzo").innerHTML = localStorage.getItem("totale") + "€";
  document.getElementById("orario").innerHTML = localStorage.getItem("orario");

  $.ajaxSetup({
    headers: {
      "X-CSRFToken": getCookie("csrftoken")
    }
  });

  return $.ajax({
    url: "/ordineconfermato/getlastpk",
    type: "POST",
    success: function (response) {
      new QRCode(document.getElementById("qr"), "00"+response.primary_key);//-->DA SISTEMARE
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