function set_status(status){
    var status_bar = document.getElementById("status");
    if(status == "doing"){
        status_bar.classList.add("doing");
        status_bar.innerHTML = "In preparazione";
    }
    if(status == "todo"){
        status_bar.classList.add("todo");
        status_bar.innerHTML = "In coda";
    }
}

function draw_qr(id){
    new QRCode(document.getElementById("qr"), "00" + id);//-->DA SISTEMARE
}