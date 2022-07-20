const btn = document.querySelector(".talk");
const content = document.querySelector("#content");
const mike = document.getElementById("mic");
const mike1 = document.getElementById("mic1");
const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random";
const textElement = document.getElementById("text");

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then((RESPONSE) => RESPONSE.json())
    .then((data) => data.content);
}

async function renderNewQuote() {
  let a = await getRandomQuote();
  textElement.innerText = a;
}
renderNewQuote();

document.getElementById("mic").addEventListener("click", StartMike);
document.getElementById("mic1").addEventListener("click", StopMike);
var mike_status = false;

var SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const myrecognition = new SpeechRecognition();

myrecognition.onend = function () {
  mike_status = false;
  mike.classList.add("talk");
  mike.classList.remove("grn_talk");
};

myrecognition.onresult = function (event) {
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  console.log(transcript);
  content.value += transcript;
};

function StartMike() {
  if (mike_status == false) {
    myrecognition.start();
    mike_status = true;
    mike.children[1].innerText = "Listening..";
  }
}
function StopMike() {
  if (mike_status == true) {
    myrecognition.stop();
    mike_status = false;
    mike1.classList.add("talk");
    content.textContent = "";
  }
}

myrecognition.continuous = true;
