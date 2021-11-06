//json dal server (qui è di esempio)
var json = '[{"nome":"Panino","prezzo":"2","aggiunte":true},{"nome":"Pizza_con_patatine","prezzo":"2,50","aggiunte":false},{"nome":"Panzerotto","prezzo":"1,50","aggiunte":false},{"nome":"Pizza_liscia","prezzo":"2,50","aggiunte":false},{"nome":"Calzone","prezzo":"2","aggiunte":false},{"nome":"Focaccia","prezzo":"1","aggiunte":false},{"nome":"Panuozzo","prezzo":"3","aggiunte":true}]';

//metodo per fare il parse del JSON
const obj = JSON.parse(json);

//vettore per le quantità di ogni singolo elemento | ogni cella corrisponde a una cella del vettore OB => obj[1] --> quantita[2]
var quantita = [];

//imposto tutti gli elementi del vettore a 0
for (let index = 0; index < obj.length; index++) {
    quantita[index] = 0;
}

//vettore di oggetti dove salvare i prodotti
var prodottiLocalStorage = [{}];
prodottiLocalStorage[0] = null;

/*                                                    FUNZIONI                                         */

function CaricaPagina() { //creazione della pagina web da codice

    //imposto il pulsante per confermare l'ordine come non visibile
    document.getElementById("done").style.visibility = "hidden";

    //creo gli elementi in base alla lunghezza del JSON passato dal server
    for (let index = 0; index < obj.length; index++) {

        //Prendo il nome del prodotto passato dal JSON. ES: Panino
        var nomeAttributo = obj[index].nome;
        //Prendo il prezzo del prodotto passato dal JSON. ES: 50
        var prezzoAttributo = obj[index].prezzo; //es: 1

        //creo tutti gli elementi necessari
        const divProdotto = document.createElement("div");
        const divProp = document.createElement("div");
        const divNome = document.createElement("div");
        const divPrezzo = document.createElement("div");
        const divQuantita = document.createElement("div");
        const divPiu = document.createElement("div");
        const immaginePiu = document.createElement("img");
        const divNumero = document.createElement("div");
        const divMeno = document.createElement("div");
        const immagineMeno = document.createElement("img");

        //imposto le classi ai div in base al CSS 
        divProdotto.setAttribute("class", "prodotto");
        divProp.setAttribute("class", "prop");
        divNome.setAttribute("class", "nome");
        divNome.innerHTML = nomeAttributo;//aggiungo al div del nome il nome del prodotto
        divPrezzo.setAttribute("class", "prezzo");
        divPrezzo.innerHTML = prezzoAttributo + "€";//aggiungo al div del prezzo il prezzo del prodotto

        //continuo a impostare le classi ai div
        divQuantita.setAttribute("class", "quantity");
        divMeno.setAttribute("class", "minus");
        immagineMeno.setAttribute("src", "../images/minusicon.png");
        divNumero.setAttribute("class", "number");
        //imposto l'id del div contenente la quantità di quel determinato prodotto, così posso modificare il numero in base al nome del prodotto
        divNumero.setAttribute("id", nomeAttributo);
        divNumero.innerHTML = 0;//imposto la quantità di base
        divPiu.setAttribute("class", "plus");
        immaginePiu.setAttribute("src", "../images/plusicon.svg");//metto il path delle immagini

        var funzione = "incrementa('" + nomeAttributo + "')";//imposto le funzioni da mettere nell'onclick delle immagini
        immaginePiu.setAttribute('onclick', funzione);


        //aggiunti attributi ai bottoni per decremento
        funzione = "decrementa('" + nomeAttributo + "')";
        immagineMeno.setAttribute('onclick', funzione);

        //ora vado a inserire gli elementi nel body
        var divLista = document.querySelector(".lista");

        divLista.appendChild(divProdotto);
        divProdotto.appendChild(divProp);
        divProp.appendChild(divNome);
        divProp.appendChild(divPrezzo);
        divProdotto.appendChild(divQuantita);
        divQuantita.appendChild(divMeno);
        divMeno.appendChild(immagineMeno);
        divQuantita.appendChild(divNumero);
        divQuantita.appendChild(divPiu);
        divPiu.appendChild(immaginePiu);

    }
    //dopo aver creato la pagina HTML controllo se ci sono dati nel localStorage
    caricaDaPagOrdine();
}

