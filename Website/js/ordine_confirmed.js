function CaricaPagina(){
    //Visualizzazione di prezzo e orario
    document.getElementById("prezzo").innerHTML = localStorage.getItem("totale") + "€";
    document.getElementById("orario").innerHTML = localStorage.getItem("orario");

    //Creazione del codice qr
    new QRCode(document.getElementById("qr"), localStorage.getItem("primaryKey"));
}

function PassaggioIndietro(){
    //Pulizia del localStorage e ritorno alla pagina iniziale
    localStorage.clear();
    window.location.href = "../pages/mainlist.html";
}