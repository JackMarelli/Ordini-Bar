//checiu e maionese due bottoni, quando clicchi diventa sotto o grigio
//orario diventa variabile
//ricevo l'enco, prezzo totale, 
//tutto invio al Server
//da mainlist a ordine conservato il Server non fa nulla
//json.getitem json

//Si recupera il JSON dal localStorage
const obj = JSON.parse(localStorage.getItem("json"));

//Si determina la lunghezza del JSON
var lunghezza = 0;
obj.forEach(element => {
    lunghezza++;
});

var Totale = 0;

function CaricaPagina() {
    /*
        STRUTTURA ESSERE TIPO:
        <div class="prodotto">
            <div class="prop">
              <div class="nome">Prodotto</div>
              <div class="prezzo">2,50€</div>
            </div>
            <div class="quantity">
              <div class="number">2</div>
            </div>
        </div>
    */

    //Creazione elementi in base alla lunghezza del JSON
    for (let index = 0; index < lunghezza; index++) {
        if(obj[index] != null){
            //Si prendono i valori di nome, prezzo e quantita per l'oggetto attuale
            var nomeAttributo = obj[index].nome;
            var prezzoAttributo = obj[index].prezzo;
            var quantitaAttributo = obj[index].quantita;
            
            //Si calcola il totale
            Totale += parseFloat(prezzoAttributo.toString().replace(",", "."))*parseFloat(quantitaAttributo);
            
            //Si creano i DIV
            const divProdotto = document.createElement("div");
                const divProp = document.createElement("div");
                    const divNome = document.createElement("div");
                    const divPrezzo = document.createElement("div");
                const divQuantity = document.createElement("div");
                    const divNumber = document.createElement("div");
    
            //Si impostano le classi ai DIV 
            divProdotto.setAttribute("class","prodotto");
            divProp.setAttribute("class","prop");
            divNome.setAttribute("class","nome");
            divNome.innerHTML = nomeAttributo;
            divPrezzo.setAttribute("class","prezzo");
            divPrezzo.innerHTML = prezzoAttributo+"€";
            divQuantity.setAttribute("class", "quantity");
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

    //Si visualizza il prezzo totale dell'ordine
    document.getElementById("totale").innerHTML = Totale + "€";
}

function PassaggioAvanti(){
    //Se i dati sono corretti passo alla pagina successiva
    if(document.getElementById("orarioRitiro").value != "") {
        localStorage.setItem("totale", Totale);
        localStorage.setItem("orario", document.getElementById("orarioRitiro").value);
        window.location.href = "../pages/ordine_confirmed.html";
    }
}

function PassaggioIndietro(){
    //Si salva il JSON sul localstorage
    localStorage.setItem("caricaDaLocalStorage", true);
    window.location.href = "/";
}