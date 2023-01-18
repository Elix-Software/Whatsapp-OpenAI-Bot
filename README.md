# Elix Whatsapp Bot

## Story
In the past days, we were able to create a bot for the whatsapp community, and in only 2 days it has been added in over 350 groups in all Italy so we decided to release a public and basic version of it, including the OpenAI Integration: the most important part of it. The Bot has been banned by whatsapp business, we are not sure yet why and contacted the Meta customer service, it may be due to the amount of messages sent by the bot that could have marked it as a spam, but we'll investigate further.

## How does it work?
The core of the code is `whatsapp-web.js`, a library that uses Whatsapp Web to interact with the users. In our code we provided some commands such as `/magicball`, just to play a little with the bot, the most important part is the AI one: when the `/talk` or `/image` command is runned, the bot uses Open AI's `generations` and `completions` api's response to give the user a feedback. We created the `/sendAll` command to send a global message to every chat the bot is in.

## Setup
After cloning the code, you will need to create an .env file containig:  
- `OPENAI_TOKEN` => From Open AI Beta dashboard
- `AUTHOR_NUMBER` => Your cellphone number, used by the bot to verify admin-only commands such as /sendAll

## Contributions 
Since it's an open source project, we invite everyone to commit any code idea.


## Notes
How we said earlier, Elix bot got banned, we do not recommend using your number for the bot.
