module.exports.renderOrJSON = parameters => {
  
  var req = parameters.req;
  var res = parameters.res;
  var ctx = parameters.ctx;
  var view = parameters.view;
  if (req.xhr) return res.json (ctx);
  res.render (view, ctx);
  
};

module.exports.errorOrJSON = parameters => {

  const req = parameters.req;
  const res = parameters.res;
  const err = parameters.err;
  console.log(err);
  if (!req.xhr) return res.sendStatus (503);
  return res.status (503).send (err);
};

module.exports.sendOrJSON = parameters => {
  
  const req = parameters.req;
  const res = parameters.res;
  const obj = parameters.obj;
  
  if (!req.xhr) return res.sendStatus (200);
  return res.json (obj);
};