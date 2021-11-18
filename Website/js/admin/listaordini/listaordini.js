//Si riceve il JSON con lo stato degli ordini
var json = '[{"nome":"Ordine1", "prezzo":"2", "orario":"12:00", "stato":"todo", "primaryKey":"000"},{"nome":"Ordine2", "prezzo":"1,50", "orario":"13:00", "stato":"doing", "primaryKey":"001"},{"nome":"Ordine3", "prezzo":"2,50", "orario":"14:00", "stato":"todo", "primaryKey":"002"},{"nome":"Ordine4", "prezzo":"2,5", "orario":"15:00", "stato":"todo", "primaryKey":"003"}]';

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
            var funzione = "PassaggioAvanti('" + nomeAttributo + "')";
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

function PassaggioAvanti(nome){
    //Si recuperano le informazioni dell'ordine in base al nome conosciuto
    for (let index = 0; index < obj.length; index++) {
        var nomeAttributo = obj[index].nome;

        if(nomeAttributo == nome) {
            var prezzoAttributo = obj[index].prezzo;
            var orarioAttributo = obj[index].orario;
            var statoAttributo = obj[index].stato;
            var primaryKeyAttributo = obj[index].primaryKey;
            break;
        }
    }

    //Si salvano le informazioni dell'ordine in base al nome conosciuto
    localStorage.setItem("nome", nomeAttributo);
    localStorage.setItem("prezzo", prezzoAttributo);
    localStorage.setItem("orario", orarioAttributo);
    localStorage.setItem("stato", statoAttributo);
    localStorage.setItem("primaryKey", primaryKeyAttributo);

    //Si passa alla pagina successiva
    window.location.href="ordine.html";
}