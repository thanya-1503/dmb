module.exports = function (app) {
    const modelCtrl = app.modules.model.modelCtrl
    app.get('/api/model', modelCtrl.list);
    app.post('/api/createModel', modelCtrl.createModel);
  }
  
  