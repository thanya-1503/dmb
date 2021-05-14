module.exports = function (app) {
    const siteCtrl = app.modules.site.siteCtrl
    app.get('/api/site', siteCtrl.list);
    app.post('/api/createSite', siteCtrl.createSite);
  }
  
  