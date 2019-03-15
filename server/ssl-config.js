var path = require('path'),
fs = require("fs");

// Development
// exports.credentials = {
//   key: fs.readFileSync(path.join(__dirname, './private/local/server.key')),
//   cert: fs.readFileSync(path.join(__dirname, './private/local/server.crt'))
// }

// Production
exports.credentials = {
  key: fs.readFileSync(path.join(__dirname, './private/cal_dcs_nwncloud_com.key')),
  cert: fs.readFileSync(path.join(__dirname, './private/cal_dcs_nwncloud_com.crt'))
}