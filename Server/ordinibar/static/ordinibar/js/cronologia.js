// let promise = new Promise(function (Resolve) {
//   fetch("../js/tmp.json").then((response) => Resolve(response.json()));
// });
// promise.then(function (value) {
//   let json = value;
//   caricaPagina(json);
// });

var json_obj;

function onLoadFunction(){
  $.ajaxSetup({
    headers: {
      "X-CSRFToken": getCookie("csrftoken")
    }
  });

  return $.ajax({
    url: "/cronologia/getCronologiaOrdini",
    type: "POST",
    success: function (response) {
      json_obj = response;
      caricaPagina(response);
    }
  });
}


function caricaPagina(json) {
  for (let i = 0; i < json.length; i++) {
    const divOrdine = document.createElement("div");
    const divNome = document.createElement("div");
    const divTotale = document.createElement("div");
    divOrdine.setAttribute("class", "ordine");
    divNome.setAttribute("class", "nome");
    divNome.setAttribute("id", i);
    divNome.setAttribute("onclick", "caricaOrdine(id)");
    divTotale.setAttribute("class", "totale");
    divNome.textContent = "Ordine " + (i + 1);
    let totale = 0;
    for (let j = 0; j < json[i].ordine.length; j++) {
      totale +=
        parseFloat(json[i].ordine[j].prezzo.toString().replace(",", ".")) *
        json[i].ordine[j].quantita;
    }
    divTotale.textContent = totale.toString() + '€';
    const divLista = document.querySelector(".lista");
    divLista.appendChild(divOrdine);
    divOrdine.appendChild(divNome);
    divOrdine.appendChild(divTotale);
  }
}
function caricaOrdine(id) {

    let json = json_obj;
    localStorage.clear();
    let daSalvare = JSON.stringify(json[id].ordine);
    localStorage.setItem("json", daSalvare);
    window.location.replace("/ordine");
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
