//Si recupera il JSON dal localStorage
const obj = JSON.parse(localStorage.getItem("json"));

//Si determina la lunghezza del JSON
var lunghezza = 0;
obj.forEach(element => {
    lunghezza++;
});

var Totale = 0;
var MassimoKetchupMaionese = 0;
var Ketchup = 0;
var Maionese = 0;

function CaricaPagina() {
    /*
        STRUTTURA ESSERE TIPO:
        <div class="justify-between">
            
                <div class="d-col">
                    <div class="t3">Panzerotto</div>
                    <div class="t4 t-grey-dark">2,00€</div>
                </div>
                <div class="t2">2</div>
            
        </div> 
    */

    //Creazione elementi in base alla lunghezza del JSON
    for (let index = 0; index < lunghezza; index++) {
        if (obj[index] != null) {
            //Si prendono i valori di nome, prezzo e quantita per l'oggetto attuale
            var nomeAttributo = obj[index].nome;
            var prezzoAttributo = obj[index].prezzo;
            var quantitaAttributo = obj[index].quantita;

            //Si calcola il totale
            Totale += parseFloat(prezzoAttributo.toString().replace(",", ".")) * parseFloat(quantitaAttributo);

            //Si calcolano le aggiunte
            if (obj[index].aggiunte == true) MassimoKetchupMaionese += quantitaAttributo * 2;

            //Si creano i DIV
            const divProdotto = document.createElement("div");
            const divProp = document.createElement("div");
            const divNome = document.createElement("div");
            const divPrezzo = document.createElement("div");
            const divQuantity = document.createElement("div");
            const divNumber = document.createElement("div");

            //Si impostano le classi ai DIV 
            divProdotto.setAttribute("class", "justify-between");
            divProp.setAttribute("class", "d-col prodotto");
            divNome.setAttribute("class", "t3 nome");
            divNome.innerHTML = nomeAttributo;
            divPrezzo.setAttribute("class", "t4 t-grey-dark prezzo");
            divPrezzo.innerHTML = prezzoAttributo + "€";
            divQuantity.setAttribute("class", "t2 quantity");
            divNumber.setAttribute("class", "number");
            divNumber.innerHTML = quantitaAttributo;

            //Si inseriscono gli elementi nel body
            var divLista = document.querySelector(".lista");
            divLista.appendChild(divProdotto);
            divProdotto.appendChild(divProp);
            divProp.appendChild(divNome);
            divProp.appendChild(divPrezzo);
            divProdotto.appendChild(divQuantity);
            divQuantity.appendChild(divNumber);
        }
    }

    if (MassimoKetchupMaionese != 0) {
        CreazioneCampiKetchupMaionese("ketchup", "Ketchup", "DecrementaKetchup()", "numeroKetchup", "IncrementaKetchup()");
        CreazioneCampiKetchupMaionese("maionese", "Maionese", "DecrementaMaionese()", "numeroMaionese", "IncrementaMaionese()");
    }

    //Si visualizza il prezzo totale dell'ordine
    document.getElementById("totale").innerHTML = Totale + "€";
}

function CreazioneCampiKetchupMaionese(idAggiunta, innerNome, onclickImgM, idNumber, onclickImgP) {
    //Si creano i DIV
    const divAggiunta = document.createElement("div");
    const divProp = document.createElement("div");
    const divNome = document.createElement("div");
    const divAggiuntaQuantity = document.createElement("div");
    const divMinus = document.createElement("div");
    const divImgM = document.createElement("img");
    const divNumber = document.createElement("div");
    const divPlus = document.createElement("div");
    const divImgP = document.createElement("img");

    //Si impostano le classi ai DIV
    divAggiunta.setAttribute("class", "aggiunta");
    divAggiunta.setAttribute("id", idAggiunta);
    divProp.setAttribute("class", "prop");
    divNome.setAttribute("class", "nome");
    divNome.innerHTML = innerNome;
    divAggiuntaQuantity.setAttribute("class", "aggiunta_quantity");
    divMinus.setAttribute("class", "minus");
    divMinus.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 12h20v2h-24z"/></svg>';
    divMinus.setAttribute("onclick", onclickImgM);
    divNumber.setAttribute("class", "number");
    divNumber.setAttribute("id", idNumber);
    divNumber.innerHTML = "0";
    divPlus.setAttribute("class", "plus");
    divPlus.innerHTML = '<svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"/></svg>';
    divPlus.setAttribute("onclick", onclickImgP);

    //Si inseriscono gli elementi nel body
    var divContainer = document.getElementById("containerKetchupMaionese");
    divContainer.appendChild(divAggiunta);
    divAggiunta.appendChild(divProp);
    divProp.appendChild(divNome);
    divAggiunta.appendChild(divAggiuntaQuantity);
    divAggiuntaQuantity.appendChild(divMinus);
    divMinus.appendChild(divImgM);
    divAggiuntaQuantity.appendChild(divNumber);
    divAggiuntaQuantity.appendChild(divPlus);
    divPlus.appendChild(divImgP);
}

function OrarioCambiato() {
    if (VerificaOrario()) document.getElementById("conferma").setAttribute("class", "enabled");//-->to change
    else document.getElementById("conferma").setAttribute("class", "disabled");
}

function PassaggioAvanti() {
    //Se i dati sono corretti si passa alla pagina successiva
    if (VerificaOrario()) {
        localStorage.setItem("totale", Totale);
        localStorage.setItem("orario", document.getElementById("orarioRitiro").value);
        localStorage.setItem("ketchup", Ketchup);
        localStorage.setItem("maionese", Maionese);
        window.location.href = "../pages/ordine_confirmed.html";
    }
}

function VerificaOrario() {
    //today contiene l'orario attuale
    today = new Date();

    //orario contiene l'orario inserito dall'utente
    orario = new Date();
    orario.setHours(document.getElementById("orarioRitiro").value.split(":")[0]);
    orario.setMinutes(document.getElementById("orarioRitiro").value.split(":")[1]);

    //Se l'orario indicato è prima di quello attuale, allora non è valido
    if (orario <= today) return false;
    else return true;
}

function PassaggioIndietro() {
    //Indico alla pagina precedente di caricare il JSON per non perdere i prodotti già inseriti
    localStorage.setItem("caricaDaLocalStorage", true);
    //Ritorno alla pagina precedente
    window.location.href = "../pages/mainlist.html";
}

//Funzioni per incrementare e decrementare le quantità di Ketchup e Maionese -> Il valore massimo è il complessivo dei due
function IncrementaKetchup() {
    if (Ketchup + 1 + Maionese <= MassimoKetchupMaionese) {
        Ketchup++;
        document.querySelector("#numeroKetchup").textContent = Ketchup;
    }
}

function DecrementaKetchup() {
    if (Ketchup - 1 >= 0) {
        Ketchup--;
        document.querySelector("#numeroKetchup").textContent = Ketchup;
    }
}

function IncrementaMaionese() {
    if (Maionese + 1 + Ketchup <= MassimoKetchupMaionese) {
        Maionese++;
        document.querySelector("#numeroMaionese").textContent = Maionese;
    }
}

function DecrementaMaionese() {
    if (Maionese - 1 >= 0) {
        Maionese--;
        document.querySelector("#numeroMaionese").textContent = Maionese;
    }
}