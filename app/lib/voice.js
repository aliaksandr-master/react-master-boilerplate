const speechSynthesis = window.speechSynthesis;

let _resolve = () => {};
const promise = new Promise((resolve) => {
  _resolve = resolve;
});


speechSynthesis.onvoiceschanged = () => {
  const voices = speechSynthesis.getVoices();

  const voicesByLang = voices.reduce((result, voice) => {
    const lang = voice.lang.replace(/-.+$/, '').toLowerCase();

    if (!result[lang]) {
      result[lang] = [];
    }

    result[lang].push(voice);

    return result;
  }, {});

  _resolve(voicesByLang);
};

export default (message, language = 'ru', rate = 1) => {
  return promise.then((voicesByLang) => {
    const msg = new SpeechSynthesisUtterance();

    msg.voice = voicesByLang[language][0];
    msg.rate = rate;
    msg.text = message;

    speechSynthesis.speak(msg);
  });
};
