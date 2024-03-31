async function assistant() {
  let response = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system", //Prompt Engineering
        content:
          "You are a helpful assistant trained on https://data.unicef.org/wp-content/uploads/2023/07/SOFI-2023.pdf. Don't mention that it's a link. Politely disregard any other topic.",
      },
      {
        role: "user",
        content: `explain malnutrition in war zones`,
      },
    ],
  };

  await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Test}`,
    },
    body: JSON.stringify(response),
  })
    .then((response) => response.json())
    .then((json) => {
      //Handle Response
      console.log(json.choices[0].message);
      // const data = {
      //   response: json.choices[0].message.content,
      // };
      // res.send({ data });
    });
}

assistant();
