const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
const msger = get(".msger");
const chatMinimize = get(".minimize-chat");
const chatMaximize = get(".maximize-chat");

chatMinimize.addEventListener("click", () => {
  msger.style.display = "none";
  chatMaximize.style.display = "inline-block";
});

chatMaximize.addEventListener("click", () => {
  msger.style.display = "flex";
  chatMaximize.style.display = "none";
});

msgerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const prompt = msgerInput.value;
  if (!prompt) return;

  appendMessage("You", "right", prompt); //Display user's prompt
  msgerInput.value = "";

  assistantResponse(prompt);
});

function appendMessage(name, side, text) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg ${side}-msg">

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  if (name === "You") msgerChat.scrollTop += 1000;
  msgerChat.scrollTop += 250;
}

async function assistantResponse(prompt) {
  let msgText = await fetch("{server URL}", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: prompt }),
  })
    .then((response) => response.json())
    .then((json) => {
      return json.data.response;
    });

  appendMessage("Assistant", "left", msgText);
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}
