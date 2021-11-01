var x = 0;
var vettore_salato = [];//vettore contenente l'elenco dei prodotti salati e le relative quantità selezionate
var vettore_dolce = [];//vettore contenente l'elenco dei prodotti dolci e le relative quantità selezionate
var tipologia_selezionata = "";//Tipologia di prodotto attualmente selezionata (salato/dolce)
var vettOggSaving = [];

function cambia_tipologia(tipologia){
    tipologia_selezionata = tipologia;
    document.querySelector(".lista").innerHTML = '';
    if(tipologia == "salato"){
        CaricaPagina(vettore_salato);
    }
    else{
        CaricaPagina(vettore_dolce);
    }
}

function search_element() {

    var obj;

    if(tipologia_selezionata == "salato"){
        obj = vettore_salato;
    }
    else{
        obj = vettore_dolce;
    }

    lunghezza = obj.length;

    var text = document.getElementById("searchbar").value;
    var value_to_search = text.toUpperCase();
    var result_list = [];
    for (let i = 0; i < obj.length; i++) {
        var nome_prodotto = obj[i].nome;
        if (nome_prodotto.toUpperCase().indexOf(value_to_search) > -1) {
            result_list.push(obj[i]);
        }
    }
    document.querySelector(".lista").innerHTML = '';
    CaricaPagina(result_list);
}

function SalvaInLocalStorage(index) {
    localStorage.clear();
    if(tipologia_selezionata == "dolce"){
        index = vettore_salato.length + index;
    }
    obj = [].concat(vettore_salato,vettore_dolce);
    //alert(JSON.stringify(obj));
    var myObj = { "nome": obj[index].nome, "prezzo": obj[index].prezzo, "quantita": obj[index].quantita };
    vettOggSaving[index] = myObj;
    var jsonDaX = JSON.stringify(vettOggSaving);
    localStorage.setItem("json", jsonDaX);
}

function load_inizio() {
    localStorage.clear();//cancello svuoto il localstorage
    //riempio i 2 vettori
    $.when(carica_salato(), carica_dolce()).done(function(ajax1Results,ajax2Results){
        tipologia_selezionata = "salato";
        CaricaPagina(vettore_salato);
    });
    
}

function carica_salato(){
    return $.ajax({
        url: "/index/getitemlist",
        type: "POST",
        data: '{"tipo":"Salato"}',
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                vettore_salato[i] = {
                    nome:response[i].nome,
                    quantita:0,
                    prezzo: response[i].prezzo,
                }
            }
        }
    });
}

function carica_dolce(){
    return $.ajax({
        url: "/index/getitemlist",
        type: "POST",
        data: '{"tipo":"Dolce"}',
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                vettore_dolce[i] = {
                    nome:response[i].nome,
                    quantita:0,
                    prezzo: response[i].prezzo,
                }
            }
        }
    });
}

function incrementa(nome) { //il parametro è l'id del div contenete la quantità del determinato prodotto

    var obj;

    if(tipologia_selezionata == "salato"){
        obj = vettore_salato;
    }
    else{
        obj = vettore_dolce;
    }

    lunghezza = obj.length;

    for (var i = 0; i < lunghezza; i++) {
        if (obj[i].nome == nome) {
            obj[i].quantita = obj[i].quantita + 1;
            var tmp = "[id = '" + nome + "']";
            var bloccoNumero = document.querySelector(tmp)
            bloccoNumero.textContent = obj[i].quantita;
            SalvaInLocalStorage(i);
            break;
        }
    }
}

function decrementa(nome) {  //il parametro è l'id del div contenete la quantità del determinato prodotto

    var obj;

    if(tipologia_selezionata == "salato"){
        obj = vettore_salato;
    }
    else{
        obj = vettore_dolce;
    }

    lunghezza = obj.length;

    for (var i = 0; i < lunghezza; i++) {
        if (obj[i].nome == nome) {
            if (obj[i].quantita > 0) {
                var tmp = "[id = '" + nome + "']";
                var bloccoNumero = document.querySelector(tmp)
                obj[i].quantita = obj[i].quantita - 1;
                bloccoNumero.textContent = obj[i].quantita;
                SalvaInLocalStorage(i);
            }
            break;
        }
    }

}

function CaricaPagina(object) {

    lunghezza = object.length;
    //alert(lunghezza);
    //creo gli elementi in base alla lunghezza del JSON passato dal server
    for (let index = 0; index < lunghezza; index++) {
        //Prendo il nome del prodotto passato dal JSON. ES: Panino
        var nomeAttributo = object[index].nome;
        //Prendo il prezzo del prodotto passato dal JSON. ES: 50
        var prezzoAttributo = object[index].prezzo; //es: 1

        const divProdotto = document.createElement("div");
        const divProp = document.createElement("div");
        const divNome = document.createElement("div");
        const divPrezzo = document.createElement("div");
        const divQuantita = document.createElement("div");
        const divPiu = document.createElement("div");
        //const immaginePiu = document.createElement("img");
        const divNumero = document.createElement("div");
        const divMeno = document.createElement("div");
        //const immagineMeno = document.createElement("img");

        //imposto le classi ai div in base al CSS 
        divProdotto.setAttribute("class", "prodotto");
        divProp.setAttribute("class", "prop");
        divNome.setAttribute("class", "nome");
        divNome.innerHTML = nomeAttributo;//aggiungo al div del nome il nome del prodotto
        divPrezzo.setAttribute("class", "prezzo");
        divPrezzo.innerHTML = prezzoAttributo + "€";//aggiungo al div del prezzo il prezzo del prodotto

        //continuo a impostare le classi ai div
        divQuantita.setAttribute("class", "quantity");
        divMeno.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 12h20v2h-24z"/></svg>';
        //immagineMeno.setAttribute("src","{%static 'ordinibar/img/menuicon.svg'%}");
        divNumero.setAttribute("class", "number");
        //imposto l'id del div contenente la quantità di quel determinato prodotto, così posso modificare il numero in base al nome del prodotto
        divNumero.setAttribute("id", nomeAttributo);
        divNumero.innerHTML = object[index].quantita;//imposto la quantità di base
        divPiu.setAttribute("class", "plus");
        //immaginePiu.setAttribute("src","{% static 'ordinibar/img/plusicon.svg' %}");//metto il path delle immagini
        divPiu.innerHTML = '<svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"/></svg>';
        var funzione = "incrementa('" + nomeAttributo + "')";//imposto le funzioni da mettere nell'onclick delle immagini
        divPiu.setAttribute('onclick', funzione);


        //aggiunti attributi ai bottoni per decremento
        funzione = "decrementa('" + nomeAttributo + "')";
        divMeno.setAttribute('onclick', funzione);


        //ora vado a inserire gli elementi nel body
        var divLista = document.querySelector(".lista");

        divLista.appendChild(divProdotto);
        divProdotto.appendChild(divProp);
        divProp.appendChild(divNome);
        divProp.appendChild(divPrezzo);
        divProdotto.appendChild(divQuantita);
        divQuantita.appendChild(divMeno);
        //divMeno.appendChild(immagineMeno);
        divQuantita.appendChild(divNumero);
        divQuantita.appendChild(divPiu);
        // divPiu.appendChild(immaginePiu);
    }
}