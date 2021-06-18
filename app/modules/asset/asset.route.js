
module.exports = function (app) {
    const assetCtrl = app.modules.asset.assetCtrl
    
    app.get('/api/asset', assetCtrl.list);
    app.get('/api/searchAsset', assetCtrl.searchAsset);
    app.post('/api/createAsset', assetCtrl.createAsset);
    app.get('/api/listasset', assetCtrl.listasset);
  }
  
  