import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import admin_en from "@/lang/en/admin.json";
import client_en from "@/lang/en/client.json";
import admin_kh from "@/lang/kh/admin.json";
import client_kh from "@/lang/kh/client.json";
import { initReactI18next } from "react-i18next";

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "kh"],
    interpolation: { escapeValue: false },
    lng: "en",
    resources: {
      en: {
        admin: admin_en,
        client: client_en,
      },
      kh: {
        admin: admin_kh,
        client: client_kh,
      },
    },
  });

export default i18next;
