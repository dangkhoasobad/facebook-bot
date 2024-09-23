const fs = require('fs');
let config = require('../config.json');

module.exports = function(api, threadID, senderID, args) {
  if (senderID !== process.env.ADMIN_ID) {
    return api.sendMessage("Bạn không có quyền set admin.", threadID);
  }

  const newAdminID = args[0].replace(/@/g, '');
  if (!config.admins) config.admins = [];
  config.admins.push(newAdminID);
  fs.writeFileSync('./config.json', JSON.stringify(config, null, 2));

  api.sendMessage(`Đã thêm <@${newAdminID}> làm admin.`, threadID);
};
