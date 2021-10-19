function vedipsw() {
    if (document.getElementById("pswinput").type == "password") {
        document.getElementById("pswinput").type = "text";
    }
    else if (document.getElementById("pswinput").type == "text") {
        document.getElementById("pswinput").type = "password";
    }
}

function overlaytranslate() {
    alert("f");
    document.getElementById("menubutton").style.transform = "translate(0, 0)";
}

//psw mail:
//Redmenu2021