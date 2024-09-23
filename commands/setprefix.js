const fs = require('fs');
let config = require('../config.json');

module.exports = function(api, threadID, senderID, args) {
  if (senderID !== process.env.ADMIN_ID) {
    return api.sendMessage("Bạn không có quyền thay đổi prefix.", threadID);
  }

  const newPrefix = args[0];
  config[threadID] = { prefix: newPrefix };
  fs.writeFileSync('./config.json', JSON.stringify(config, null, 2));

  api.sendMessage(`Prefix đã được thay đổi thành: ${newPrefix}`, threadID);
};
