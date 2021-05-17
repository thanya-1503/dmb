module.exports = function (app) {
    const positionCtrl = app.modules.position.positionCtrl
    app.get('/api/position', positionCtrl.list);
    app.post('/api/createposition', positionCtrl.createPosition);
  }
  