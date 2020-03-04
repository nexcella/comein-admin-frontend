import i18n from 'i18next';
import {initReactI18next} from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    debug: true,
    lng: 'ru-RU',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      'ru-RU': {
        'translation': {
          'button': {
            login: 'Войти'
          }
        }
      },
      'en-EN': {
        'translation': {
          'button': {
            login: 'Login'
          }
        }
      }
    },
  });

export default i18n;
