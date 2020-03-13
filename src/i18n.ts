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
        translation: {
          button: {
            login: 'Войти'
          },
          label: {
            'username': 'Логин',
            'password': 'Пароль'
          },
          validation: {
            required: 'обязательное поле',
            min: {
              count_1: '{{field}} должен быть более {{count}} символа',
              count_2: '{{field}} должен быть более {{count}} символов',
              count_5: '{{field}} должен быть более {{count}} символов',
            }
          }
        }
      },
      'en-EN': {
        translation: {
          button: {
            login: 'Sign In'
          },
          label: {
            username: 'Username',
            password: 'Password'
          },
          validation: {
            required: 'Required',
            min: {
              count: '{{field}} must be at least {{count}} character',
              count_plural: '{{field}} must be at least {{count}} characters',
            }
          }
        }
      }
    },
    fallbackLng: 'ru-RU'
  });

export default i18n;
