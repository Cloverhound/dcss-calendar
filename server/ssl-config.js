var path = require('path'),
fs = require("fs");
// exports.privateKey = fs.readFileSync(path.join(__dirname, './private/local/server.key')).toString();
// exports.certificate = fs.readFileSync(path.join(__dirname, './private/local/server.crt')).toString();
// exports.privateKey = fs.readFileSync(path.join(__dirname, './private/cal_dcs_nwncloud_com.key')).toString();
// exports.certificate = fs.readFileSync(path.join(__dirname, './private/cal_dcs_nwncloud_com.crt')).toString();

exports.credentials = {
  key: fs.readFileSync(path.join(__dirname, './private/local/server.key')),
  cert: fs.readFileSync(path.join(__dirname, './private/local/server.crt'))
}