import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        translation: {
          "startButton": "Play",
          "errShort": "Too short",
          "errLong": "Too long",
          "errCenterLetter": "Missing center letter",
          "errAlreadyF": "Already found",
          "errNotIn": "Not in word list",
          "delButton": "Delete",
          "enterButton": "Enter",
          "foundedWords": "You have found {{count}} word(s).",
          "finalScore": "Your final score is {{count}}."
        }
      },
      tr: {
        translation: {
            "startButton": "Oyna",
            "errShort": "Çok kısa",
            "errLong": "Çok uzun",
            "errCenterLetter": "Ortadaki karakteri içermiyor",
            "errAlreadyF": "Zaten bulundu",
            "errNotIn": "Kelimeler arasında bulunamadı",
            "delButton": "Sil",
            "enterButton": "Gir",
            "foundedWords": "Şu zamana kadar {{count}} kelime buldunuz.",
            "finalScore": "Skorunuz {{count}}."
        }
      }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;