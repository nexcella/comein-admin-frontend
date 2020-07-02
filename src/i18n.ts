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
            login: 'Войти',
            register: 'Зарегистрироваться'
          },
          label: {
            username: 'Email',
            password: 'Пароль',
            phone: 'Телефон',
            name: 'Ваше имя'
          },
          validation: {
            required: 'обязательное поле',
            email: 'неверный email',
            min: {
              count_1: '{{field}} должен быть более {{count}} символа',
              count_2: '{{field}} должен быть более {{count}} символов',
              count_5: '{{field}} должен быть более {{count}} символов',
            }
          },
          errors: {
            internal: 'Ошибка сервера. Попробуйте повторить попытку позднее',
            validation: 'Введенные данные неверны. Проверьте корректность заполнения формы и попробуйте еще раз.',
            incorrect_username: 'Неверное имя пользователя или пароль'
          }
        }
      },
      'en-EN': {
        translation: {
          button: {
            login: 'Sign In',
            register: 'Sign Up'
          },
          label: {
            username: 'Email',
            password: 'Password',
            phone: 'Phone',
            name: 'Your name'
          },
          validation: {
            required: 'Required',
            email: 'Incorrect email',
            min: {
              count: '{{field}} must be at least {{count}} character',
              count_plural: '{{field}} must be at least {{count}} characters',
            }
          },
          errors: {
            internal: 'Server error. Please try again later',
            validation: 'Validation error. Check your input and try again',
            incorrect_username: 'Incorrect username or password'
          }
        }
      }
    },
    fallbackLng: 'ru-RU'
  });

export default i18n;
