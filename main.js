// Closure ------------------------------------>

let x = 1;

const parentFunction = () => {
    let myValue = 2;
    console.log(x);
    console.log(myValue);

    const childFunction = () => {
        console.log(x += 5);
        console.log(myValue += 1);
    }

    childFunction();
}

parentFunction();

// A closure is a function having access to the parent scope even after the parent function has closed

let y = 1;

const parentFunctions = () => {
    let myValue = 2;
    console.log(y);
    console.log(myValue);

    const childFunction = () => {
        console.log(y += 5);
        console.log(myValue += 1);
    }

    return childFunction;
}

const result = parentFunctions();
console.log(result);
result();
result();

// IIFE ----------------------------------------------->

const privateCounter = (() => {
    let count = 0;
    console.log(`initial value:  ${count}`);
    return () => {
        count += 1;
        console.log(count);
    }
})();
privateCounter();
privateCounter();
privateCounter();

// IIFE with closure ------------------------------------>

const credits = ((num) => {
    let credits = num;
    console.log(`initial credit : ${credits}`);
    return () => {
        credits -= 1;
        if(credits > 0) {
            console.log(`playing Game, ${credits} credits remaining`);
        }
        if(credits <= 0) {
            console.log('not enough credits');
        }
    }
})(3);

credits();
credits();
credits();

//  Prototype ------------------------------------------>

 const person = {
    alive: true
 }

 const musician = {
    plays: true
 }

 console.log(musician.plays);
 console.log(musician.alive);           // Undefined

Object.setPrototypeOf(musician, person);
console.log(Object.getPrototypeOf(musician));

person.__proto__.reads = true;

console.log(musician);           // true

const guitarist = {
    strings: 6,
    __proto__: musician
}

console.log(guitarist.alive);
console.log(guitarist.plays);
console.log(guitarist.strings);       // extending prototype chain

const car = {
    doors: 2,
    seats: "vinyl",
    get seatMaterial() {
        return this.seats;
    },
    set seatMaterial(material) {
        this.seats = material;
    }
}

const luxuryCar = {};
Object.setPrototypeOf(luxuryCar, car);
luxuryCar.seatMaterial = "leather";
console.log(luxuryCar);
console.log(luxuryCar.doors);
console.log(car);

console.log(luxuryCar.valueOf());

// getting the keys of an object

console.log(Object.keys(luxuryCar));

Object.keys(luxuryCar).forEach(key => {
    console.log(key);
});

for(let key in luxuryCar) {
    console.log(key);
}

// Object Constructors

function Animal(species) {
    this.species = species;
    this.eats = true;
}

Animal.prototype.walks = function() {
    return `A ${this.species} is walking`;
};

const Bear = new Animal("bear");

console.log(Bear.species);
console.log(Bear.walks);
console.log(Bear.__proto__);

// inheritance ---------------------------------->

class Vehicle {
    constructor() {
        this.wheels = 4,
            this.motorized = true
    }

    ready() {
        return "Ready to go!";
    }
}

class Motorcycle extends Vehicle {
    constructor() {
        super();
        this.wheels = 2
    }

    wheelie() {
        return "On one wheel now!";
    }
}

const myBike = new Motorcycle();
console.log(myBike);
console.log(myBike.wheels);
console.log(myBike.ready());
console.log(myBike.wheelie());

const myTruck = new Vehicle();
console.log(myTruck);

// Recursion --------------------------------------------->

const countToTen = (num = 1) => {
    while(num <= 10) {
        console.log(num);
        num++;
    }
}

countToTen();

const recurToTen = (num = 1) => {
    if (num > 10)
        return;
    console.log(num);
    num++;
    recurToTen(num);
}

recurToTen();

// fibanocci series using recursion-------------------------->

const fib = (num, array = [0, 1]) => {
    if(num <= 2)
        return array;
    const [nextToLast, last] = array.slice(-2);
    return fib(num - 1, [...array, nextToLast + last]);
}

console.log(fib(12));

// Nth fibanocci number

