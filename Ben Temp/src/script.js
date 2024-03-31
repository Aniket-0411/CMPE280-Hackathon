//AJAX to ChatGPT
//Call webserver to process Prompt
async function inquirePrompt(prompt) {
  if (prompt) {
    //REST call
    await fetch("{API server url}", {
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
        json.data.response;
        //Present ChatGPT's response
      });
  }
}
