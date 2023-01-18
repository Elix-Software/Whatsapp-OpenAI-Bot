const axios = require("axios");

const globalOptions = {
  headers: {
    Authorization: `Bearer ${process.env.OPENAI_TOKEN}`,
  },
};

async function generateImage(input) {
  try {
    const body = {
      prompt: input,
      n: 2,
      size: "1024x1024",
    };
    const res = await axios.post(
      "https://api.openai.com/v1/images/generations",
      body,
      globalOptions
    );
    const images = res.data.data.map((img) => img.url);
    return images;
  } catch (err) {
    console.log(`generateImage failed`);
    console.log(err);
    return [];
  }
}

async function generateText(input) {
  try {
    const body = {
      model: "text-davinci-003",
      prompt: input,
      max_tokens: 2048,
      temperature: 0,
    };
    const res = await axios.post(
      "https://api.openai.com/v1/completions",
      body,
      globalOptions
    );
    return res.data.choices[0].text.trim();
  } catch (err) {
    console.log(`generateText failed`);
    console.log(err);
    return "Error while trying to generate the response";
  }
}

module.exports = { generateImage, generateText };
