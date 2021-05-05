
module.exports = function (app) {
    const employeeCtrl = app.modules.employee.employeeCtrl
  
    app.get('/api/employee', employeeCtrl.list);
    
  }