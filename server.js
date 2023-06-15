const TelegramBot = require('node-telegram-bot-api');
const telegramToken = '5971746022:AAGpb2GzsSPSCKhHPIc2LzJ45EQI0Pya8Bc';
const bot = new TelegramBot(telegramToken, { polling: true });

let menuChoice = {}

function sendMessage(chatId, message) {
    return new Promise((resolve, reject) => {
      bot.sendMessage(chatId, message)
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  }

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome to 2SettleHQ!, my name is Alice, i am 2settleHQ vitual assistance, say "hello Alice" to start a conversation');
  });

bot.onText(/hello|hi|hey/i, (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.chat.first_name
   const message = `Welcome to 2SettleHQ ${firstName}, how can i help you today?\n You can select your options by using the numbers`;
     const menuOptions = [
        '1. Request for paycard',
        '2. Be a merchant'
      ];
      const message2 = 'Here is your menu:\n' + menuOptions.join('\n');
      menuChoice[chatId] = 'mainMenu';
      sendMessage(chatId, message)
      .then(() => sendMessage(chatId, message2))
      .catch((error) => {
        console.error("Error sending messages:", error);
      });
})

bot.onText(/\d+/, (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    if (menuChoice[chatId] === 'mainMenu') {
      handleMainMenu(chatId, messageText);
    } 
    else if (menuChoice[chatId] === 'subMenu') {
      handleSubMenu(chatId, messageText);
    } 
     else if (menuChoice[chatId] === 'exitMenu') {
      handleExitMenu(chatId, messageText);
    }

  });



 function handleMainMenu(chatId, choice){
     if(choice === '1'){
        const menuOptions = [
            'Bank details',
            'Phone Number',
            'Address'
          ];
      bot.sendMessage(chatId, 'You will be directed to a KYC link this details are required:\n' + menuOptions.join('\n'))
     .then(() => {
        const menuOptions = [
            '1. Continue',
            '2. Cancel'
          ];
      bot.sendMessage(chatId,  menuOptions.join('\n'));
 
      menuChoice[chatId] = 'subMenu';
    });
    }
     
     
     else if(choice === '2') {
    bot.sendMessage(chatId, 'This feature is coming soon!')
    .then(() => {
        const menuOptions = [
            '1. Request for paycard',
            '2. Be a merchant'
          ];
      bot.sendMessage(chatId, 'Here is your menu:\n' + menuOptions.join('\n'));
      
    });
     menuChoice[chatId] = 'mainMenu';
 }
}
 
function handleSubMenu(chatId, choice){
     if(choice === '1'){
        const link = `click this link: https://vendor.2settle.io`
        bot.sendMessage(chatId, link)
        .then(() => {
            const menuOptions = [
                '1. Completed',
                '2. Exit' 
              ];
          bot.sendMessage(chatId, 'Here is your menu:\n' + menuOptions.join('\n'));
          menuChoice[chatId] = 'exitMenu'
        });
     }else if(choice === '2'){
        bot.sendMessage(chatId, 'Thank you');
     }
}
function handleExitMenu(chatId, choice){
  if(choice === '1'){
    bot.sendMessage(chatId, `Thank you for the completion, hope to see you again.`);
  }else if(choice === '2'){
    bot.sendMessage(chatId, `Thank you, Hope to see you again`);
  } 
} 
