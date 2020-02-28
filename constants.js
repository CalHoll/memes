const {
    ux
} = require('@cto.ai/sdk')
const {
    callOutCyan,
    multiBlue,
    multiOrange,
    multiPurple,
    errorRed,
    successGreen
} = ux.colors;

const memeStr = `${successGreen('D')}${multiOrange('A')}${multiPurple('N')}${callOutCyan('K')} ${multiBlue('M')}${errorRed('E')}${multiOrange('M')}${successGreen('E')}${multiPurple('S')}`

module.exports = {
    MEMES_API: 'https://api.imgflip.com',
    memesText: `
🔥✨📈✨❤ ${memeStr} ❤✨📈✨🔥
`
}