module.exports = function (app) {
    const modelCtrl = app.modules.model.modelCtrl
    app.get('/api/assetModel', modelCtrl.list);
    app.post('/api/createAssetModel', modelCtrl.createModel);
  }
  
  