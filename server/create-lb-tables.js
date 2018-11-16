var server = require('./server');
var ds = server.dataSources.db;
var lbTables = ['AccessToken', 'ACL', 'RoleMapping', 'Role', 'Queue', 'Schedule', 'Holiday', 'HolidayList'];
// var lbTables = ['Schedule', 'Holiday'];
ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' + lbTables + '] created in ', ds.adapter.name);
  ds.disconnect();
});

// ds.isActual(lbTables, function (er, actual) {
//   console.log('actual', actual);

//   if (actual) {
//     ds.autoupdate(lbTables, function (er, result) {
//       console.log('result', result);

//       if (er) throw er;
//       console.log('Loopback tables [' + lbTables + '], have the result of [' + result + '] in ', ds.adapter.name);
//       ds.disconnect();
//     });
//   }
// });


// ds.autoupdate(lbTables, function (er, result) {
//   ds.discoverModelProperties('Schedule', function (err, props) {
//     console.log(props);
//   });
// });
