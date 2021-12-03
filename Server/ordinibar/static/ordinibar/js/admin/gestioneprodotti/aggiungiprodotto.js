function load_data(){
    pk = localStorage.getItem('pk');
    nome = localStorage.getItem('nome');
    prezzo = localStorage.getItem('prezzo');
    modifica = localStorage.getItem('modifica');

    if(modifica == "true"){
        document.getElementById("titolo2").innerHTML = "Modifica Prodotto";
        document.getElementById("id_nome").value = nome;
        document.getElementById("id_prezzo").value = prezzo;
        document.getElementById("sbm_button").setAttribute("type","button");
        document.getElementById("sbm_button").setAttribute("onclick","updateProduct()");
    }
}

function updateProduct(){
    alert("Ok");
}