var server = require('./server.ts');
var ds = server.dataSources.db;

var lbTables = ['AccessToken', 'ACL', 'RoleMapping', 'Role', 'Queue', 'Schedule', 'Holiday', 'HolidayList', 'Prompt', 'SingleDateTimeRange', 'RecurringTimeRange', 'Lcsa'];
// var lbTables = ['Queue','SingleDateTimeRange'];


ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' + lbTables + '] created in ', ds.adapter.name);
  ds.disconnect();
});


// ds.autoupdate(lbTables, function (er, result) {
//   if (er) throw er;
//   console.log("auto update result", result)
// });
