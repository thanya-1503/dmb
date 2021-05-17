module.exports = function (app) {
    const typeEmCtrl = app.modules.typeEm.typeEmCtrl
    app.get('/api/typeEm', typeEmCtrl.list);
    app.post('/api/createTypeEm', typeEmCtrl.createTypeEm);
  }