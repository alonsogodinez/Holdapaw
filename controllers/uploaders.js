"use strict";


const fs = require ('fs');
const Dropbox = require ('dropbox');
const configDropBox = require ('../config').dropbox;

const clientDropbox = new Dropbox.Client ({

  key: configDropBox.key, secret: configDropBox.secret, token: configDropBox.token
});


module.exports = function upload (params) {

  let service = params.service;
  let file = params.file;
  return new Promise (function(resolve, reject) {

    fs.readFile ('/tmp/' + file.filename, (error, data) => {

      if (error) return reject (error);
      if (service === 'dropbox') {
        
        //TODO refactor dropbox wrapper to promises

        clientDropbox.writeFile (file.filename, data, (error, stat) => {

          const isPNG = stat.mimeType.split ('/')[1] === 'png';

          clientDropbox.revisions (stat.path, {png: isPNG}, error => {

            if (error) return reject (error);
            const thumbnail = clientDropbox.thumbnailUrl (stat.path);
            const file = thumbnail.replace ('thumbnails', 'files');
            resolve ({file: file, thumbnail: thumbnail});
          });
        });
      }
    });
  });
};

//