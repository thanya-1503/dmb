
module.exports = function (app) {
    const userAccountCtrl = app.modules.userAccount.userAccountCtrl
  
    app.get('/api/userAccount', userAccountCtrl.list);
    
  }
  
  