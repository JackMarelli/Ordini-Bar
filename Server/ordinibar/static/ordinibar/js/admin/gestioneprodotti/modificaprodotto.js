function loadCheckbox(tipo, aggiunte){
    check_dolce = document.getElementById("id_tipo_0");
    check_salato = document.getElementById("id_tipo_1");
    check_aggiunte = document.getElementById("id_aggiunte_0");

    if(tipo == "Dolce"){
        check_dolce.checked = true;
        check_salato.checked = false;
    }
    else if(tipo == "Salato"){
        check_dolce.checked = false;
        check_salato.checked = true;
    }

    if(aggiunte == "False"){
        check_aggiunte.checked = false;
    }
    else{
        check_aggiunte.checked = true;
    }
}