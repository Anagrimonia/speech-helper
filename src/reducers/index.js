import { combineReducers } from 'redux';
import {
  REGISTER_USER,
  LOGIN_USER,
  GET_THEMES,
  ADD_THEME,
  ADD_PHRASE,
  DELETE_THEME,
  DELETE_PHRASE,
  SET_EDIT
} from "../actions";

const READYMADE = {
  'Экстренное' : 
  ['Помогите', 'Мне нужна помощь', 'Мне нужен доктор', 
   'Позвоните в скорую', 'Вызовите полицию', 
   'Произошел несчастный случай', 'Меня ограбили', 'Я повредил', 
   'Я потерял', 'Я заблудился'],
  'В магазине' : 
  ['Можно вас спросить?','Сколько это стоит?','Сколько стоит',
   'Во сколько вы закрываетесь?','Во сколько вы открываетесь?',
   'Это слишком дорого','Где я могу найти', 'Как пройти к кассе?',
   'Вы стоите в очереди?', 'Посторожите мое место, пожалуйста'],
  'В кафе' : 
  ['Дайте меню', 'Пожалуйста, дайте мне','Что вы посоветуете?',
   'Принесите счет'],
  'У врача' : 
  ['Я плохо себя чувствую', 'Здесь болит', 'Здесь не болит', 
   'Мне лучше', 'Мне хуже', 'У меня болит', 'У меня высокая температура',
   'У меня кружится голова', 'У меня насморк', 'Какое лекарство мне нужно?'],
  'В городе' : 
  ['Как добраться до', 'Это правильная дорога до', 'Где находится', 
   'Который час?', 'Сколько длится поездка?', 'Где ближайшая автобусная остановка?'],
  'Диалог' : 
  ['Здравствуйте', 'До свидания', 'Спасибо', 'Пожалуйста',
  'Приятно познакомиться', 'Извините меня', 'Я не могу говорить'],
}

const userReducer = (state = '', action) => {
  switch (action.type) {
    case REGISTER_USER:
      return (action.payload) ? action.payload : state;

    case LOGIN_USER:
      return (action.payload) ? action.payload : state;

    default:
      return state;
  }
};

const themesReducer = (state = READYMADE, action) => {
  switch (action.type) {
    case GET_THEMES:
    case ADD_THEME:
    case ADD_PHRASE:
    case DELETE_THEME:
    case DELETE_PHRASE:
      return action.payload;

    default:
      return state;
  }
};

const editReducer = (state = false, action) => {
  switch (action.type) {
    case SET_EDIT:
      return action.payload;    

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  user: userReducer,
  themes: themesReducer,
  edit: editReducer
});

export default rootReducer;