const login = require('facebook-chat-api');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();

const appStateFile = './appstate.json';
let config = require('./config.json');

// Kiểm tra nếu appstate đã tồn tại
if (fs.existsSync(appStateFile)) {
  // Sử dụng appstate đã có
  login({appState: require(appStateFile)}, (err, api) => {
    if (err) return console.error(err);
    startBot(api);
  });
} else {
  // Nếu không có appstate, cần đăng nhập bằng email và password
  login({email: 'your_email', password: 'your_password'}, (err, api) => {
    if (err) return console.error(err);
    fs.writeFileSync(appStateFile, JSON.stringify(api.getAppState()));
    startBot(api);
  });
}

// Hàm để khởi động bot
function startBot(api) {
  api.setOptions({listenEvents: true});

  api.listenMqtt((err, event) => {
    if (err) return console.error(err);

    // Hiển thị tin nhắn và thời gian
    if (event.type === 'message') {
      const timestamp = new Date(event.timestamp);
      const timeString = timestamp.toLocaleTimeString('vi-VN');
      const message = `${timeString} - ${event.senderID}: ${event.body}`;
      console.log(message);  // Hiển thị tin nhắn lên console
    }

    // Chào mừng thành viên mới
    if (event.type === 'event' && event.logMessageType === 'log:subscribe') {
      const newUserId = event.logMessageData.addedParticipants[0].userFbId;
      api.sendMessage(`Welcome to the group, <@${newUserId}>!`, event.threadID);
    }

    // Xử lý lệnh
    if (event.type === 'message') {
      const threadID = event.threadID;
      const senderID = event.senderID;
      let prefix = config[threadID]?.prefix || process.env.PREFIX;

      // Tách lệnh và tham số
      if (event.body.startsWith(prefix)) {
        const [command, ...args] = event.body.slice(prefix.length).trim().split(/\s+/);

        // Xử lý các lệnh
        switch (command) {
          case 'ping':
            require('./commands/ping')(api, threadID);
            break;
          case 'noti':
            require('./commands/noti')(api, senderID, args);
            break;
          case 'setprefix':
            require('./commands/setprefix')(api, threadID, senderID, args);
            break;
          case 'adminlist':
            require('./commands/adminlist')(api, threadID);
            break;
          case 'setadmin':
            require('./commands/setadmin')(api, threadID, senderID, args);
            break;
          case 'id':
            require('./commands/id')(api, threadID, senderID);
            break;
          case 'idgr':
            require('./commands/idgr')(api, threadID);
            break;
          case 'outbox':
            require('./commands/outbox')(api, senderID, args);
            break;
          case 'help':
            require('./commands/help')(api, threadID);
            break;
          default:
            break;
        }
      }
    }
  });

  // Hiển thị thông tin Admin
  console.log("Admin Source: Đỗ Đăng Khoa");
}
