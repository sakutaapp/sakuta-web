import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

export default ({ app }) => {
  app.i18n = new VueI18n({
    locale: localStorage.getItem("lang") || "en",
    fallbackLocale: "en",
    messages: getMessages(),
  });
};

function getMessages() {
  const locales = require.context("~/languages", true, /[A-Za-z0-9-_,\s]+\.json$/i);
  console.log(locales);
  const messages = {};
  locales.keys().forEach((key) => {
    const matched = [...key.matchAll(/(\.\/)([A-Za-z-]*\/[A-Za-z]*)(\.json)/gm)][0][2];
    console.log(matched);
    const lang = matched.split("/")[0];
    const file = matched.split("/")[1];

    if (matched && lang && file && lang.length > 1 && file.length > 1) {
      if (!messages[lang]) {
        messages[lang] = {};
      }
      Object.keys(locales(`./${matched}.json`)).forEach((key) => {
        messages[lang][`${file}.${key}`] = locales(`./${matched}.json`)[key];
      });
    }
  });
  console.log(messages);
  return messages;
}
