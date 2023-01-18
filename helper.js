//Alerts all the chats the bot is in.
async function sendAll(client, message) {
  client.getChats().then(async (chats) => {
    for (let chat of chats) {
      await chat.sendMessage(message);
    }
  });
}

module.exports = { sendAll };
