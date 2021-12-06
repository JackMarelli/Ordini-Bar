var obj = null;

function load_json_object(json_string){
    obj = JSON.parse(json_string);
}

function load_ordine(id){
    id = parseInt(id);
    var order = obj[id - 1];
    var lista_prodotti = order.prodotti;
    localStorage.setItem("json", JSON.stringify(lista_prodotti));
    window.location.replace("/ordine");
}