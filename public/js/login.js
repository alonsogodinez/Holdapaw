$ (function () {
  //DOM
  var userEmail = $ ('#loginUserEmail');
  var userPassword = $ ('#loginUserPassword');
  var loginUserBtn = $ ('#loginUserBtn');
  var loginForm = $ ('#loginForm');

  //EVENTS
  loginForm.on ('submit', function (e) {
      e.preventDefault ();
      loginUser (e);
    });

  //INITS
  toastr.options = {
    preventDuplicates: true, positionClass: 'toast-bottom-right'
  };

  //FUNCTIONS
  function loginUser () {
    var params = {
      email: userEmail.val (), password: userPassword.val ()
    };

    $.post ('/login', params)
      .done (function (user) {
        toastr.success ('Bienvenido ' + user.firstName + '!');
        window.location = '/';
      })
      .fail (function (err) {

        var msg = err.responseJSON.error;
        if (msg === 'Wrong password')
          msg = 'Contraseña incorrecta. Intente nuevamente';

        else if (msg === 'Email not found')
          msg = 'Email incorrecto. Intente nuevamente';

        else if (msg === 'Not Verified')
          msg = 'Su cuenta no esta verificada por favor revise su correo.';

        else
          msg = 'Error en servidor. Intente nuevamente';

        toastr.error (msg);

      })
      .always(function () {

      })

  }


});