

$ (function () {

  var createPetBtn= $('#createPetBtn');
  var createPetForm= $('#createPetForm');
  var createPetModal = $('#createPetForm');

  if(window.location.pathname == '/adopciones') $('#postAdoption').parent().addClass('active');



  createPetForm
    .on('field:validated', setFieldsValidated)
    .on('submit',submitCreatePetForm);
  

  
  function submitCreatePetForm(e){
    e.preventDefault();
    createPet(e);
  }
  
  function createPet(e){

    var createPetForm = document.forms.namedItem('createPetForm');
    var formData = new FormData(createPetForm);
    formData.append('type','asfsafsa');

    var ajaxOptions = {
      url: '/adopciones',
      data: formData,
      processData: false,
      contentType: false
    };


    $.post(ajaxOptions)
      .done(function (pet) {
        toastr.success('Se registro con exito');
        createPetForm.reset();
        location.reload(); //while not ajax refresh on lists
      })
      .fail(function (err) {
        toastr.error('Ocurrio un error durente el registro');
      })
      .always(function () {

      })
  }


  // INDEX PAGE
  $('.requestAdoption').click(requestAdoption);
  $('.cancelAdoption').click(cancelAdoption);


  function requestAdoption(e){
    var self = $(this)
    self.attr('disabled',true);

    $.post('/adopciones/request/'+ self.data('id') )
      .done(function () {
        self.removeClass('btn-naranjita');
        ;
        self.addClass('cancelAdoption');
        self.addClass('btn-rojito');
        self.removeClass('requestAdoption');
        self.unbind('click');
        self.click(cancelAdoption);
        self.html('Cancelar');
      })
      .fail(function (err) {
        toastr.error('Ocurrio un error intente nuevamente');
      })
      .always(function () {
        self.attr('disabled',false);
      })

  }


  function cancelAdoption(e){
    var self = $(this)
    self.attr('disabled',true);

    $.post('/adopciones/cancel/'+ self.data('id') )
      .done(function () {
        self.removeClass('btn-rojito');

        self.addClass('requestAdoption');
        self.addClass('btn-naranjita');
        self.removeClass('cancelAdoption');
        self.unbind('click');
        self.click(requestAdoption);
        self.html('Adoptar');
      })
      .fail(function (err) {
        toastr.error('Ocurrio un error intente nuevamente');
      })
      .always(function () {
        self.attr('disabled',false);
      })

  }








});