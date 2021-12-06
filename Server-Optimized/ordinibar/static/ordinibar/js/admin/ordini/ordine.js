function cambia_stato_ordine(pk,nuovo_stato){
    $.ajaxSetup({
        headers: {
          "X-CSRFToken": getCookie("csrftoken")
        }
      });
    
      var data = {
        pk:parseInt(pk),
        new_status:nuovo_stato,
      }

      //get informations
      $.ajax({
        url: "/changeorderstatus",
        type: "POST",
        data: JSON.stringify(data),
        success: function (response) {
          //Visualizzazione di prezzo e orario
        }
      });
}