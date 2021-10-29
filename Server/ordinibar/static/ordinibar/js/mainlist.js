//var json = '[{"nome":"panino","prezzo":"1"},{"nome":"pizza","prezzo":"2"},{"nome":"kebab","prezzo":"50"},{"nome":"panino","prezzo":"1"},{"nome":"panino","prezzo":"1"},{"nome":"panino","prezzo":"1"},{"nome":"panino","prezzo":"1"},{"nome":"panino","prezzo":"1"},{"nome":"panino","prezzo":"1"}]';
//metodo per fare il parse del JSON
var Quantita = []; //vettore per le quantità di ogni singolo elemento
var x = 0;
var lunghezza = 0;
var obj = "";
//var json;

function search_element() {
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

function load_inizio() {
    load_salato();
    localStorage.clear();
}

function load_salato() {
    document.querySelector(".lista").innerHTML = '';
    $.ajax({
        url: "/index/getitemlist",
        type: "POST",
        data: '{"tipo":"Salato"}',
        success: function (response) {
            obj = response;
            CaricaPagina(response);
        }
    });


}

function load_dolce() {
    document.querySelector(".lista").innerHTML = '';
    $.ajax({
        url: "/index/getitemlist",
        type: "POST",
        data: '{"tipo":"Dolce"}',
        success: function (response) {
            obj = response;
            CaricaPagina(response);

        }
    });

}


//ciclo foreach per prendere la lunghezza del JSON



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
            if (Quantita[i] > 0) {
                var tmp = "#" + nome;
                var bloccoNumero = document.querySelector(tmp)
                Quantita[i] = Quantita[i] - 1;
                bloccoNumero.textContent = Quantita[i];
            }
            break;
        }
    }
}

function CaricaPagina(object) {

    object.forEach(element => {
        lunghezza++;
    });

    //imposto tutti gli elementi del vettore a 0
    for (let index = 0; index < lunghezza; index++) {
        Quantita[index] = x;
    }

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
        divNumero.innerHTML = 0;//imposto la quantità di base
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