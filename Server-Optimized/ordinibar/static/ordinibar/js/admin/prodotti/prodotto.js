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

function cambiaNomeProdotto(id){
        var data = {
            "pk": parseInt(id),
            "nome":document.getElementById("nuovo_nome").value,
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