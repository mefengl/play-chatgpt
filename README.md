# play-chatgpt
 
## Usage
### Install dependencies
```bash
npm i
```
### Run
```bash
OPENAI_EMAIL="<YOUR-EMAIL>" OPENAI_PASSWORD="<YOUR-PASSWORD>" node index.mjs
# a browser window will open, if it can't login automatically, you can help it by logging in manually
```
### Usage
```bash
# then try it with
curl "http://localhost:8661/?q=hello"
# >> {answer: "xxx", sameConversationUrlComponent: "&conversationId=123&parentMessageId=456"}
# then try it with
curl "http://localhost:8661/?q=hello&conversationId=123&parentMessageId=456"
```

## References

https://github.com/transitive-bullshit/chatgpt-api
