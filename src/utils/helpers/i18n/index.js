import { createI18n } from "vue-i18n";
import { uz } from "./uz.js";
import { en } from "./en.js";
import { ru } from "./ru.js";

const i18nFactory = () => {
  return createI18n({
    legacy: false,
    locale: localStorage.getItem("lang") || "uz",
    fallbackLocale: "uz",
    messages: { uz, ru, en },
  });
};

export default i18nFactory;
