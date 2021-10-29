//checiu e maionese due bottoni, quando clicchi diventa sotto o grigio
//orario diventa variabile
//ricevo l'enco, prezzo totale, 
//tutto invio al Server
//da mainlist a ordine conservato il Server non fa nulla
//json.getitem json

//Struttura JSON che si deve ricevere dalla pagina precedente
var json = '[{"nome":"Panino con la cotoletta","prezzo":"2", "quantita":"1"},{"nome":"Pizza con le patatine","prezzo":"3,50", "quantita":"3"},{"nome":"Panzerotto","prezzo":"1,50", "quantita":"2"}]'; //,{"nome":"panino","prezzo":"1", "quantita":"2"},{"nome":"panino","prezzo":"1", "quantita":"2"},{"nome":"panino","prezzo":"1", "quantita":"2"},{"nome":"panino","prezzo":"1", "quantita":"2"},{"nome":"panino","prezzo":"1", "quantita":"2"},{"nome":"panino","prezzo":"1", "quantita":"2"}]';
const obj = JSON.parse(json);

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
            Totale += parseFloat(prezzoAttributo.replace(",", "."));
            
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

    //Si visualizza il pre
    document.getElementById("totale").innerHTML = Totale + "€";
}