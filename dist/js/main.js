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

  voices.forEach(voice => {
    const option = document.createElement("option");
    option.textContext = voice.name + "(" + voice.lang + ")";

    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
  });
};

getVoices();

if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}
