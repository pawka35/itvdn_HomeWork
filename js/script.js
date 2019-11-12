//задание 1
function Begemot(name) {
  //свойтсво экземляра
  this.name = name;
  //метод экземпляра
  this.sayHello = () => {
    return `Hello!I am begemot and my name is ${this.name}`;
  };
}
//свойство функции-конструктора
Begemot.prototype.type = "animal";
//метод функции-конструктора
Begemot.prototype.walk = () => {
  return `Топ-топ-топ`;
};

let begemots = [new Begemot("Вася"), new Begemot("Валера")];
for (number in begemots) {
  console.log(
    `Бeгемот ${begemots[number].name} говорит: "${begemots[number].sayHello()}"`
  );
  console.log(`Бeгемот ${begemots[number].name} относится к типа ${
    begemots[number].type
  }, 
  бегает он вот так: ${begemots[number].walk()}`);
}
//конец задания 1

//задание 2
function Human(name, age) {
  this.name = name;
  this.age = age;
}

Human.prototype.toString = function() {
  return `Имя:${this.name},возраст: ${this.age};`;
};

let myArray = [
  new Human("Вася", 2),
  new Human("Петя", 1),
  new Human("Коля", 3)
];
console.log(`Unsort Array: ${myArray}`);
console.log(`Sort Array: ${sortMyArray(myArray, true)}`);
console.log(`Sort Array Distinct: ${sortMyArray(myArray, false)}`);

function sortMyArray(array, direction) {
  let tmpArr = [...array];
  if (direction) {
    return tmpArr.sort(function(a, b) {
      return a.age - b.age;
    });
  } else {
    return tmpArr.sort(function(a, b) {
      return b.age - a.age;
    });
  }
}
//конец задания 2

//задание 3
function Human2(name, age, sex) {
  this.name = name;
  this.age = age;
  this.sex = sex;
  this.say = function() {
    return `Hello!My name is ${this.name},my age is ${this.age},my sex is ${this.sex}`;
  };
}

Human2.prototype.legCount = 2;
Human2.prototype.walk = function() {
  return `Go-go-go!`;
};
//совместим с заданием 4
Human2.prototype.toString = function() {
  return `Это ${this.name}, возраст: ${this.age},пол: ${this.sex}, количество ног: ${this.legCount}.`;
};

let humans = [
  new Human2("Вася", 31, "man"),
  new Human2("Валерия", 23, "woman")
];
for (number in humans) {
  console.log(`${humans[number].name} говорит: "${humans[number].say()}"`);
  console.log(`У человека ${humans[number].name} количество ног: ${
    humans[number].legCount
  }, 
  побежали: ${humans[number].walk()}`);
  console.log(`${humans[number]}`);
}
//конец задания 3

//самостоятельно поизучаем классы и наследование по статье https://learn.javascript.ru/class-inheritance
class Car {
  constructor(type, color) {
    this.type = type;
    this.color = color;
  }
  get GetSpeed() {
    return this.speed();
  }

  speed() {
    let res;
    switch (this.type) {
      case "truck":
        res = 60;
        break;
      case "moto":
        res = 100;
        break;
    }
    return res;
  }
  //переопределяем метод прототипа
  toString() {
    return `Any Car=> Type: ${this.type}, Color: ${this.color}, speed: ${this.GetSpeed} `;
  }
}

Car.prototype.numberOfWeels = 4;

let car = new Car("truck", "red");
console.log(`${car}`);

class MyCar extends Car {
  constructor(type,color,cost) {
    //вызываем родительский конструктор
    super(type, color);
    //теперь работает наш конструктор и создает, что надо в этом классе
    this.cost = cost;
  }
  // переопределяем метод родителя
  toString() {
    return `My Car => Type: ${this.type}, Color: ${this.color}, Cost:${
      this.cost
    }, speed: ${super.GetSpeed} `;
  }
}

let myCar = new MyCar('moto','green',20000);
console.log(`${myCar}`);

// вывод: похоже на Python
