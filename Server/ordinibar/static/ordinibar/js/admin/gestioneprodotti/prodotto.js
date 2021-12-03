function loadDetails(){
    document.getElementById("nome_prodotto").innerHTML = localStorage.getItem('nome');
    document.getElementById("prezzo").innerHTML = localStorage.getItem('prezzo')+"€";
    localStorage.setItem('modifica', false);
}

function modifica(){
    localStorage.setItem('modifica', true);
    window.location.href = "/administration/addproduct";
}