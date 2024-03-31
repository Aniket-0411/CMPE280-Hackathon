//AJAX to ChatGPT
//Call webserver to process Prompt
async function inquirePrompt(prompt) {
  if (prompt) {
    //REST call
    await fetch("https://chatgpt-chat-us-tax-law.onrender.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        AI_Response(json.data.response);
      });
  }
}
