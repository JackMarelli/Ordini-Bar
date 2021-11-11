function CaricaPagina(){
    document.getElementById("prezzo").innerHTML = localStorage.getItem("totale") + "€";
    document.getElementById("orario").innerHTML = localStorage.getItem("orario");
    //RICHIESTA AL SERVER DEL NUMERO PROGRESSIVO DELL'ORDINE
}

function PassaggioIndietro(){
    localStorage.clear();
    window.location.href = "../pages/mainlist.html";
}

//CREAZIONE DEL CODICE QR