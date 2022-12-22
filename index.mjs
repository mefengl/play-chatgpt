import { ChatGPTAPIBrowser } from 'chatgpt'
import express from 'express'

// use puppeteer to bypass cloudflare (headful because of captchas)
const api = new ChatGPTAPIBrowser({
  email: process.env.OPENAI_EMAIL,
  password: process.env.OPENAI_PASSWORD
})

await api.initSession()

async function say(what) {
  const result = await api.sendMessage(what)
  return result?.response
}

const app = express()

app.get('/', async (req, res) => {
  const result = await say(req.query.q)
  res.send(result)
})

app.listen(8661, () => {
  console.log('Listening on port 8661')
})
