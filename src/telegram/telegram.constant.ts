import { SendBasicOptions } from "node-telegram-bot-api"

export const telegramSendWelcome = (telegramName: string) => {
    const author = '*From TuDinh*'
    return `
${author}

Yay *${telegramName}*!
Congratulations to you for activating this BOT learning application.

🎉 I want to express my gratitude to the teams that helped me finish this BOT, including:
❤️ The Oxford Dictionary: https://www.oxfordlearnersdictionaries.com
❤️ The American voice accent from Oxford: https://www.oxfordlearnersdictionaries.com
❤️ Pictures from Pexels: https://www.pexels.com
❤️ The Telegram platform for BOT interaction: https://telegram.org
I would also like to thank my family, friends, and colleagues for their ongoing support throughout the process.

👉 Please follow me.
Youtube : https://youtube.com/tudinh
Facebook: https://fb.com/tudinhacoustic
`
}
export const welcomeKeyboard: SendBasicOptions = {
    reply_markup: {
        keyboard:[
            [
                {text: 'Study now'},
                {text: 'Vocabulary groups'}
            ],
            [
                {text: 'Support'},
                {text: 'Join our team'}
            ],
            [
                {text: 'Buy me a coffee'}
            ]
        ],
        resize_keyboard: true
    },
}