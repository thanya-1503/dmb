
module.exports = function (app) {
    const assetCtrl = app.modules.asset.assetCtrl
  
    app.get('/api/asset', assetCtrl.list);
    
  }
  
  