const {
  ux
} = require('@cto.ai/sdk')
require('dotenv').config()
const {
  URLSearchParams
} = require('url');

const {
  memesText
} = require('./constants')
const {
  getMemesList,
  makeMemes
} = require('./helpers')

const handleErr = (errMsg) => {
  ux.print(`Error with meme API: ${errMsg}`)
}

const main = async () => {
  await ux.print(memesText)
  const memesListResp = await getMemesList()

  const filteredList = {}
  if (memesListResp.success === true) {
    memesListResp.data.memes.forEach((meme => {
      filteredList[meme.name] = {
        template_id: meme.id,
        box_count: meme.box_count
      }
    }))
  } else {
    handleErr(memesListResp.error_message)
  }

  const {
    memeName
  } = await ux.prompt({
    type: 'autocomplete',
    name: 'memeName',
    message: `Which meme would you like to create?`,
    choices: Object.keys(filteredList),
  })
  const textBoxCount = filteredList[memeName].box_count

  // Build API Request
  const params = new URLSearchParams();
  params.append('template_id', filteredList[memeName].template_id);
  params.append('username', process.env.USERNAME);
  params.append('password', process.env.PASSWORD);
  if (textBoxCount < 3) {
    const {
      topTextBox
    } = await ux.prompt({
      type: "input",
      name: "topTextBox",
      message: `What should the top text block be?`,
    })
    const {
      bottomTextBox
    } = await ux.prompt({
      type: "input",
      name: "bottomTextBox",
      message: `What should the bottom text block be?`,
    })
    params.append('text0', topTextBox);
    params.append('text1', bottomTextBox);
  } else {
    for (let i = 0; i < textBoxCount; i++) {
      const {
        textStr
      } = await ux.prompt({
        type: "input",
        name: "textStr",
        message: `What should text block ${i+1} of ${textBoxCount} be?`,
        default: ""
      })
      // Weird required format for API:
      params.append(`boxes[${i}][text]`, textStr);
    }
  }

  const memesResponse = await makeMemes(params)
  if (memesResponse.success === true) {
    ux.print(`${memesResponse.data.url}`)
  } else {
    handleErr(memesResponse.error_message)
  }
}
main()