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
}

function overlayTranslateOut() {
    document.getElementById("overlaymenu").style.transform = "translate(0, -100%)";
}

//psw mail:
//Redmenu2021