
module.exports = function (app) {
    const employeeAssetCtrl = app.modules.employeeAsset.employeeAssetCtrl
  
    app.get('/api/employeeAsset', employeeAssetCtrl.list);
    
  }