var aggiunte = false;
var tipo = "Salato";

function inverti_tipo(){
    if(tipo == "Salato"){
        tipo = "Dolce";
        document.getElementById("tipo").innerHTML = "Rendi salato";
    }
    else{
        tipo = "Salato";
        document.getElementById("tipo").innerHTML = "Rendi dolce";
    }
}

function inverti_aggiunte(){
    aggiunte = !aggiunte;
    if(aggiunte){
        document.getElementById("aggiunte").innerHTML = "Togli aggiunte";
    }
    else{
        document.getElementById("aggiunte").innerHTML = "Attiva aggiunte";
    }
}

function send_prodotto(){
    var nome = document.getElementById("nome").value;
    var prezzo = parseFloat(document.getElementById("prezzo").value);
    var product_obj = {
        nome:nome,
        prezzo:prezzo,
        tipo:tipo,
        aggiunte:aggiunte,
    };

    var json_string = JSON.stringify(product_obj);
    

    $.ajaxSetup({
        headers: {
            "X-CSRFToken": getCookie("csrftoken")
        }
    });

    $.ajax({
        url: "/addnewproduct",
        type: "POST",
        data: json_string,
        success: function (ajax_results) {
            if(ajax_results.risposta){
                window.location.href = "listaprodotti";
            }
            else{
                alert("Esiste già un prodotto con questo nome");
            }
        }
    });
}