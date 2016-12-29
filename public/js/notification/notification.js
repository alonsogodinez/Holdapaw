$ (function () {
  $ ('#checkNotifications').parent ().addClass ('active');


  $ ('.declineAdoption').click (declineAdoption);
  $ ('.confirmAdoption').click (confirmAdoption);

  function declineAdoption () {
    var self = $ (this);
    self.attr ('disable', true);
    var body = {
      sender: self.data ('sender')
    };
    $.post ('/adopciones/decline/' + self.data ('id'), body).done (function () {
      toastr.success ('Se completo la operacion con exito');
      self.parent ().remove ();
    }).fail (function () {
      toastr.error ('Ocurrió un error inesperado, intente nuevamente');
    }).always (function () {
      self.attr ('disable', false);
    })
  }

  function confirmAdoption () {
    var self = $ (this);
    self.attr ('disable', true);
    var body = {
      owner_id: self.data ('sender')
    };
    $.post ('/adopciones/confirm/' + self.data ('id'), body).done (function () {
      toastr.success ('Se completo la operacion con exito');
      self.parent ().remove ();
    }).fail (function () {
      toastr.error ('Ocurrió un error inesperado, intente nuevamente');
    }).always (function () {
      self.attr ('disable', false);
    })
  }
});