var json = '[{"nome":"panino","prezzo":"1"},{"nome":"pizza","prezzo":"2"},{"nome":"kebab","prezzo":"50"}]';
const obj = JSON.parse(json);
var Quantita = []; //vettore per le quantità di ogni singolo elemento
var x = 0;
var lunghezza = 0;
obj.forEach(element => {
    lunghezza++;
});
for (let index = 0; index < lunghezza; index++) {
    Quantita[index] = x;
}
function incrementa(nome) { //il paramentro non è l'id ma è l'oggetto HTML
    for (var i = 0; i < lunghezza; i++) {
        if (obj[i].nome == nome.id) {
            Quantita[i] = Quantita[i] + 1;
            nome.textContent = Quantita[i];
            break;
        }
    }
}
function decrementa(nome) { //il paramentro non è l'id ma è l'oggetto HTML
    for (var i = 0; i < lunghezza; i++) {
        if (obj[i].nome == nome.id) {
            if(Quantita[i]>0){
                Quantita[i] = Quantita[i] - 1;
                nome.textContent = Quantita[i];
            }
            break;
        }
    }
}

function CaricaPagina() {
    for (let index = 0; index < lunghezza; index++) {
        
        var nomeAttributo = obj[index].nome; //es: panino.
        var prezzoAttributo = obj[index].prezzo; //es: 1
        const spazio = document.createElement("br");

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

        divProdotto.setAttribute("classe","prodotto");
        divProp.setAttribute("class","prop");
            divNome.setAttribute("class","nome");
            divNome.innerHTML = nomeAttributo;
            divPrezzo.setAttribute("class","prezzo");
            divPrezzo.innerHTML = prezzoAttributo;
        
        divQuantita.setAttribute("class","quantity");
        divMeno.setAttribute("class","minus");
        immagineMeno.setAttribute("src","../images/minusicon.png");
        divNumero.setAttribute("class","number");
        divNumero.innerHTML = 0;
        divPiu.setAttribute("class","plus");
        immaginePiu.setAttribute("src","../images/plusicon.svg");

        var funzione = "incrementa(" + nomeAttributo+")";
        immaginePiu.setAttribute('onclick',funzione);


        //aggiunti attributi ai bottoni per decremento
        funzione = "decrementa(" + nomeAttributo+")";
        immagineMeno.setAttribute('onclick',funzione);


        //ora vado a inserire gli elementi nel body
        var divLista = document.querySelector(".lista");
        divLista.appendChild(divProdotto);
        divProdotto.appendChild(divProp);
      //  divLista.appendChild(divProp);
        divProp.appendChild(divNome);
        divProp.appendChild(divPrezzo);
        divLista.appendChild(divQuantita);
        divQuantita.appendChild(divMeno);
        divMeno.appendChild(immagineMeno);
        divQuantita.appendChild(divNumero);
        divQuantita.appendChild(divPiu);
        divPiu.appendChild(immaginePiu);
    }
}