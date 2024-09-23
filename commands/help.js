module.exports = function(api, threadID) {
    const commands = `
    Các lệnh bot hỗ trợ:
    - ping: Tag toàn bộ thành viên
    - welcome: Tự động chào khi có thành viên mới
    - noti: Admin gửi thông báo vào các group
    - setprefix: Thay đổi prefix cho group
    - adminlist: Xem danh sách admin của bot
    - setadmin: Set admin cho box
    - id: Xem ID của người dùng
    - idgr: Xem ID của group chat
    - outbox: Admin out box
    `;
    api.sendMessage(commands, threadID);
  };
  