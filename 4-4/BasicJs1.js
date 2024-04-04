//B1
const checkStringExist = (a, b) => {
  const arr = a.split(" ");

  if (arr.includes(b)) {
    return true;
  } else {
    return false;
  }
};

console.log(checkStringExist("Amela A Beta", "Beta"));

//B2
const shortenString = (s) => {
  let result = "";

  if (s.length >= 8) {
    for (let i = 0; i < 8; i++) {
      result += s.charAt(i);
    }
  } else {
    for (let i = 0; i < s.length; i++) {
      result += s.charAt(i);
    }
  }

  return result + "...";
};

console.log(shortenString("Xin chao cac ban"));

//B3
const repeatString = (s) => {
  const temp = s;
  for (let i = 0; i < 9; i++) {
    s += temp;
  }

  return s;
};

console.log(repeatString("abc"));

//B4
const repeatString2 = (s) => {
  const temp = s;
  for (let i = 0; i < 9; i++) {
    s += "-" + temp;
  }

  return s;
};

console.log(repeatString2("a"));

//B5
const repeatString3 = (s, n) => {
  const temp = s;
  for (let i = 0; i < n - 1; i++) {
    s += "-" + temp;
  }

  return s;
};

console.log(repeatString3("a", 5));

//B6
const reverseString = (s) => {
  return s.split("").reverse().join("");
};

console.log(reverseString("Hello"));

//B7
const checkReverse = (s) => {
  s = s.toLowerCase().replace(/ /g, "");
  return s.split("").reverse().join("") === s;
};

console.log(checkReverse("Race car"));

//B8
const checkUpperCase = (s) => {
  return s.toLowerCase() !== s;
};

console.log(checkUpperCase("Abc"));

//B1
const volumeSphere = (a) => {
  return (4 / 3) * Math.PI * Math.pow(a, 3);
};

console.log(volumeSphere(2));

//B2
const sum = (a, b) => {
  let result = 0;

  if (a >= b) {
    for (let i = b + 1; i < a; i++) {
      result += i;
    }
  } else {
    for (let i = a + 1; i < b; i++) {
      result += i;
    }
  }

  return result;
};

console.log(sum(8, 3));

//B3
const isPrime = (a) => {
  if (a < 2) {
    return false;
  }

  if (a % 2 === 0) {
    return a === 2;
  }

  for (let i = 3; i < Math.sqrt(a); i++) {
    if (a % i === 0) {
      return false;
    }
  }

  return true;
};

console.log(isPrime(7));

//B4
const sumPrime = (a) => {
  let result = 0;
  for (let i = 2; i <= a; i++) {
    if (isPrime(i)) {
      result += i;
    }
  }

  return result;
};

console.log(sumPrime(5));

//B5
const sum2 = (a) => {
  let result = 0;
  for (let i = 0; i <= a; i++) {
    if (a % i === 0) {
      result += i;
    }
  }

  return result;
};

console.log(sum2(10));

//B6
const smallestNumber = (a) => {
  const arr = String(a)
    .split("")
    .map((val) => {
      return Number(val);
    });

  arr
    .sort((a, b) => a - b)
    .map((val) => {
      return String(val);
    });

  const s = arr.reduce((acc, val) => (acc += val), "");

  return Number(s);
};

console.log(smallestNumber(53751));
