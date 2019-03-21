// Init Speech Synth API
const synth = window.speechSynthesis;
//Dom Elements
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");

// Init Voices Array

let voices = [];

const getVoices = () => {
  voices = synth.getVoices();
  console.log(voices);

  voices.forEach(voice => {
    const option = document.createElement("option");
    option.textContent = voice.name + "(" + voice.lang + ")";

    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  });
};

getVoices();

if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

//Speak

const speak = () => {
  // check if speaking
  if (synth.speaking) {
    console.error("Already speaking...");
    return;
  }

  if (textInput.value !== "") {
    //this is what is spoken
    const speakText = new SpeechSynthesisUtterance(textInput.value);

    //stop speaking
    speakText.onend = e => {
      console.log("done speaking...");
    };

    // error
    speakText.onerror = e => {
      console.error("something went wrong");
    };
    // selected voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      "data-name"
    );

    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    // set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    //Speak
    synth.speak(speakText);
  }
};

// Event listeners

//Text Form Submit
textForm.addEventListener("submit", e => {
  e.preventDefault();
  speak();
  textInput.blur();
});

// rate value change
rate.addEventListener("change", e => (rateValue.textContent = rate.value));

//pitch value change
pitch.addEventListener("change", e => (pitchValue.textContent = pitch.value));

// voice select change
voiceSelect.addEventListener("change", e => speak());
