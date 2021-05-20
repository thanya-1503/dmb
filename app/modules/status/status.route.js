module.exports = function (app) {
    const statusCtrl = app.modules.status.statusCtrl
    app.get('/api/status', statusCtrl.list);
    app.post('/api/createStatus', statusCtrl.createStatus);
    app.put('/api/updateStatus/:_id', statusCtrl.updateStatus);
    app.delete('/api/deleteStatus/:_id', statusCtrl.deleteStatus);
  }