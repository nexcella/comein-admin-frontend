import i18n from 'i18next';
import {initReactI18next} from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      'ru-RU': {
        'translation': {
          'button': {
            login: 'Войти'
          },
          label: {
            'username': 'Логин',
            'password': 'Пароль'
          }
        }
      },
      'en-EN': {
        'translation': {
          'button': {
            login: 'Sign In'
          },
          label: {
            'username': 'Username',
            'password': 'Password'
          }
        }
      }
    },
    fallbackLng: 'ru-RU'
  });

export default i18n;
