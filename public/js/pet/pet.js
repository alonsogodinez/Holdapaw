$(function () {
    var createPetBtn = $('#createPetBtn');
    var createPetForm = $('#createPetForm');

    createPetForm.on('submit', submitCreatePetForm);


    function submitCreatePetForm(e){
        e.preventDefault();
        createPet(e);

    }

    function createPet(e) {
        var createPetForm = document.forms.namedItem('createPetForm') ;
        var formData = new FormData(createPetForm);
//        formData.append('type', 'activist');

        var ajaxOptions = {
            url: '/mascotas/registrar',
            data: formData,
            processData: false,
            contentType: false
        };
        console.log(formData);
        $.post(ajaxOptions)
            .done(function (user) {
                toastr.success('Se registro correctamente');
            })
            .fail(function () {
                toastr.error('Ocurrio un error durante el registro');
            })
            .always(function () {

            });

    }
});