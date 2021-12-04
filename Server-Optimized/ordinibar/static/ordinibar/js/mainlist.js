var prodotti_salati = [];//Array contenente i prodotti salati
var prodotti_dolci = [];//Array contenente i prodotti dolci
var salato;//salato = true, dolce = false

/* Funzione per caricare tutti i prodotti da visualizzare negli array */
function load_product_list(product_list) {
    var json_array = JSON.parse(product_list);

    //Inserisco ogni elemento nell'array corretto (Dolce, Salato)
    json_array.forEach(product => {
        if (product.tipo == 'Salato') {
            prodotti_salati.push(product);
        }
        else {
            prodotti_dolci.push(product);
        }
        product.quantita = 0;
    });

    //TODO --> controllare localstorage
    caricaDaPagOrdine();
    show_list(prodotti_salati);
    salato = true;
}

/* Funzione per visualizzare la lista dei prodotti */
function show_list(product_list) {

    var content_div = document.getElementById('product_list');//contenitore di tutti i prodotti

    product_list.forEach(product => {
        var content_alredy_in_div = content_div.innerHTML;
        content_div.innerHTML =
            '<div class="list m1" id = "' + product.pk + '">\
        <div class="w-100 d-row justify-between">\
          <div class="d-col">\
            <div class="t3">' + product.nome + '</div>\
            <div class="t4 t-grey-dark">' + product.prezzo + '€</div>\
          </div>\
          <div class="d-row center">\
            <div class = "minus" onclick = "minus_function(' + product.pk + ')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 12h20v2h-24z"/></svg></div>\
            <div class="t3 quantita" style = "padding-left:10px; padding-right:10px;">'+ product.quantita + '</div>\
            <div class = "plus" onclick = "plus_function(' + product.pk + ')"><svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"/></svg></div>\
          </div>\
        </div>\
      </div>' + content_alredy_in_div;
    })
}

/* Funzione per incrementare il numero di prodotti selezionati */
function plus_function(pk) {

    var obj;

    if (salato) {
        obj = prodotti_salati;
    }
    else {
        obj = prodotti_dolci;
    }

    var lunghezza = obj.length;
    for (var i = 0; i < lunghezza; i++) {
        if (obj[i].pk == pk) {
            obj[i].quantita += 1;
            var product_div = document.getElementById(pk);
            product_div.querySelector(".quantita").innerHTML = obj[i].quantita;

            break;
        }
    }
}

/* Funzione per decrementare il numero di elementi */
function minus_function(pk) {

    var obj;

    if (salato) {
        obj = prodotti_salati;
    }
    else {
        obj = prodotti_dolci;
    }

    var lunghezza = obj.length;
    for (var i = 0; i < lunghezza; i++) {
        if (obj[i].pk == pk) {
            if (obj[i].quantita - 1 >= 0) {
                obj[i].quantita -= 1;
                var product_div = document.getElementById(pk);
                product_div.querySelector(".quantita").innerHTML = obj[i].quantita;
            }
            break;
        }
    }
}

/* Funzione per caricare gli elementi salati */
function load_salato() {
    document.getElementById('product_list').innerHTML = "";
    show_list(prodotti_salati);
    salato = true;
}

/* Funzione per caricare gli elementi dolci */
function load_dolce() {
    document.getElementById('product_list').innerHTML = "";
    show_list(prodotti_dolci);
    salato = false;
}

function search_element() {

    var obj;

    if (salato) {
        obj = prodotti_salati;
    }
    else {
        obj = prodotti_dolci;
    }

    var lunghezza = obj.length;

    var text = document.getElementById("searchbar").value;
    var value_to_search = text.toUpperCase();
    var result_list = [];
    for (let i = 0; i < obj.length; i++) {
        var nome_prodotto = obj[i].nome;
        if (nome_prodotto.toUpperCase().indexOf(value_to_search) > -1) {
            result_list.push(obj[i]);
        }
    }
    document.getElementById('product_list').innerHTML = "";
    show_list(result_list);
}

/* Funzione per completare l'ordine */
function completa() {
    var result = [];
    var elementi_totali = 0;
    prodotti_salati.forEach(product => {
        if (product.quantita > 0) {
            result.push(product);
            elementi_totali += product.quantita;
        }
    });

    prodotti_dolci.forEach(product => {
        if (product.quantita > 0) {
            result.push(product);
            elementi_totali += product.quantita;
        }
    });

    if (elementi_totali > 0) {
        var jsonDaX = JSON.stringify(result);
        localStorage.setItem("json", jsonDaX);
        localStorage.setItem("caricaDaLocalStorage", false);
        window.location.href = "/ordine";
    }
    else{
        alert("Non sono stati selezionati prodotti");
    }
}

/* Funzione per caricare gli elementi dalla pagina ordine */
function caricaDaPagOrdine() {

    var carica = localStorage.getItem("caricaDaLocalStorage");
    if (carica == "true") {
        localStorage.setItem("caricaDaLocalStorage", false);
        prodottiLocalStorage = JSON.parse(localStorage.getItem("json"));
        for (var i = 0; i < prodottiLocalStorage.length; i++) {
            if (prodottiLocalStorage[i] != null) {
                var obj = prodottiLocalStorage[i];
                //se l'elemento è salato
                if (obj.tipo == 'Salato') {
                    for (let i = 0; i < prodotti_salati.length; i++) {
                        if (prodotti_salati[i].pk == obj.pk) {
                            prodotti_salati[i].quantita = obj.quantita;
                        }
                    }
                }
                //se l'elemento è dolce
                if (obj.tipo == 'Dolce') {
                    for (let i = 0; i < prodotti_dolci.length; i++) {
                        if (prodotti_dolci[i].pk == obj.pk) {
                            prodotti_dolci[i].quantita = obj.quantita;
                        }
                    }
                }
            }
        }
    }
    else {
        localStorage.clear();
    }
}