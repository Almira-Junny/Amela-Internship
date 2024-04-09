//B1
const currentDate = (s: string): string => {
  const date = new Date();
  return (
    String(date.getDate()) +
    s +
    String(date.getMonth() + 1) +
    s +
    String(date.getFullYear())
  );
};

console.log(currentDate("/"));

//B2
const getDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month, 0).getDate();
};

console.log(getDaysInMonth(8, 2020));

//B3
const isWeekend = (day: Date): boolean => {
  return new Date(day).getDay() === 6 || new Date(day).getDay() === 0;
};

console.log(isWeekend(new Date(2024, 3, 13)));

//B4
const minutes = (hour: number, minute: number): number => {
  return hour * 60 + minute;
};

console.log(minutes(1, 39));

//B5
const countDay = (day: Date): number => {
  return (
    (Date.UTC(
      new Date(day).getFullYear(),
      new Date(day).getMonth(),
      new Date(day).getDate()
    ) -
      Date.UTC(new Date(day).getFullYear(), 0, 0)) /
    24 /
    60 /
    60 /
    1000
  );
};

console.log(countDay(new Date(2024, 3, 8)));

//B6
const calculateAge = (day: Date): number => {
  const today = new Date();
  const birthday = new Date(day);

  return today.getMonth() > birthday.getMonth() ||
    (today.getMonth() === birthday.getMonth() &&
      today.getDate() >= birthday.getDate())
    ? today.getFullYear() - birthday.getFullYear()
    : today.getFullYear() - birthday.getFullYear() - 1;
};

console.log(calculateAge(new Date(2001, 10, 4)));

//B7
const startOfWeek = (day: Date): string => {
  return day.getDay() === 0
    ? new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate() - 6
      ).toDateString()
    : new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate() - (day.getDay() - 1)
      ).toDateString();
};

console.log(startOfWeek(new Date()));

//B8
const endOfMonth = (day: Date): string => {
  return new Date(day.getFullYear(), day.getMonth() + 1, 0).toDateString();
};

console.log(endOfMonth(new Date()));

//B9
const countToNewYear = (day: Date): number => {
  return (
    (Date.UTC(new Date(day).getFullYear() + 1, 0, 1) -
      Date.UTC(
        new Date(day).getFullYear(),
        new Date(day).getMonth(),
        new Date(day).getDate()
      )) /
    24 /
    60 /
    60 /
    1000
  );
};

console.log(countToNewYear(new Date()));

//B10
const time = (dayString: string, second: number): string => {
  const arr = dayString.split(":");
  const date = new Date(
    2000,
    0,
    1,
    Number(arr[0]),
    Number(arr[1]),
    Number(arr[2])
  );
  const result = new Date(date.getTime() + second * 1000);
  return `${result.getHours()}:${result.getMinutes()}:${result.getSeconds()}`;
};

console.log(time("9:20:56", 7));

//B11
const resetData = (o: object) => {
  const arr = Object.values(o);
  const keys = Object.keys(o);
  for (let i = 0; i < arr.length; i++) {
    switch (typeof arr[i]) {
      case "string": {
        o[keys[i]] = "";
        break;
      }
      case "number": {
        o[keys[i]] = 0;
        break;
      }
      case "boolean": {
        o[keys[i]] = false;
        break;
      }
      case "object": {
        o[keys[i]] = resetData(arr[i]);
        break;
      }
      default: {
      }
    }
  }

  return o;
};

console.log(
  resetData({
    name: "Dang",
    age: 20,
    isStatus: true,
    a: {
      a: [1, 2, 3],
      b: {
        c: 2,
      },
    },
    c: ["a", "b", "c"],
  })
);
