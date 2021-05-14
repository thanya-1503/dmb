
module.exports = function (app) {
    const brandCtrl = app.modules.brand.brandCtrl
    app.get('/api/brand', brandCtrl.list);
    app.post('/api/createBrand', brandCtrl.createBrand);
  }