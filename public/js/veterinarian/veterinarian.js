$(function () {

    var createVeterinarianBtn = $('#createVeterinarianBtn');
    var createVeterinarianForm = $('#createVeterinarianForm');
    var createVeterinarianModal = $('#createVeterinarianModal').remodal();

    createVeterinarianForm
        .one('submit', function (e) {
            e.preventDefault();
            createVeterinarian(e);
        });

    function createVeterinarian(e) {

        var createVeterinarianForm = document.forms.namedItem("createVeterinarianForm");
        var formData = new FormData(createVeterinarianForm);
        formData.append('type', 'veterinarian');

        createVeterinarianBtn.attr('disabled',true);
        var ajaxOptions = {
            url: '/usuarios',
            data: formData,
            processData: false,
            contentType: false
        };

        $.post(ajaxOptions)
            .done(function () {
              toastr.success('Se registro correctamente');
              createVeterinarianForm.reset();
              //createVeterinarianModal.close();
              window.location = '/';
            })
            .fail(function () {
                toastr.error('Ocurrio un error durante el registro');
            })
            .always(function () {
                createVeterinarianBtn.attr("disabled", false)
            });
    }

});