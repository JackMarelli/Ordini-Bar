function  selectProduct(pk, nome, prezzo){
    localStorage.setItem('pk', pk);
    localStorage.setItem('nome', nome);
    localStorage.setItem('prezzo', prezzo);
    window.location = '/administration/productdetails';
}