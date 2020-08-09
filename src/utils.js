export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getCurrentDate = () => {
  const currentDate = new Date();

  return new Date(currentDate);
};

export const isTaskExpired = (dueDate) => {
  if (dueDate === null) {
    return false;
  }

  const currentDate = getCurrentDate();

  return currentDate.getTime() > dueDate.getTime();
};

export const isTaskExpiringToday = (dueDate) => {
  if (dueDate === null) {
    return false;
  }

  const currentDate = getCurrentDate();

  return currentDate.getDate() === dueDate.getDate();
};

export const isTaskRepeating = (repeating) => {
  return Object.values(repeating).some(Boolean);
};

export const humanizeTaskDueDate = (dueDate) => {
  const date = dueDate.getDate();
  const month = dueDate.toLocaleString(`en-US`, {month: `long`});
  return `${date} ${month}`;
};

const addZeroToTime = (time) => {
  return (time < 10 ? `0` : ``) + time;
};

export const humanizeTaskDueTime = (dueDate) => {
  const hours = dueDate.getHours();
  const minutes = dueDate.getMinutes();

  return `${addZeroToTime(hours)}:${addZeroToTime(minutes)}`;
};
