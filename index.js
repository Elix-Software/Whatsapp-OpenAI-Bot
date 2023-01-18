const qrcode = require("qrcode-terminal");

const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");

const { generateImage, generateText } = require("./openai");
const { sendAll } = require("./helper");

const client = new Client({ authStrategy: new LocalAuth() });

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
  sendAll(client, "Bot Connected");
});

client.on("disconnected", () => {
  console.log("Client disconnected");
  sendAll(client, "Bot Disconnected");
});

client.on("message", async (message) => {
  const chat = await message.getChat();
  const { body } = message;

  if (body.toLocaleLowerCase().trim().startsWith("/image")) {
    let imageCtx = body.split("/image")[1].trim();

    message.reply("Generating image...");

    const images = await generateImage(imageCtx);

    if (images.length)
      images.forEach(async (img) => {
        const media = await MessageMedia.fromUrl(img);
        message.reply(media);
      });
    else message.reply("Error while trying to generate the image");
  }

  if (body.toLocaleLowerCase().trim().startsWith("/talk")) {
    let talkCtx = body.split("/talk")[1].trim();
    message.reply("Generating response...");

    const response = await generateText(talkCtx);
    message.reply(response);
  }

  //Mentions the group's participants
  if (body.toLocaleLowerCase().trim() == "/mentionall") {
    let text = chat.participants
      .map((participant) => `@${participant.id.user}`)
      .join(" ");

    let mentions = chat.participants.map(
      async (participant) =>
        await client.getContactById(participant.id._serialized)
    );

    await chat.sendMessage(text, { mentions });
  }

  if (body.toLocaleLowerCase().trim().startsWith("/spam")) {
    let spamMessage = body.split("/spam")[1].trim();
    for (let i = 0; i <= 5; i++) {
      chat.sendMessage(spamMessage);
    }
  }

  if (body.toLocaleLowerCase().trim() == "/flipcoin") {
    chat.sendMessage("Flipping a coin...");
    let number = Math.round(Math.random() * 10);
    chat.sendMessage(number >= 5 ? "🪙 HEAD" : "🪙 TAIL");
  }

  if (body.toLocaleLowerCase().trim() == "/help") {
    const commands = [
      {
        activation: "/mentionall",
        description: "Mentions all users in the group",
      },
      {
        activation: "/flipcoin",
        description: "Flip a coin for head or tail",
      },
      {
        activation: "/magicball [question]",
        description: "Ask the bot anything that can be replied with yes or no",
      },
      {
        activation: "/spam [text]",
        description: "Make the bot spam 5 times a text",
      },
      {
        activation: "/image [text]",
        description:
          "Uses Open AI to generate one or more random images from a text",
      },
      {
        activation: "/talk [text]",
        description: "Uses Open AI to interact like Chat Open AI",
      },
    ];

    let commandsTxt = commands
      .map((command) => `*${command.activation}* - ${command.description}`)
      .join("\n");

    chat.sendMessage("Hi! I'm Elix Bot, these are the available commands: ");
    chat.sendMessage(commandsTxt);
    chat.sendMessage(`https://github.com/elix-software`);
  }

  if (body.toLocaleLowerCase().trim().startsWith("/sendall")) {
    if (message.author !== `${process.env.AUTHOR_NUMBER}@c.us`) {
      message.reply("You do not have permission to run this command");
    } else {
      message.reply("Sending the global message...");
      let globalMessage = body.split("/sendall")[1].trim();

      sendAll(client, globalMessage);
    }
  }

  if (body.toLocaleLowerCase().trim().startsWith("/ask")) {
    let responses = [
      "yes",
      "no",
      "maybe",
      "absolutely not",
      "absolutely yes",
      "probablty yes",
    ];

    //Randomize array
    responses.sort(function () {
      return 0.5 - Math.random();
    });

    chat.sendMessage(responses[0]);
  }
});

client.initialize();
