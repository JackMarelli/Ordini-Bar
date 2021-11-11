var dati;
const ordine = "ordine1";
let promise = new Promise(function(Resolve){
    fetch("../js/tmp.json").then(response => Resolve( response.json()));
});
promise.then(
    function(value){
        let json = value;
        caricaPagina(json);
});

function caricaPagina(json){
    /*
    for (let i = 0; i < json.length; i++) {
        for (let j = 0; j < json[i].ordine.length; j++) {
            console.log(json[i].ordine[j]);
        }
    }
    ciclo per prendere i singoli elementi.
    */ 
    const divOrdine = document.querySelector("div");
   const divNome = document.querySelector("div");
   const divTotale = document.querySelector("div");
 
}