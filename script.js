const girl = document.getElementById("girl");
const statusText = document.getElementById("status");

function startListening() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.lang = "en-IN";
  recognition.start();

  statusText.innerText = "Listening...";

  recognition.onresult = async (event) => {
    const userText = event.results[0][0].transcript;
    statusText.innerText = "You: " + userText;

    girl.src = "talk.gif";

    const reply = await getAIResponse(userText);
    speak(reply);
  };
}

async function getAIResponse(userText) {
  const API_KEY = "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";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + API_KEY
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a cute anime girl AI assistant. Reply in simple Hinglish."
        },
        {
          role: "user",
          content: userText
        }
      ]
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "hi-IN";
  speech.rate = 1;
  speech.pitch = 1;

  speech.onend = () => {
    girl.src = "idle.gif";
    statusText.innerText = "Tap Talk and speak";
  };

  speechSynthesis.speak(speech);
}