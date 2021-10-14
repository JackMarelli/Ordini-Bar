function vedipsw() {
    if (document.getElementById("id_password").type == "password") {
        document.getElementById("id_password").type = "text";
    }
    else if (document.getElementById("id_password").type == "text") {
        document.getElementById("id_password").type = "password";
    }
}
//psw mail:
//Redmenu2021