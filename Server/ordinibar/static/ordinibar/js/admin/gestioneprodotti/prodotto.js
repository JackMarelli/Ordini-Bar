function loadDetails(){
    document.getElementById("nome_prodotto").innerHTML = localStorage.getItem('nome');
    document.getElementById("prezzo").innerHTML = localStorage.getItem('prezzo')+"€";
}