let kolName = document.getElementById("name");
let kolDamage = document.getElementById("damage");
let kolArmor = document.getElementById("armor");
let kolMany = document.getElementById("many");
let kolLive = document.getElementById("live");

let animalName = document.getElementById("animal-name");
let animalDamage = document.getElementById("animal-damage");
let animalArmor = document.getElementById("animal-armor");
let animalCost = document.getElementById("animal-cost");
let animalLive = document.getElementById("animal-live");
let buttonBlock = document.getElementById("button-block");

let hit = document.getElementById("hit");
let close = document.getElementById("close");

let right = document.getElementById("right");
let top1 = document.getElementById("top");

let marker = false;

let oneAnimal;
let arrItems = ["Удача", "Палка", "Проклятье", "Мораль", "Ярость"];
let hare = {
  name: "Заяц",
  color: "Gray",
  damage: 10,
  armor: 0.9,
  live: 100,
  many: 2,
  mod: "animal"
};
let wolf = {
  name: "Волк",
  color: "Gray",
  damage: 15,
  armor: 0.8,
  live: 10,
  many: 5,
  mod: "animal"
};

let animal = [wolf, hare];

let kolobok = {
  name: "kolobok",
  color: "yellow",
  damage: 11,
  armor: 1,
  live: 100,
  many: 10,
  mod: "kolobok"
};
updateInfo(kolobok);

function getRandomItem(param) {
  let randomPercent = randomInteger(0, 100);

  if (randomPercent >= 0 && randomPercent < 25) {
    let item = new Object();
    item.damage = 0;
    item.armor = 0;
    item.live = 0;
    item.many = 0;
    item.name = arrItems[randomInteger(0, arrItems.length - 1)];
    let createStat = randomInteger(0, 100);
    if (createStat >= 0 && createStat < 25) {
      item.damage = randomInteger(-10, 10);
    } else if (createStat >= 25 && createStat < 50) {
      item.armor = randomInteger(-10, 10);
    } else if (createStat >= 50 && createStat < 75) {
      item.live = randomInteger(-10, 10);
    } else if (createStat >= 75 && createStat < 100) {
      item.many = randomInteger(-10, 10);
    }
    return item;
  }
}

hit.onclick = function() {
  damgeDiller(oneAnimal, kolobok);
};
close.onclick = function() {
  kolobok.live = kolobok.live - oneAnimal.damage * kolobok.armor;
  alert(`Kolobok сбжал! Вы потеряли ${oneAnimal.damage * kolobok.armor}`);
  updateInfo(kolobok);
};

function damgeDiller(animl, kol) {
  if (kol.damage > animl.damage) {
    animl.live = animl.live - kol.damage * animl.armor;

    if (checkLiveAnim(animl, kol)) {
      updateInfo(kol);
      return checkLiveAnim(animl, kol);
    }
    updateInfo(kol);
    updateInfo(animl);
  } else {
    kol.live = kol.live - animl.damage * kol.armor;

    if (!checkLiveAnim(animl, kol)) {
      updateInfo(kol);
      return checkLiveAnim(animl, kol);
    }
    updateInfo(kol);
    updateInfo(animl);
  }
}

function checkLiveAnim(anim, kol) {
  if (kol.live <= 0) {
    checkAlive(kol.live);
    return false;
  }
  if (anim.live <= 0) {
    kol.many += anim.many;
    updateInfo(kol);
    alert(`вы победили ${anim.name}`);
    return true;
  }
}

let animalPictures = {
  Волк: "/itvdn_HomeWork/image/volk.png",
  Заяц: "/itvdn_HomeWork/image/zayc.png"
};


function lickeChoise() {
  let animalPic = document.getElementById("animalFoto");
  for (let i = 0; i < 30; i++) {
    setTimeout(function() {
      if (i % 2) {
        console.log(i);
        animalPic.style.backgroundImage = `url(${animalPictures["Волк"]})`;
      } else {
        console.log(i);
        animalPic.style.backgroundImage = `url(${animalPictures["Заяц"]})`;
      }
    }, i * 200);
  }
}

right.onclick = function() {
   
    lickeChoise();

  oneAnimal = animal[randomInteger(0, animal.length - 1)];
  //   console.log(animalPictures[oneAnimal.name]);
  let animalPic = document.getElementById("animalFoto");
  animalPic.style.backgroundImage = `url(${animalPictures[oneAnimal.name]})`;

  buttonBlock.classList.remove("button-block");
  buttonBlock.classList.add("show");
  updateInfo(oneAnimal);
  let newItem = getRandomItem();
  if (newItem) {
    if (randomInteger(0, 1)) {
      kolobok.damage += newItem.damage;
      kolobok.live += newItem.live;
      kolobok.armor += newItem.armor;
      kolobok.many += newItem.many;
      getNameElem(kolobok.name);
      updateInfo(kolobok);
    } else {
      oneAnimal.damage += newItem.damage;
      oneAnimal.live += newItem.live;
      oneAnimal.armor += newItem.armor;
      oneAnimal.many += newItem.many;
      getNameElem(oneAnimal.name);
      updateInfo(oneAnimal);
    }
  }

  function getNameElem(name) {
    for (elem in newItem) {
      if (newItem[elem] > 0) {
        console.log(newItem);
        alert(
          `${name} нашел ${newItem.name} его ${elem} изменилось на ${newItem[elem]}`
        );
      }
    }
  }
};

top1.onclick = function() {
  let getItem = prompt(
    "Магазин: Жизнь - 10 (10 live) Броню - 15 (10 armor) Атака - 20 (10 damage)"
  );
  let items = {
    damage: {
      cost: 20,
      count: 10,
      name: "damage"
    },
    live: {
      cost: 10,
      count: 10,
      name: "live"
    },
    armor: {
      cost: 15,
      count: 10,
      name: "armor"
    }
  };

  if (getItem in items) {
    let element = items[getItem];
    console.log(element);
    if (kolobok.many >= element.cost) {
      switch (element.name) {
        case "damage":
          kolobok.damage += element.count;
          kolobok.many -= element.cost;

          break;
        case "live":
          kolobok.live += element.count;
          kolobok.many -= element.cost;

          break;
        case "armor":
          kolobok.armor += element.count;
          kolobok.many -= element.cost;

          break;
      }
      updateInfo(kolobok);
    } else {
      alert(
        `у вас не хватает денег на ${element.name}! у вас всего: ${kolobok.many}`
      );
    }
  }

  // updateInfo()
};

function randomInteger(min, max) {
  let rand = min + Math.random() * (max - min);
  return Math.round(rand);
}

function checkAlive(live) {
  if (live <= 0) {
    alert("вы проиграли!");
    window.location.reload();
  }
}

function updateInfo(item) {
  if (item.mod === "kolobok") {
    kolName.innerHTML = `Имя: ${item.name}`;
    kolDamage.innerHTML = `Урон: ${item.damage}`;
    kolArmor.innerHTML = `Броня: ${item.armor}`;
    kolMany.innerHTML = `Деньги: ${item.many}`;
    kolLive.innerHTML = `Жизнь: ${item.live}`;
  } else {
    animalName.innerHTML = `Имя: ${item.name}`;
    animalDamage.innerHTML = `Урон: ${item.damage}`;
    animalArmor.innerHTML = `Броня: ${item.armor}`;
    animalCost.innerHTML = `Стоимость: ${item.many}`;
    animalLive.innerHTML = `Жизнь: ${item.live}`;
  }
}
