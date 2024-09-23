module.exports = function(api, threadID) {
    const admins = JSON.parse(process.env.ADMIN_ID);
    api.sendMessage(`Admin hiện tại của bot: ${admins.join(', ')}`, threadID);
  };
  