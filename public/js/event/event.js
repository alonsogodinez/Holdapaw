$(function () {
    var createEventForm = $('#createEventForm');
    createEventForm.on('submit', submitEventForm);

    function submitEventForm(e){
        e.preventDefault();
        createEvent();
    }

    function createEvent() {
        var createEventForm = document.forms.namedItem('createEventForm') ;
        var formData = new FormData(createEventForm);
        var ajaxOptions = {
            url: '/eventos/registrar',
            data: formData,
            processData: false,
            contentType: false
        };
        $.post(ajaxOptions)
            .done(function () {
                toastr.success('Se registró correctamente');
                window.location.reload();
            })
            .fail(function (err) {
                console.log(err);
                toastr.error('Ocurrio un error durante el registro');
            });
    }


    // Formulario edicion
    var editEventForm = $('#editEventForm');
    editEventForm.on('submit', submitEditEventForm);

    function submitEditEventForm(e){
        e.preventDefault();
        editEvent();
    }

    function editEvent() {
        var editEventForm = document.forms.namedItem('editEventForm') ;
        var formData = new FormData(editEventForm);
        var ajaxOptions = {
            url: '/eventos/editar/'+ window.eventId,
            data: formData,
            processData: false,
            contentType: false
        };
        $.post(ajaxOptions)
            .done(function () {
                toastr.success('Se editó correctamente');
            })
            .fail(function (err) {
                console.log(err);
                toastr.error('Ocurrio un error durante el registro');
            });
    }
});

function getInfo(url,event){
    window.eventId = event;
    var ajaxOptions = {
        url: url
    };
    $.get(ajaxOptions)
        .done(function (msg) {
            console.log(msg);
            window.location.href = '#editarEvento';
            $('#id_name_edit').val(msg.name);
            $('#id_from_edit').val(moment(msg.from).format('DD/MM/YYYY h:mm a'));
            $('#id_to_edit').val(moment(msg.to).format('DD/MM/YYYY h:mm a'));
            $('#id_place_edit').val(msg.place);
            $('#id_description_edit').val(msg.description);
        })
        .fail(function (err) {
            toastr.error('No se recibio información del servidor');
        });
}