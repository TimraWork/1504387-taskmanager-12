import {COLORS} from "../const.js";
export const DAYS_RANGE = [-7, 7];
export const MaxTime = {
  HOURS: 23,
  MINUTES: 59,
  SECONDS: 59,
  MS_SECONDS: 999,
};
import {getRandomInteger} from '../utils/common.js';

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateDescription = () => {
  const descriptions = [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`
  ];
  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

const generateTime = () => {
  const time = {};
  for (let [key, value] of Object.entries(MaxTime)) {
    time[key] = getRandomInteger(0, value);
  }
  return time;
};

const generateDate = () => {
  const isDate = Boolean(getRandomInteger(0, 1));

  if (!isDate) {
    return null;
  }

  const daysGap = getRandomInteger(...DAYS_RANGE);
  const currentDate = new Date();

  currentDate.setHours(...Object.values(generateTime()));
  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
};

const generateRepeating = () => {
  return {
    mo: false,
    tu: false,
    we: Boolean(getRandomInteger(0, 1)),
    th: false,
    fr: Boolean(getRandomInteger(0, 1)),
    sa: false,
    su: false
  };
};

const getRandomColor = () => {
  const randomIndex = getRandomInteger(0, COLORS.length - 1);

  return COLORS[randomIndex];
};

export const generateTask = () => {
  const dueDate = generateDate();
  const repeating = dueDate === null
    ? generateRepeating()
    : {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false
    };
  return {
    id: generateId(),
    description: generateDescription(),
    dueDate,
    repeating,
    color: getRandomColor(),
    isArchive: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
