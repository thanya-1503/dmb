
module.exports = function (app) {
    const userAccountCtrl = app.modules.userAccount.userAccountCtrl
  
    app.post('/api/authLogin', userAccountCtrl.authLogin);
    app.get('/api/userAccount', userAccountCtrl.list);
    app.get('/api/searchUserAccount', userAccountCtrl.searchUserAccount);
    app.post('/api/createAccount', userAccountCtrl.createAccount);
   
  }
  
  