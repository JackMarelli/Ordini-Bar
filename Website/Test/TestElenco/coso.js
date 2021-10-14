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
        
        var nomeAttributo = obj[index].nome;
        //creazione degli elementi
        const paragrafo = document.createElement("p");
        const span = document.createElement("span");
        const bottoneAumenta = document.createElement("button");
        const bottoneDecrementa = document.createElement("button");
        const spazio = document.createElement("br");

        paragrafo.innerHTML = nomeAttributo;
        
        //aggiunti attributi per lo span dov'è contenuto il numero
        span.setAttribute('id', nomeAttributo);
        span.innerHTML = 0;

        //aggiunti attributi ai bottoni per incremento
        var funzione = "incrementa(" + nomeAttributo+")";
        bottoneAumenta.setAttribute('onclick',funzione);
        bottoneAumenta.innerHTML = "+";

        //aggiunti attributi ai bottoni per decremento
        funzione = "decrementa(" + nomeAttributo+")";
        bottoneDecrementa.setAttribute('onclick',funzione);
        bottoneDecrementa.innerHTML = "-";

        //ora vado a inserire gli elementi nel body
        var body = document.querySelector('body');
        body.appendChild(paragrafo);
        body.appendChild(span);
        body.appendChild(bottoneAumenta);
        body.appendChild(bottoneDecrementa);
        body.append(spazio);
    }
}