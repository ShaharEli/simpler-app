const hour = 60 * 60 * 1000;

export const day = hour * 24;

export const getTimestamp = (notificationHour, days) => {
  const today = new Date();
  const currentHour = today.getHours();
  const diff = notificationHour - currentHour;
  const sevenNotifications = [];
  let i = 0;
  while (i < 7) {
    sevenNotifications.push(
      new Date(today.valueOf() + hour * diff + days * day * i),
    );
    i++;
  }
  return sevenNotifications;
};

export const arrOfdays = [1, 2, 3, 4, 5, 6, 7];
export const arrOfhours = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
];
