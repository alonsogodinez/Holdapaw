$(function () {

    var createAssociationBtn = $('#createAssociationBtn');
    var createAssociationForm = $('#createAssociationForm');
    var createAssociationModal = $('#createAssociationModal').remodal();

    createAssociationForm
        .on('submit', function (e) {
            e.preventDefault();
            createAssociation(e);
        });

    function createAssociation(e) {

        var createAssociationForm = document.forms.namedItem("createAssociationForm");
        var formData = new FormData(createAssociationForm);
        formData.append('type', 'association');

        createAssociationBtn.attr ("disabled", true);
        var ajaxOptions = {
            url: '/usuarios',
            data: formData,
            processData: false,
            contentType: false
        };

        $.post(ajaxOptions)
            .done(function (associations) {
                toastr.success('Se registro correctamente');
                createAssociationForm.reset();
                //createAssociationModal.close();
                location.reload();
            })
            .fail(function (err) {
                toastr.error('Ocurrio un error durante el registro');
            })
            .always(function () {
              createAssociationBtn.attr ("disabled", false);
            });
    }
});