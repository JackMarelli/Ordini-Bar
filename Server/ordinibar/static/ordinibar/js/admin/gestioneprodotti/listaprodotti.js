function  selectProduct(pk, nome, prezzo, modifica, tipo, aggiunte){
    localStorage.setItem('pk', pk);
    localStorage.setItem('nome', nome);
    localStorage.setItem('prezzo', prezzo);
    localStorage.setItem('modifica', modifica);
    localStorage.setItem('tipo', tipo);
    localStorage.setItem('aggiunte', aggiunte);
    window.location = '/administration/productdetails';
}