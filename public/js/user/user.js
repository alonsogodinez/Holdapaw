$ (function () {

  var createUserBtn = $ ('#createUserBtn');
  var createUserForm = $ ('#createUserForm');
  var registrarUsuarioModal = $ ('#registrarUsuarioModal').remodal ();

  createUserForm.one('submit', submitCreateUserForm);

  function submitCreateUserForm (e) {
    e.preventDefault ();
    createUser (e);
  }

  function createUser () {
    //createUSerForm is a JSObject
    var createUserForm = document.forms.namedItem ('createUserForm');
    var formData = new FormData (createUserForm);
    formData.append ('type', 'activist');
    createUserBtn.attr ("disabled", true);
    var ajaxOptions = {
      url: '/usuarios', data: formData, processData: false, contentType: false
    };
    $.post (ajaxOptions)
      .done (function () {
        toastr.success ('Se registró correctamente');
        createUserForm.reset ();
        registrarUsuarioModal.close();
        //location.reload ();
      })
      .fail (function () {
        toastr.error ('Ocurrio un error durante el registro');
      })
      .always (function () {
        createUserBtn.attr ("disabled", false);
      });

  }
});