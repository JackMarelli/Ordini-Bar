var json='[{"nome":"panino","prezzo":"1"},{"nome":"pizza","prezzo":"2"},{"nome":"kebab","prezzo":"50"}]';
const obj = JSON.parse(json);
var Quantita = [];
var x = 0;
var lunghezza = 0;
obj.forEach(element => {
    lunghezza++;
});

for (let index = 0; index < lunghezza; index++) {
    Quantita[index] = x; 
}
function incrementa(nome){
    var span = document.getElementById(nome); // find the <span> element in the DOM
    for(var i=0;i<lunghezza;i++){
        if(obj[i].nome == nome){
           Quantita[i] = Quantita[i]+1; 
           span.textContent = Quantita[i];
           break;
        }
    }   
}
function decrementa(nome){
    var span = document.getElementById(nome); // find the <span> element in the DOM
    for(var i=0;i<lunghezza;i++){
        if(obj[i].nome == nome){
            if(Quantita[i] != 0){
                Quantita[i] = Quantita[i]-1; 
                span.textContent = Quantita[i];
            }
           break;
        }
    }  
}