const fibPos = (pos) => {
    if(pos < 2)
        return pos;
    return fibPos(pos - 1) + fibPos(pos - 2);    
}

console.log(fibPos(8));

// Decorators ------------------------------------------->

let sum = (...args) => {
    return [...args].reduce((acc, num) => acc + num);
}

const callCounter = (fn) => {
    let count = 0;

    return (...args) => {
        console.log(`sum has been called ${count += 1} times`);
        return fn(...args);
    }
}

sum = callCounter(sum);

console.log(sum(2, 3, 5));
console.log(sum(1, 5));
console.log(14, 5);

// Currying Functions-------------------------------------->

const buildSandwich = (ingredient1) => {
    return (ingredient2) => {
        return (ingredient3) => {
            return `${ingredient1}, ${ingredient2}, ${ingredient3}`;
        }
    }
}

const mySandwich = buildSandwich("bread")("vegitables")("sauce");
console.log(mySandwich);

// Shallow copy -------------------------------------->

let yArray = [1, 2, 3, 4];
const zArray = [ ...yArray, 10];

console.log(zArray);
console.log(yArray);

// Deep copy ----------------------------------------->

let scoreArray = [10,11,12,13];

const deepClone = obj => {
    if(typeof(obj) !== "object" || obj === null)
        return obj;
    const newObject = Array.isArray(obj) ? [] : {};

    for(let key in obj) {
        const value = obj[key];
        newObject[key] = deepClone(value);
    }
    return newObject;
}

const newScoreArray = deepClone(scoreArray);
console.log(scoreArray);
console.log(newScoreArray);

// Pure functions ------------------------------->

const fullName = (first, last) => `${first} ${last}`;
console.log(fullName("Aparna", "Janardhanan"));

// IIFE ------------------------------------------>

(function Game(score) {
    console.log(score);
})(50);

// compose function ------------------------------>

const add2 = x => x + 2;
const subtract1 = x => x - 1;
const multiplyBy5 = x => x * 5;

const compose = (...fns) => val => fns.reduceRight((prev, fn) => fn(prev), val);

const compResult = compose(multiplyBy5, subtract1, add2)(4);
console.log(compResult);

// Pipe ------------------------------------------>

const pipe = (...fns) => (val) => fns.reduce((prev, fn) => fn(prev), val);

const pipeResult = pipe(add2, subtract1, multiplyBy5)(5);
console.log(pipeResult);

// Debounce -------------------------------------->

const initApp = () => {
    const button = document.querySelector('#debouncer');
    button.addEventListener('click', debounce(clickLog, 2000));
}

const clickLog = () => console.log('clicked');

document.addEventListener('DOMContentLoaded', initApp)

const debounce = (fn, delay) => {
    let id;
    console.log(`id at immediate load: ${id}`);
    return (...args) => {
        console.log(`previous id: ${id}`);
        if(id) 
            clearTimeout(id);
        id = setTimeout(() => {
            fn(...args);
        }, delay);
    }
}

// Throttle -------------------------------------------->

const initApps = () => {
    const button = document.querySelector('#throttle');
    button.addEventListener('click', throttle(clickLogs, 2000));
}

const clickLogs = () => console.log('clicked');

document.addEventListener('DOMContentLoaded', initApps)

const throttle = (fn, delay) => {
    let lastTime = 0;
    console.log(`called throttle immediately`);
    return (...args) => {
        const now = new Date().getTime();
        if(now - lastTime < delay)
            return; 
        lastTime = now;
        fn(...args);
    }
}

// Memoization ----------------------------------------->

const initAp = async () => {
    const multiplyBy10 = memoizedMultiplyBy10();
    console.log(multiplyBy10(10));
    console.log(multiplyBy10(10));
    console.log(multiplyBy10(10));
}

document.addEventListener('DOMContentLoaded', initAp);

const multiplyBy10 = num => {
    return num * 10;
}

const memoizedMultiplyBy10 = () => {
    const cache = {};

    return (num) => {
        if(num in cache) {
            console.log(cache);
            return cache[num];
        }
        const result = num * 10;
        cache[num] = result;
        return result;
    }
}




















