module.exports = function(api, threadID) {
    api.getThreadInfo(threadID, (err, info) => {
      if (err) return console.error(err);
      const mentions = info.participantIDs.map(id => `@${id}`).join(' ');
      api.sendMessage(mentions, threadID);
    });
  };
  