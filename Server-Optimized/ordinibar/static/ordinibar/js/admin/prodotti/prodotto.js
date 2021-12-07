function eliminaProdotto(id) {
    var confirm = window.confirm("Sei sicuro di voler eliminare il prodotto selezionato?");

    if (confirm == true) {
        var data = {
            "pk": parseInt(id),
        }

        var request_string = JSON.stringify(data);

        $.ajaxSetup({
            headers: {
                "X-CSRFToken": getCookie("csrftoken")
            }
        });

        $.ajax({
            url: "/eliminaprodotto",
            type: "POST",
            data: request_string,
            success: function (ajax_results) {
                window.location.href = "/listaprodotti";
            }
        });
    }
}

function cambiaNomeProdotto(id) {
    var data = {
        "pk": parseInt(id),
        "nome": document.getElementById("nuovo_nome").value,
    }

    var request_string = JSON.stringify(data);

    $.ajaxSetup({
        headers: {
            "X-CSRFToken": getCookie("csrftoken")
        }
    });

    $.ajax({
        url: "/cambianomeprodotto",
        type: "POST",
        data: request_string,
        success: function (ajax_results) {
            window.location.href = "/listaprodotti";
        }
    });

}

function cambiaPrezzoProdotto(id) {
    var data = {
        "pk": parseInt(id),
        "prezzo": parseFloat(document.getElementById("nuovo_prezzo").value),
    }

    var request_string = JSON.stringify(data);

    $.ajaxSetup({
        headers: {
            "X-CSRFToken": getCookie("csrftoken")
        }
    });

    $.ajax({
        url: "/cambiaprezzoprodotto",
        type: "POST",
        data: request_string,
        success: function (ajax_results) {
            window.location.href = "/listaprodotti";
        }
    });

}

var aggiunte = false;
function setAggiunte(a) {
    aggiunte = (a === 'true');
    var aggiunte_div = document.getElementById("aggiunte");
    if (aggiunte == true) {
        aggiunte_div.innerHTML = "Togli aggiunte";
    }
    else {
        aggiunte_div.innerHTML = "Attiva aggiunte";
    }
}

function reverseAggiunte(id) {
    aggiunte = !aggiunte;

    var data = {
        "pk": parseInt(id),
        "aggiunte": aggiunte,
    }

    var request_string = JSON.stringify(data);

    $.ajaxSetup({
        headers: {
            "X-CSRFToken": getCookie("csrftoken")
        }
    });

    $.ajax({
        url: "/setaggiunte",
        type: "POST",
        data: request_string,
        success: function (ajax_results) {
            var aggiunte_div = document.getElementById("aggiunte");
            if (aggiunte == true) {
                aggiunte_div.innerHTML = "Togli aggiunte";
            }
            else {
                aggiunte_div.innerHTML = "Attiva aggiunte";
            }
        }
    });


}