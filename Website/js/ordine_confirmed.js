function CaricaPagina(){
    document.getElementById("prezzo").innerHTML = localStorage.getItem("totale") + "€";
    document.getElementById("orario").innerHTML = localStorage.getItem("orario");
}

function PassaggioIndietro(){
    localStorage.clear();
    window.location.href = "../pages/mainlist.html";
}

//Decidere cosa salvare all'interno del QR code