function caricaDaPagOrdine() { //va a prendere gli elementi nel localStorage se serve
    //vedo se ci sono dei dati da prendere con una variabile inserita nel localStorage
    var carica = localStorage.getItem("caricaDaLocalStorage");
    //se è impostata a true vado a caricare i dati salvati
    if (carica == "true") {
        //la imposto a false
        localStorage.setItem("caricaDaLocalStorage", false);
        //prendo i prodotti dal local storage e li inserisco nel vettore di oggetti
        prodottiLocalStorage = JSON.parse(localStorage.getItem("json"));
        //ciclo per andare a impostare i valori delle quantità nella pagina html
        for (var i = 0; i < prodottiLocalStorage.length; i++) {
            //controllo che non si siano celle impostate a NULL
            if (prodottiLocalStorage[i] != null) {
                //la funzione incrementa lavora sul vettore quantità quindi imposto qui il valore, di base sarà tutto a valore 0
                quantita[i] = prodottiLocalStorage[i].quantita;
                //vado a prendere l'oggetto html contente la quantità e inserisco quella corrente
                var tmp = "#" + prodottiLocalStorage[i].nome;
                var bloccoNumero = document.querySelector(tmp)
                bloccoNumero.textContent = prodottiLocalStorage[i].quantita;
            }
        }
        //se questo codice viene eseguito sono sicuro che ci sia almeno un valore maggiore di 0, quindi ora imposto il bottone DONE come visibile
        document.getElementById("done").style.visibility = "visible";
    }
}

function incrementa(nome) { //il parametro è l'id del div contenete la quantità del determinato prodotto
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].nome == nome) {
            quantita[i] = quantita[i] + 1; //aumento di 1 la quantità
            //vado a prendere l'oggetto html
            var tmp = "#" + nome;
            var bloccoNumero = document.querySelector(tmp)
            bloccoNumero.textContent = quantita[i];
            //se voglio aumentare una quantità per forza il bottone dovrà essere visibile
            document.getElementById("done").style.visibility = "visible";
            //vado a salvare l'elemento nel localStorage
            SalvaInLocalStorage(i);
            break;
        }
    }
}

function decrementa(nome) {  //il parametro è l'id del div contenete la quantità del determinato prodotto
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].nome == nome) {
            if (quantita[i] > 0) {
                var tmp = "#" + nome;
                var bloccoNumero = document.querySelector(tmp)
                quantita[i] = quantita[i] - 1;
                bloccoNumero.textContent = quantita[i];
                SalvaInLocalStorage(i);
            }
            break;
        }
    }
}

function SalvaInLocalStorage(index) { //salvo i dati nel localStorage
    //vado a pulire il localStorage
    localStorage.clear();

    //controllo se la quantità di quell'oggetto è uguale a 0
    if (quantita[index] == 0) {
        //la vado a impostare anche nel vettore di oggetti
        prodottiLocalStorage[index].quantita = 0;
        //controlle se sono presenti solo zeri per rendere invisibile il pulsante DONE
        checkZero();
        //ora imposto quella cella del vettore a NULL
        prodottiLocalStorage[index] = null;
    }
    else {
        //creo l'oggetto che è il prodotto stesso
        var myObj = { "nome": obj[index].nome, "prezzo": obj[index].prezzo, "quantita": quantita[index], "aggiunte": obj[index].aggiunte };
        //lo aggiungo al vettore di oggetti che gestisce il localStorage
        prodottiLocalStorage[index] = myObj;
    }
    //faccio diventare il vettore di oggetti in una stringa JSON
    var jsonDaX = JSON.stringify(prodottiLocalStorage);
    //salvo il tutto nel localStorage sotto il valore di "json"
    localStorage.setItem("json", jsonDaX);
}

function checkZero() { //controlla se tutti i prodotti sono impostati a 0 e se sono impostati a 0 fa scomparire il pulsante di conferma
    let togli = true; 
    for (let i = 0; i < prodottiLocalStorage.length; i++) {
        //controlle che il vettore di oggetti non sia nullo
        if (prodottiLocalStorage[i] != null) {
            //se non è nullo ora controllo se la quantità sia diversa da 0
            if (prodottiLocalStorage[i].quantita != 0) {
                //se c'è un prodotto diverso da 0 interrompe il ciclo
                togli = false;
                break;
            }
        }
    }
    //vado a togliere il bottone DONE se tutto è andato a buon fine
    if (togli == true) {
        document.getElementById("done").style.visibility = "hidden";
    }
}