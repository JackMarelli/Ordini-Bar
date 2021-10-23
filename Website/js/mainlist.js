var json = '[{"nome":"panino","prezzo":"1"},{"nome":"pizza","prezzo":"2"},{"nome":"kebab","prezzo":"50"},{"nome":"panino","prezzo":"1"},{"nome":"panino","prezzo":"1"},{"nome":"panino","prezzo":"1"},{"nome":"panino","prezzo":"1"},{"nome":"panino","prezzo":"1"},{"nome":"panino","prezzo":"1"}]';
const obj = JSON.parse(json); //metodo per fare il parse del JSON
var Quantita = []; //vettore per le quantità di ogni singolo elemento
var x = 0;
var lunghezza = 0;

//ciclo foreach per prendere la lunghezza del JSON
obj.forEach(element => {
    lunghezza++;
});

//imposto tutti gli elementi del vettore a 0
for (let index = 0; index < lunghezza; index++) {
    Quantita[index] = x;
}
function incrementa(nome) { //il parametro è l'id del div contenete la quantità del determinato prodotto
    for (var i = 0; i < lunghezza; i++) {
        if (obj[i].nome == nome) {
            Quantita[i] = Quantita[i] + 1;
            var tmp = "#" + nome;
            var bloccoNumero = document.querySelector(tmp)
            bloccoNumero.textContent = Quantita[i];
            break;
        }
    }
}
function decrementa(nome) {  //il parametro è l'id del div contenete la quantità del determinato prodotto
    for (var i = 0; i < lunghezza; i++) {
        if (obj[i].nome == nome) {
            if(Quantita[i]>0){
                var tmp = "#" + nome;
                var bloccoNumero = document.querySelector(tmp)
                Quantita[i] = Quantita[i] - 1;
                bloccoNumero.textContent = Quantita[i];
            }
            break;
        }
    }
}

function CaricaPagina() {
    /*
        <div class="prodotto">
            <div class="prop">
              <div class="nome">Prodotto</div>
              <div class="prezzo">2,50€</div>
            </div>
            <div class="quantity">
              <div class="plus">
                <img src="../images/minusicon.png" alt="" srcset="" />
              </div>
              <div class="number">0</div>
              <div class="minus">
                <img src="../images/plusicon.svg" alt="" srcset="" />
              </div>
            </div>
          </div>
    COME DEVE RISULTARE IL CODICE
    */

   //creo gli elementi in base alla lunghezza del JSON passato dal server
    for (let index = 0; index < lunghezza; index++) {
        //Prendo il nome del prodotto passato dal JSON. ES: Panino
        var nomeAttributo = obj[index].nome;
        //Prendo il prezzo del prodotto passato dal JSON. ES: 50
        var prezzoAttributo = obj[index].prezzo; //es: 1
        
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
        divProdotto.setAttribute("class","prodotto");
        divProp.setAttribute("class","prop");
        divNome.setAttribute("class","nome");
        divNome.innerHTML = nomeAttributo;//aggiungo al div del nome il nome del prodotto
        divPrezzo.setAttribute("class","prezzo");
        divPrezzo.innerHTML = prezzoAttributo+"€";//aggiungo al div del prezzo il prezzo del prodotto
        
        //continuo a impostare le classi ai div
        divQuantita.setAttribute("class","quantity");
        divMeno.setAttribute("class","minus");
        immagineMeno.setAttribute("src","../images/minusicon.png");
        divNumero.setAttribute("class","number");
        //imposto l'id del div contenente la quantità di quel determinato prodotto, così posso modificare il numero in base al nome del prodotto
        divNumero.setAttribute("id",nomeAttributo);
        divNumero.innerHTML = 0;//imposto la quantità di base
        divPiu.setAttribute("class","plus");
        immaginePiu.setAttribute("src","../images/plusicon.svg");//metto il path delle immagini

        var funzione = "incrementa('" + nomeAttributo+"')";//imposto le funzioni da mettere nell'onclick delle immagini
        immaginePiu.setAttribute('onclick',funzione);


        //aggiunti attributi ai bottoni per decremento
        funzione = "decrementa('" + nomeAttributo+"')";
        immagineMeno.setAttribute('onclick',funzione);


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
}