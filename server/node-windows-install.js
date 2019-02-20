var Service = require('node-windows').Service;

var EventLogger = require('node-windows').EventLogger;

var log = new EventLogger('Hello World');

log.info('Basic information.');
log.warn('Watch out!');
log.error('Something went wrong.');

// Create a new service object
var svc = new Service({
  name:'DCSS Calendar',
  description: 'Runs DCSS calendar.',
  script: 'C:\\DCSS\\dcss-calendar\\server\\server.ts',
  env: [{
    name: "DB_HOST",
    value: "DCS02GAD001"
  },
  {
    name: "DB_PASS",
    value: "August2018!"
  },
  {
    name: "DB_USER",
    value: "dcss_local_user"
  },
  {
    name: "TIME_ZONE",
    value: "America/Los_Angeles"
  },
  {
    name: "DB",
    value: "dcss_calendar"
  },
  {
    name: "FILE_STORAGE_PATH",
    value: 'C:\\DCSS\\dcss-calendar\\server\\storage\\'
  },
  ]
 });

// Listen for the "install" event, which indicates the
// process is available as a service.
 svc.on('install',function(){
   svc.start();
 });

 svc.install();


