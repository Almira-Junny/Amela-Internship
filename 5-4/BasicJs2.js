//B1
const minNumber = (arr) => {
  let min = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    }
  }

  return min;
};

console.log(minNumber([2, 1, 3]));

//B2
const max2Number = (arr) => {
  arr.sort((a, b) => b - a);
  const set = new Set();
  for (let i = 0; i < arr.length; i++) {
    set.add(arr[i]);
  }

  const arr2 = [...set];

  return arr2[1] || null;
};

console.log(max2Number([2, 1, 4, 4]));

//B3
const sortStudents = (arr) => {
  return arr.sort().reverse();
};

console.log(sortStudents(["Nam", "Hoa", "Tuấn"]));

//B4
const sum = () => {
  let result = 0;
  for (let i = 0; i <= 100; i++) {
    if (i % 5 === 0) {
      result += i;
    }
  }

  return result;
};

console.log(sum());

//B5
const changeArray = (arr) => {
  const result = arr.map((val) => val % 2);

  return result;
};

console.log(changeArray([2, 4, 6, 7]));

//B6
const longestString = (arr) => {
  let max = 0,
    result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length > max) {
      max = arr[i].length;
    }
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length === max) {
      result.push(arr[i]);
    }
  }

  return result;
};

console.log(longestString(["aba", "aa", "ad", "sdf", "a"]));

//B7
const randomNumber = (arr) => {
  const num = Math.floor(Math.random() * arr.length);

  return arr[num];
};

console.log(randomNumber([3, 7, 9, 11]));

//B8
const randomArray = (arr) => {
  const set = new Set();
  let result = [];

  while (set.size < arr.length) {
    const num = Math.floor(Math.random() * arr.length);

    set.add(num);
  }

  const arr2 = [...set];

  for (let i = 0; i < arr.length; i++) {
    result.push(arr[arr2[i]]);
  }

  return result;
};

console.log(randomArray([1, 2, 3, 4]));

//B9
const similarity = (arr1, arr2) => {
  const result = [];
  for (let i = 0; i < arr1.length; i++) {
    if (arr2.includes(arr1[i])) {
      result.push(arr1[i]);
    }
  }

  return result;
};

console.log(similarity([1, 2, 3], [1, 2, 4]));

//B10
const symmetricDifference = (arr1, arr2) => {
  const result = [];
  for (let i = 0; i < arr1.length; i++) {
    if (!arr2.includes(arr1[i])) {
      result.push(arr1[i]);
    }
  }

  for (let i = 0; i < arr2.length; i++) {
    if (!arr1.includes(arr2[i])) {
      result.push(arr2[i]);
    }
  }

  return result;
};

console.log(symmetricDifference([1, 2, 3], [1, 2, 4]));

//B11
const subString = (s) => {
  const result = [];
  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j <= s.length; j++) {
      result.push(s.slice(i, j));
    }
  }

  return result;
};

console.log(subString("dog"));

//B12
const checkAscending = (arr) => {
  const temp = [...arr];
  return arr.sort((a, b) => a - b).join("") === temp.join("");
};

console.log(checkAscending([1, 3, 2]));

//B13
const checkOddDescending = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      return false;
    }
  }

  const temp = [...arr];
  return arr.sort((a, b) => b - a).join("") === temp.join("");
};

console.log(checkOddDescending([5, 3, 1]));

//B1
const key = (o) => {
  return Object.keys(o).join(", ");
};

console.log(
  key({
    name: "a",
    age: 12,
  })
);

//B2
const value = (o) => Object.values(o).join(", ");

console.log(
  value({
    name: "a",
    age: 12,
  })
);

//B3
const checkKey = (o, s) => Object.keys(o).includes(s);

console.log(
  checkKey(
    {
      name: "a",
      age: 12,
    },
    "name"
  )
);

//B4
const checkLength = (o, s) => Object.keys(o).length;

console.log(
  checkLength({
    name: "a",
    age: 12,
  })
);

//B5
const checkArr = (arr) => {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].age > 25 && arr[i].isStatus === true) {
      result.push(arr[i]);
    }
  }

  return result;
};

console.log(
  checkArr([
    {
      name: "a",
      age: 26,
      isStatus: true,
    },
    {
      name: "a",
      age: 21,
      isStatus: true,
    },
  ])
);
