//toastr.options = {
//  "closeButton": false,
//  "debug": false,
//  "newestOnTop": false,
//  "progressBar": false,
//  "positionClass": "toast-top-right",
//  "preventDuplicates": true,
//  "onclick": null,
//  "showDuration": "0",
//  "hideDuration": "0",
//  "timeOut": "0",
//  "extendedTimeOut": "0"
//}

// Parsley Validator
try{

  $('form[data-parsley-validate]').parsley().on('field:validated', function () {
    var ok = $('.parsley-error').length === 0;
    $('.bs-callout-info').toggleClass('hidden', !ok);
    $('.bs-callout-warning').toggleClass('hidden', ok);
  });
} catch(e){
  console.log('no parsley imported')
}

toastr.options = {
  preventDuplicates: true,
  positionClass: 'toast-bottom-right',
  closeButton: true
};


