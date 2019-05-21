var path = require('path'),
fs = require("fs");

if(process.env.NODE_ENV == 'production') {
  exports.credentials = {
    key: fs.readFileSync(path.join(__dirname, './private/production/cal_dcs_nwncloud_com.key')),
    cert: fs.readFileSync(path.join(__dirname, './private/production/cal_dcs_nwncloud_com.crt'))
  }
} else if(process.env.NODE_ENV == 'lab') {
  exports.credentials = {
    key: fs.readFileSync(path.join(__dirname, './private/lab/domain.key')),
    cert: fs.readFileSync(path.join(__dirname, './private/lab/domain.crt'))
  }
} else if(process.env.NODE_ENV == 'develop') {
  // exports.credentials = {
//   key: fs.readFileSync(path.join(__dirname, './private/develop/server.key')),
//   cert: fs.readFileSync(path.join(__dirname, './private/develop/server.crt'))
// }
}