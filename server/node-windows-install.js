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
  env: [
  {
    name: "DB_HOST",
    value: "sqllistener01.cc.nwncloud.com"
  },
  {
    name: "DB_PORT",
    value: "1433"
  },
  {
    name: "DB",
    value: "dcss_calendar"
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
    name: "DB_MULTI_SUB_FAILOVER",
    value: "true"
  },
  {
    name: "TIME_ZONE",
    value: "America/Los_Angeles"
  },
  {
    name: "FILE_STORAGE_PATH",
    value: 'C:\\DCSS\\dcss-calendar\\storage\\'
  },
  {
    name: "LOGS_STORAGE_PATH",
    value: 'C:\\DCSS\\dcss-calendar-022719\\logs\\'
  },
  {
    name: "HTTP_PORT",
    value: '80'
  },
  {
    name: "HTTPS_PORT",
    value: '443'
  },
  ]
 });

// Listen for the "install" event, which indicates the
// process is available as a service.
 svc.on('install',function(){
   svc.start();
 });

 svc.install();


