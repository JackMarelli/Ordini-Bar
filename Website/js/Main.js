function login() {
    var ok = false;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var pagina = db.checkLogin(email, password)
    if (pagina == null) {

        return db.pagina;
    }
    return db.home;
}

function registrati() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (re.test(email)) {
        if (password.length >= 8) {
            db.aggiungiUtente(email,password); //oltre all'aggiunta deve mandare l'email di conferma
            return true;
        }
        else {
            return false; //non rispetta i campi
        }
    }
    else {
        false; //non rispetta i campi
    }
}