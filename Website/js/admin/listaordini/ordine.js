var primaryKeyAttributo = localStorage.getItem("primaryKey");

function CaricaPagina(){
    //Si visualizzano le informazioni relative all'ordine, già note perché passate dalla pagina precedente
    document.getElementById("titoloOrdine").innerHTML = localStorage.getItem("nome");
    document.getElementById("prezzo").innerHTML = localStorage.getItem("prezzo")+"€";
    document.getElementById("orario").innerHTML = localStorage.getItem("orario");

    //SI EFFETTUA LA RICHIESTA AL SERVER PER OTTENERE TUTTI I PRODOTTI DELL'ORDINE AVENTE LA PRIMARYBEY INDICATA
    var json = '[{"nome":"Panino","prezzo":"2","quantita":"1"},{"nome":"Pizza con patatine","prezzo":"2,50","quantita":"2"},{"nome":"Panzerotto","prezzo":"1,50","quantita":"3"},{"nome":"Focaccia","prezzo":"1","quantita":"1"}]';

    //Si fa il parse del JSON
    const obj = JSON.parse(json);

    for (let index = 0; index < obj.length; index++) {
        /*
            STRUTTURA ESSERE TIPO:
            <div class="spalma">
                <div class="prop">
                    <div class="nome">Panzerotto</div>
                    <div class="prezzo">2€</div>
                </div>
                <div class="quantity">6</div>
            </div>
        */
        if(obj[index] != null){
            //Si prendono i valori di nome, prezzo e quantita per l'oggetto attuale
            var nomeAttributo = obj[index].nome;
            var prezzoAttributo = obj[index].prezzo;
            var quantitaAttributo = obj[index].quantita;

            //Si creano i DIV
            const divSpalma = document.createElement("div");
                const divProp = document.createElement("div");
                    const divNome = document.createElement("div");
                    const divPrezzo = document.createElement("div");
                const divQuantita = document.createElement("div");
            
            //Si impostano le classi e i valori ai DIV
            divSpalma.setAttribute("class", "spalma");
                divProp.setAttribute("class", "prop");
                    divNome.setAttribute("class", "nome");
                    divNome.innerHTML = nomeAttributo;
                    divPrezzo.setAttribute("class", "prezzo");
                    divPrezzo.innerHTML = prezzoAttributo;
                divQuantita.setAttribute("class", "quantity");
                divQuantita.innerHTML = quantitaAttributo;

            //Si inseriscono i DIV nel body
            var divLista = document.querySelector(".lista");
                divLista.appendChild(divSpalma);
                    divSpalma.appendChild(divProp);
                        divProp.appendChild(divNome);
                        divProp.appendChild(divPrezzo);
                    divSpalma.appendChild(divQuantita);
        }
    }

    //Si decide quale struttura di bottoni creare e la si crea
    /*
        STRUTTURE ESSERE TIPO:
        <div class="spalma">
            <div class="btn btnred" id="accetta">
                <div>Accetta</div>
            </div>
            <div class="btn btngray" id="rifiuta">
                <div>Rifiuta</div>
            </div>
        </div>

        <div class="centra">
            <div class="btn btnred cursorpointer" id="accetta">
                <div>Completa</div>
            </div>
        </div>
    */

    if(localStorage.getItem("stato") == "todo") {
        //Si creano i DIV
        const divSpalma = document.createElement("div");
            const divBottoneRosso = document.createElement("div");
                const divAccetta = document.createElement("div");
            const divBottoneGrigio = document.createElement("div");
                const divRifiuta = document.createElement("div");
    
        //Si impostano le classi e i valori ai DIV
        divSpalma.setAttribute("class", "spalma");
            divBottoneRosso.setAttribute("class", "btn btnred");
            divBottoneRosso.setAttribute("id", "accetta");
            divBottoneRosso.setAttribute("onclick", "Accetta()");
                divAccetta.innerHTML = "Accetta";
            divBottoneGrigio.setAttribute("class", "btn btngray");
            divBottoneGrigio.setAttribute("id", "rifiuta");
            divBottoneGrigio.setAttribute("onclick", "Rifiuta()");
                divRifiuta.innerHTML = "Rifiuta";

        //Si inseriscono i DIV nel body
        var divBottoni = document.querySelector(".lista");
        divBottoni.appendChild(divSpalma);
        divSpalma.appendChild(divBottoneRosso);
            divBottoneRosso.appendChild(divAccetta);
        divSpalma.appendChild(divBottoneGrigio);
            divBottoneGrigio.appendChild(divRifiuta);
    }
    else {
        //Si creano i DIV
        const divCentra = document.createElement("div");
            const divCursorPointer = document.createElement("div");
                const divCompleta = document.createElement("div");
    
        //Si impostano le classi e i valori ai DIV
        divCentra.setAttribute("class", "centra");
            divCursorPointer.setAttribute("class", "btn btnred cursorpointer");
            divCursorPointer.setAttribute("id", "accetta");
            divCursorPointer.setAttribute("onclick", "Completa()");
                divCompleta.innerHTML = "Completa";

        //Si inseriscono i DIV nel body
        var divBottoni = document.querySelector(".lista");
        divBottoni.appendChild(divCentra);
            divCentra.appendChild(divCursorPointer);
                divCursorPointer.appendChild(divCompleta);
    }
}

function Accetta(){
    alert("ACCETTA");
}

function Rifiuta(){
    alert("RIFIUTA");
}

function Completa(){
    alert("COMPLETA");
}

//TODO: Aggiungere le funzioni vere e proprie ai bottoni