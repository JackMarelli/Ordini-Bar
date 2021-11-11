let promise = new Promise(function (Resolve) {
  fetch("../js/tmp.json").then((response) => Resolve(response.json()));
});
promise.then(function (value) {
  let json = value;
  caricaPagina(json);
});

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
        parseFloat(json[i].ordine[j].prezzo.replace(",", ".")) *
        json[i].ordine[j].quantita;
    }
    divTotale.textContent = totale;
    const divLista = document.querySelector(".lista");
    divLista.appendChild(divOrdine);
    divOrdine.appendChild(divNome);
    divOrdine.appendChild(divTotale);
  }
}
function caricaOrdine(id) {
  //id = numero dell'ordine in base al json
  let promise = new Promise(function (Resolve) {
    fetch("../js/tmp.json").then((response) => Resolve(response.json()));
  });
  promise.then(function (value) {
    let json = value;
    localStorage.clear();
    let daSalvare = JSON.stringify(json[id].ordine);
    localStorage.setItem("json", daSalvare);
    window.location.replace("../pages/ordine.html");
  });
}
