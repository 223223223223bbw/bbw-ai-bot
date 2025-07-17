const TelegramBot = require('node-telegram-bot-api');
const token = '7748945460:AAF_nq_unzjwO8rUdSpoAwpfx1begDVv2ng';

const bot = new TelegramBot(token, { polling: true });

function getStrategy(coin) {
  const price = (Math.random() * 10000 + 30000).toFixed(0);
  return `【${coin} 策略】
开仓区间：${price - 500}~${price}
止盈：${+price + 2000}
止损：${+price - 2000}
仅供参考`;
}

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, '欢迎使用币圈谋士AI👇', {
    reply_markup: {
      keyboard: [['📈 BTC', '🔥 ETH'], ['💎 VIP套餐']],
      resize_keyboard: true,
    },
  });
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '📈 BTC') bot.sendMessage(chatId, getStrategy('BTC'));
  else if (text === '🔥 ETH') bot.sendMessage(chatId, getStrategy('ETH'));
  else if (text === '💎 VIP套餐') {
    bot.sendMessage(chatId, `VIP套餐说明：
🆓 免费试用1天
📅 月卡：29元
📦 季卡：69元
📆 年卡：199元
💎 永久卡：499元`);
  }
});
