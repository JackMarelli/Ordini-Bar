function vedipsw() {
    if (document.getElementById("pswinput").type == "password") {
        document.getElementById("pswinput").type = "text";
    }
    else if (document.getElementById("pswinput").type == "text") {
        document.getElementById("pswinput").type = "password";
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