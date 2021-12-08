function check_password(){
    var password = document.getElementById("password").value;
    var conferma_password = document.getElementById("conferma_password").value;
    var submit_password = document.getElementById("submit_password");

    if(password != conferma_password){
        document.getElementById("errore_password").innerHTML = "Le due password non corrispondono";
        submit_password.disabled = true;
    }
    else{
        document.getElementById("errore_password").innerHTML = "";
        submit_password.disabled = false;
    }
}