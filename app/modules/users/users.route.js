
module.exports = function (app) {
    const resourceCtrl = app.modules.users.usersCtrl
  
    app.get('/api/users', resourceCtrl.list);
  
//     app.use((err, req, res, next) => {
//       if (err) {
//         return res.json(resultRes(err).setResStat(res));
//       }
//       return next();
//   });
    
  }
  
  