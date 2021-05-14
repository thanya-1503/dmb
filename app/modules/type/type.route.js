module.exports = function (app) {
    const typeCtrl = app.modules.type.typeCtrl
    app.get('/api/type', typeCtrl.list);
    app.post('/api/createType', typeCtrl.createType);
  }
  
  
  