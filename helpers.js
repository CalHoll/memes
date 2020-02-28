const fetch = require("node-fetch");
const {
    MEMES_API
} = require('./constants')

module.exports = {
    getMemesList: async () => {
        const resp = await fetch(`${MEMES_API}/get_memes`)
        const data = await resp.json()
        return data
    },
    makeMemes: async (params) => {
        const url = `${MEMES_API}/caption_image`

        const reqData = {
            method: 'POST',
            cache: 'no-cache',
            body: params
        }

        const resp = await fetch(url, reqData)
        const respData = await resp.json()
        return respData
    }
    // Example Success Response:
    // {
    //     "success": true,
    //     "data": {
    //         "url": "https://i.imgflip.com/123abc.jpg",
    //         "page_url": "https://imgflip.com/i/123abc"
    //     }
    // }

    // Example Failure Response:
    // {
    //     "success" => false,
    //     "error_message" => "Some hopefully-useful statement about why it failed"
    // }
}