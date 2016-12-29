$(function () {
    var createClinicalAppointmentForm = $('#createClinicalAppointmentForm');

    createClinicalAppointmentForm.on('submit', submitCreateClinicalAppointmnetForm);


    function submitCreateClinicalAppointmnetForm(e){
        e.preventDefault();
        createClinicalAppointmnet();
    }

    function createClinicalAppointmnet() {
        var createClinicalAppointmentForm = document.forms.namedItem('createClinicalAppointmentForm') ;
        var params = {
            pet : createClinicalAppointmentForm.pet.value,
            obervations: createClinicalAppointmentForm.obervations.value,
            diagnosis: createClinicalAppointmentForm.diagnosis.value,
            recommendations : createClinicalAppointmentForm.recommendations.value,
            medicaments: createClinicalAppointmentForm.medicaments.value,
            indications: createClinicalAppointmentForm.indications.value,
            health : createClinicalAppointmentForm.health.value
        };
        console.log(params);
        var ajaxOptions = {
            url: '/atenciones/registrar',
            data: JSON.stringify(params),
            contentType: 'application/json'
        };
        console.log(params);
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
});