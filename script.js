const girl = document.getElementById("girl");
const text = document.getElementById("text");

function startListening() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = "en-IN";
  recognition.start();

  recognition.onresult = async function(event) {
    let userText = event.results[0][0].transcript;
    text.innerText = "You: " + userText;

    girl.src = "talk.gif";

    let aiReply = await getAIResponse(userText);
    speak(aiReply);
  }
}

async function getAIResponse(message) {
  return "Hello, I am your AI assistant";
}

function speak(reply) {
  let speech = new SpeechSynthesisUtterance(reply);
  speech.onend = () => girl.src = "idle.gif";
  speechSynthesis.speak(speech);
}