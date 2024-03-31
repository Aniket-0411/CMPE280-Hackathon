const express = require("express");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(__dirname + "/src"));

app.get("/", (req, res) => res.sendFile(__dirname + "/src/index.html"));

//

app.post("/", async (req, res) => {
  //Process the prompt
  let prompt = req.body.prompt;

  let response = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system", //Prompt Engineering
        content:
          "You are a helpful assistant trained on https://data.unicef.org/wp-content/uploads/2023/07/SOFI-2023.pdf. Don't mention that it's a link. Politely disregard any other topic.}",
      },
      {
        role: "user",
        content: `${prompt}`,
      },
    ],
  };

  await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CHATGPT_API_KEY}`,
    },
    body: JSON.stringify(response),
  })
    .then((response) => response.json())
    .then((json) => {
      //Handle Response
      const data = {
        response: json.choices[0].message.content,
      };
      res.send({ data });
    });
});

app.listen(port);
