function check_errors(errors){
    // var json_obj = JSON.parse(errors);
    // if(json_obj.PASSERR == true){
    //     alert("Password inserita errata")
    // }
    // if(json_obj.EMAILERR == true){
    //     alert("Le email inserite non coincidono");
    // }
}

function check_emails(){
    var new_email = document.getElementById("new_email").value;
    var confirm_email = document.getElementById("confirm_email").value;
    var error_div = document.getElementById("email_error_div");
    var submit_email = document.getElementById("submit_email");

    if(new_email != confirm_email){
        error_div.innerHTML = "Le due email non corrispondono";
        submit_email.disabled = true
    }
    else{
        error_div.innerHTML = "";
        submit_email.disabled = false
    }

}

function check_passwords(){
    var nuova_password = document.getElementById("nuova_password").value;
    var conferma_password = document.getElementById("conferma_password").value;
    var error_div = document.getElementById("password_error_div");
    var submit_password = document.getElementById("submit_password");

    if(nuova_password != conferma_password){
        error_div.innerHTML = "Le due password non corrispondono";
        submit_password.disabled = true
    }
    else{
        error_div.innerHTML = "";
        submit_password.disabled = false
    }
}