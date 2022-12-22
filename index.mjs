import { ChatGPTAPIBrowser } from 'chatgpt'
import express from 'express'

const api = new ChatGPTAPIBrowser({ email: process.env.OPENAI_EMAIL, password: process.env.OPENAI_PASSWORD })
await api.initSession()

async function say(what) {
  try {
    const { response, conversationId, messageId } = await api.sendMessage(what) || {}
    return {
      answer: response,
      sameConversationUrlComponent: `&conversationId=${conversationId}&parentMessageId=${messageId}`
    }
  } catch (e) {
    console.log(e)
    return 'Error'
  }
}

async function old_say({ what, conversationId, parentMessageId }) {
  try {
    const { response, messageId } = await api.sendMessage(what, {
      conversationId,
      parentMessageId
    }) || {}
    return {
      answer: response,
      sameConversationUrlComponent: `&conversationId=${conversationId}&parentMessageId=${messageId}`
    }
  } catch (e) {
    console.log(e)
    return 'Error'
  }
}

const app = express()

app.get('/', async (req, res) => {
  const { q: what, conversationId, parentMessageId } = req.query

  if (conversationId && parentMessageId) {
    const result = await old_say({ what, conversationId, parentMessageId })
    res.send(result)
    return
  }

  const result = await say(req.query.q)
  res.send(result)
})

app.listen(8661, () => {
  console.log('Listening on port 8661')
  console.log('New Conversation Example:\n http://localhost:8661/?q=Hello')
  console.log('Old Conversation Example:\n http://localhost:8661/?q=Hello&conversationId=123&parentMessageId=456')
})
