
module.exports = function (app) {
    const employeeCtrl = app.modules.employee.employeeCtrl
  
    app.get('/api/employee', employeeCtrl.list);
    app.get('/api/searchEmployee', employeeCtrl.searchEmployee);
    //app.post('/api/createEmployee', employeeCtrl.createEmployee);
    app.post('/api/createEmployee', employeeCtrl.createEmployee);
    app.get('/api/listemployee', employeeCtrl.listemployee);
  }