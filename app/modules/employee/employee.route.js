
module.exports = function (app) {
    const employeeCtrl = app.modules.employee.employeeCtrl
  
    app.get('/api/employee', employeeCtrl.list);
    app.get('/api/searchEmployee', employeeCtrl.searchEmployee);
  
  }