module.exports = function(api, senderID, args) {
    if (senderID !== process.env.ADMIN_ID) {
      return api.sendMessage("Bạn không có quyền gửi thông báo.", senderID);
    }
  
    const message = args.join(' ');
    api.getThreadList(100, null, [], (err, list) => {
      if (err) return console.error(err);
      list.forEach(thread => {
        api.sendMessage(message, thread.threadID);
      });
    });
  };
  