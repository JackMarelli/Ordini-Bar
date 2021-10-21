function vedipsw() {
    if (document.getElementById("id_password").type == "password") {
        document.getElementById("id_password").type = "text";
    }
    else if (document.getElementById("id_password").type == "text") {
        document.getElementById("id_password").type = "password";
    }
}

function overlayTranslateIn() {
    document.getElementById("overlaymenu").style.transform = "translate(0, 0)";
    document.getElementById("menubutton").style.visibility = hidden;
}

function overlayTranslateOut() {
    document.getElementById("overlaymenu").style.transform = "translate(0, -100%)";
    document.getElementById("menubutton").style.visibility = visible;
}

//psw mail:
//Redmenu2021