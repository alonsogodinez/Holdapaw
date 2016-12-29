
$ (function () {

  var socket = io(window.location.hostname);
  socket.on('connected', function (data) {
    // socket.emit('signin','alonxogs@gmail.com');
    console.log('connected');
    socket.emit('signin', localStorage.getItem('email'), function(cbmsg,sock){
      console.log(cbmsg+ "socketdi: "+ sock);
    });
  });



  socket.on('arrive',function(email){
    alert('el taxi ya llego');
  });

  socket.on('taxi location',function(data){
    console.log('latitud: '+ data.latitude);
  });



});