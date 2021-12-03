function loadDetails() {
    document.getElementById("nome_prodotto").innerHTML = localStorage.getItem('nome');
    document.getElementById("prezzo").innerHTML = localStorage.getItem('prezzo') + "€";
    localStorage.setItem('modifica', false);
}

function modifica() {
    localStorage.setItem('modifica', true);
    window.location.href = "/administration/modificaprodotto/" + localStorage.getItem('pk') + "/";
}

function rimuovi() {
    var res = confirm("Confermi l'eliminazione del prodotto?");

    if (res == true) {
        $.ajaxSetup({
            headers: {
                "X-CSRFToken": getCookie("csrftoken")
            }
        });

        $.ajax({
            url: "/administration/removeproduct",
            type: "POST",
            data: '{"pk":' + localStorage.getItem('pk') + '}',
            success: function (response) {
                window.location.href = "/administration/productlist"
            }
        });
    }
}

function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    } else {
        begin += 2;
    }
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
        end = dc.length;
    }
    return unescape(dc.substring(begin + prefix.length, end));
}