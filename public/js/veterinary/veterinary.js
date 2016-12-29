$(function(){

  var createVeterinaryBtn = $('#createVeterinaryBtn');
  var createVeterinaryForm = $('#createVeterinaryForm');
  var createVeterinaryModal = $('#createVeterinaryModal').remodal();

    createVeterinaryForm
        .on('submit', submitCreateVeterinary);

  function submitCreateVeterinary(e){
    e.preventDefault();
    createVeterinary(e);
  }

  function createVeterinary(e){

    var createVeterinaryForm = document.forms.namedItem("createVeterinaryForm");
    var formData = new FormData (createVeterinaryForm);
    formData.append('type','veterinarian');
    createVeterinaryBtn.attr('disabled', true);
    var ajaxOptions = {
      url : '/clinicas',
      data : formData,
      processData: false,
      contentType: false
    };

    $.post(ajaxOptions)
      .done(function(veterinaries){
        toastr.success('Se registro correctamente');
        createVeterinaryForm.reset();
        createVeterinaryModal.close();
        window.location = '/'
      })
      .fail(function(){
        toastr.error('Ocurrio un error al registrar');
      })
      .always(function(){
        createVeterinaryBtn.attr('disabled',false);
      });
  }

});