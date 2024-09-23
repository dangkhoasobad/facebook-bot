module.exports = function(api, senderID, args) {
    if (senderID !== process.env.ADMIN_ID) {
      return api.sendMessage("Bạn không có quyền out box.", senderID);
    }
  
    const groupID = args[0];
    api.removeUserFromGroup(senderID, groupID, err => {
      if (err) return console.error(err);
      api.sendMessage("Bot đã rời khỏi nhóm.", senderID);
    });
  };
  