//Si riceve il JSON con lo stato degli ordini
var json = '[{"nome":"Ordine1","prezzo":"2","stato":"todo"},{"nome":"Ordine2","prezzo":"1,50","stato":"doing"},{"nome":"Ordine3","prezzo":"2,50","stato":"todo"},{"nome":"Ordine4","prezzo":"2,5","stato":"todo"}]';

//Si fa il parse del JSON
const obj = JSON.parse(json);

function CaricaPagina(){
    /*
        STRUTTURA ESSERE TIPO:
        <div class="ordine">
            <div class="prop cursorpointer">
                <div class="nome">Ordine 1</div>
                <div class="totale">4,50€</div>
            </div>
            <div class="stato todo o stato doing">"Da accettare" o "In corso"</div>
        </div>
    */

    for (let index = 0; index < obj.length; index++){
        //Si prendono i valori di nome, prezzo e stato per l'oggetto attuale
        var nomeAttributo = obj[index].nome;
        var prezzoAttributo = obj[index].prezzo;
        var statoAttributo = obj[index].stato;

        //Si creano i DIV
        const divOrdine = document.createElement("div");
            const divProp = document.createElement("div");
                const divNome = document.createElement("div");
                const divTotale = document.createElement("div");
            const divStato = document.createElement("div");

        //Si impostano le classi ai DIV
        divOrdine.setAttribute("class", "ordine");
            divProp.setAttribute("class", "prop cursorpointer");
                divNome.setAttribute("class", "nome");
                divTotale.setAttribute("class", "totale");
            if(statoAttributo == "todo") divStato.setAttribute("class", "todo");
            else divStato.setAttribute("class", "doing");
        
        //Si impostano i valori ai DIV
            var funzione = "PassaggioAvanti('" + nomeAttributo +"', '" + statoAttributo +"')";
            divProp.setAttribute("onclick", funzione);
                divNome.innerHTML = nomeAttributo;
                divTotale.innerHTML = prezzoAttributo+"€";
            if(statoAttributo == "todo") divStato.innerHTML = "Da accettare";
            else divStato.innerHTML = "In corso";

        //Si inseriscono i DIV nel body
        var divLista = document.querySelector(".lista");
        divLista.appendChild(divOrdine);
            divOrdine.appendChild(divProp);
                divProp.appendChild(divNome);
                divProp.appendChild(divTotale);
            divOrdine.appendChild(divStato);
    }
}

function PassaggioAvanti(nome, statoAttributo){
    //Si salvano nome e stato dell'ordine
    localStorage.setItem("nome", nome);
    localStorage.setItem("stato", statoAttributo);

    //Si passa alla pagina successiva
    window.location.href="ordine.html";
}