function  selectProduct(pk, nome, prezzo, modifica){
    localStorage.setItem('pk', pk);
    localStorage.setItem('nome', nome);
    localStorage.setItem('prezzo', prezzo);
    localStorage.setItem('modifica', modifica);
    window.location = '/administration/productdetails';
}