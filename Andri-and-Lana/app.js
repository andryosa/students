//Init SpeechSynth API
//this is API's entry point - it returns an instance of SpeechSynthesis, the contoller interface for web speech synthesis.
const synth = window.speechSynthesis;
//We capture references to all the DOM elements involved in the UI
const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');
const rate = document.getElementById('rate')
const rateValue = document.getElementById('rate-value')
const pitch = document.getElementById('pitch')
const pitchValue = document.getElementById('pitch-value')

const data = [
  {
    image: './images/happy.jpg',
    text: "we are happy!"
  },
  {
    image: './images/coding.jpg',
    text: "we are coding!"
  },
  {
    image: './images/drinking.jpg',
    text: "we are thirsty!"
  },
  {
    image: './images/angry.jpg',
    text: "we are angry!!!"
  },
  {
    image: './images/party.jpg',
    text: "we want to go to party!"
  },
  {
    image: './images/gotoschool.jpg',
    text: "we want to go to school!"
  },
  {
    image: './images/eating.jpg',
    text: "we are hungry!"
  },
  {
    image: './images/tired.jpg',
    text: "we are tired!"
  }
];

data.forEach(createBox);

// Create speech boxes
function createBox(item) {
  const box = document.createElement('div');
  const { image, text } = item;
  //The classList property returns the class name(s) of an element, as a DOMTokenList object.
  //Adds one or more class names to an element.
  box.classList.add('box');
  box.classList.add('mb-5');
  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;
  box.addEventListener('click', () => {
      setTextMessage(text);
      speakText();
      // Add active effect
      box.classList.add('active');
      setTimeout(() => box.classList.remove('active'), 800);
  });
  main.appendChild(box);
}
//Init the voices array. We need to fetch the voices using API
let voices = [];
//We made an arrow function getVoices
const getVoices = () => {
  //getVoices() method - returns a list of all the available voices, represented by SpeechSynthesisVoice object
  //The voice list is loaded async to the page.
  //An onvoicechanged event is fired when they are loaded.
  voices = synth.getVoices();
  //Loop though voices and create an option for each one
  voices.forEach(voice => {
      //Create option element for each voice
      const option = document.createElement('option');
      //Fill option with voice and language
      option.value = voice.name;
      option.innerText = `${voice.name} ${voice.lang}`;
      //Append option to the voicesSelect, all voices are coming from synth.getVoices()
      voicesSelect.appendChild(option);
  })
}
//Init speech synth
//SpeechSynthesisUtterance object - interface of the Web Speech API represents a speech request.
//It contains the content the speech service should read and information about how to read it (language, pitch and volume)
const message = new SpeechSynthesisUtterance();
//Set text
function setTextMessage(text) {
  message.text = text;
}
//Set rate and pitch
function ratePitch(r,p) {
  message.rate = r
  message.pitch = p
}
//Speak text
//Think of speakText as a person speaking
function speakText() {
synth.speak(message)
}
//Set voice
function setVoice(e) {
message.voice = voices.find(voice => voice.name === e.target.value)
}
//EVENT LISTENERS
//Voices changed
synth.addEventListener('voiceschanged', getVoices);
//Toggle text box
toggleBtn.addEventListener('click', () =>
document.getElementById('text-box').classList.toggle('show')
);
// Close button
closeBtn.addEventListener('click', () =>
document.getElementById('text-box').classList.remove('show')
);
//Rate value change
rate.addEventListener('change', e => rateValue.textContent = rate.value)
//Rate value change
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value)
// Change voice
voicesSelect.addEventListener('change', setVoice);
// Read text button
readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  ratePitch(rate.value, pitch.value)
  speakText();
});
getVoices();