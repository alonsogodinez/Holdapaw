$(function () {

  var createDonationBtn = $ ('#createDonationBtn');
  var createDonationForm = $ ('#createDonationForm');
  var createDonationModal = $ ('#createDonationModal').remodal ();

  var verifyDonationBtn = $('.verifyDonation');

  createDonationForm.on('submit', submitCreateDonationForm);

  verifyDonationBtn.click(verifyDonation);

  function submitCreateDonationForm (e) {
    e.preventDefault ();
    createDonation (e);
  }

  function createDonation () {
    //createUSerForm is a JSObject
    var createDonationForm = document.forms.namedItem ('createDonationForm');
    var formData = new FormData (createDonationForm);
    formData.append ('type', 'activist');
    createDonationBtn.attr ("disabled", true);
    var ajaxOptions = {
      url: '/donaciones', data: formData, processData: false, contentType: false
    };
    $.post (ajaxOptions)
      .done (function () {
      toastr.success ('Se registró correctamente');
      createDonationForm.reset ();
      createDonationModal.close ();
    })
      .fail (function () {
      toastr.error ('Ocurrio un error durante el registro');
    })
      .always (function () {
      createDonationBtn.attr ("disabled", false);
    });

  }


  function verifyDonation(){

    var self = $(this);
    var ajaxOptions = {
      url: '/donaciones/' +self.data('id') +'/verify', processData: false, contentType: false
    };

    $.post (ajaxOptions)
      .done (function () {
        self.parent().append('<p> Verificado </p>');
        self.remove();

      })
      .fail (function (err) {
      console.log(err);
      toastr.error ('Ocurrio un error.');
    })
      .always (function () {

    });
  }
});