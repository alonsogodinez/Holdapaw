

module.exports = function(){

  io.on('connection', socket => {

    //io.to(socket.id).emit('test',{'socket':socket.id});
    socket.emit('connected');

    socket.on('signin',signin);
    socket.on('request adoption', requestAdoption);
    socket.on('accept adoption', acceptRequest);

    function requestAdoption(userId, petId){
      //TODO
    }

    function acceptRequest(){
      //TODO
    }

    function signin (_id, cb) {

      User.findOne({_id}).exec()
        .then( (err, user) => {
          if(!user) return cb('error');
          user.socketid = socket.id;
          return user.save()
            .then(user => cb('OK'))
            .catch(err => cb('error'))
      });
    }
  });
};
