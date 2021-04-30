
module.exports = function (app) {
    const resourceCtrl = app.modules.users.usersCtrl
  
    app.get('/api/users', resourceCtrl.list);
    
  }
  
  