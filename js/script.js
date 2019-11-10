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

let dedBattle = document.getElementById("left");

let marker = false;
let wins = 0; //количество подеб
let level = 0; //уровень персонажа

let oneAnimal;
let arrItems = ["Удача", "Палка", "Проклятье", "Мораль", "Ярость"];

function getDed(damage, armor) {
  let ded = {
    name: "Дед",
    color: "White",
    damage: damage,
    armor: armor,
    live: 100,
    many: 99999,
    mod: "Human"
  };
  return ded;
}

function getHare() {
  let hare = {
    name: "Заяц",
    color: "Gray",
    damage: 2,
    armor: 0.2,
    live: 100,
    many: 2,
    mod: "animal"
  };
  return hare;
}

function getWolf() {
  let wolf = {
    name: "Волк",
    color: "Gray",
    damage: 8,
    armor: 0.7,
    live: 100,
    many: 5,
    mod: "animal"
  };
  return wolf;
}

function getBear() {
  let bear = {
    name: "Медведь",
    color: "Black",
    damage: 12,
    armor: 0.9,
    live: 100,
    many: 7,
    mod: "animal"
  };
  return bear;
}

function getFox() {
  let fox = {
    name: "Лиса",
    color: "Orange",
    damage: 6,
    armor: 0.5,
    live: 100,
    many: 3,
    mod: "animal"
  };
  return fox;
}

let animal = [getWolf, getHare, getFox, getBear];

let kolobok = {
  name: "kolobok",
  color: "yellow",
  damage: 11,
  armor: 0.9,
  live: 100,
  many: 10,
  mod: "kolobok"
};
updateInfo(kolobok);

let animalPictures = {
  Волк: "image/volk.png",
  Заяц: "image/zayc.png",
  death: "image/death.png",
  Лиса: "image/fox.png",
  Медведь: "image/bear.png"
};

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

// начинаем бой
hit.onclick = function() {
  damgeDiller(oneAnimal, kolobok);
  if (kolobok.live > 0) {
    document.getElementById("actionChoise").style.display = "block"; //восстанавливаем кнопки магазина и прочего после время боя
    document.getElementById("button-block").style.display = "none"; //убираем кнопки боя
  } else {
    //если колобок погиб - убираем все кнопки
    document.getElementById("actionChoise").style.display = "none";
    document.getElementById("button-block").style.display = "none";
  }
};

//не хотим начинать бой, но все равно теряем жизней как за один удар
close.onclick = function() {
  kolobok.live = kolobok.live - oneAnimal.damage * kolobok.armor;
  //alert(`Kolobok сбжал! Вы потеряли ${oneAnimal.damage * kolobok.armor}`);
  warDesctiption(
    `<p class="animal-heat">Kolobok бежал с поля боя! От пинка ${
      oneAnimal.name
    }, Вы потеряли ${oneAnimal.damage - oneAnimal.damage * kolobok.armor}</p>`
  );
  document.getElementById("actionChoise").style.display = "block"; //восстанавливаем кнопки магазина и прочего после время боя
  document.getElementById("button-block").style.display = "none"; //убираем кнопки магазина и прочего на время боя

  updateInfo(kolobok);
};

function warDesctiption(desc) {
  //информация с поля боя выводится внизу
  battleDescription = document.getElementById("warDescription");
  battleDescription.innerHTML += `${desc}`;
}

//функция описывающая бой
function damgeDiller(animl, kol) {
  while (true) {
    //бой продолжается пока кто-то из соперников не погибнет
    animl.live = animl.live - kol.damage - kol.damage * animl.armor; // колобок бъет первым и отнимает у животного жизни
    updateInfo(animl);
    warDesctiption(
      `<p class="kolobok-heat"> Колобок нанес удар, у ${
        animl.name
      } осталось ${Math.round(animl.live, 2)} жизней </p>`
    );

    if (!checkAlive(animl.live)) {
      // если у животного жизни  закончились, выводи информацию и выходим из цикла
      document.getElementById("animalFoto").style.backgroundImage = `url(${
        animalPictures["death"]
      })`;
      document.getElementById("personName").innerHTML = "Противник побежден!";
      let bonusLife = randomInteger(10, 50);
      kol.live += bonusLife;
      if (kol.live > 100) {
        kol.live = 100;
      } //чтобы у колобка не стало более 100% жизней
      kol.many += animl.many;
      updateInfo(kol);
      warDesctiption(
        `<p class="kolobok-heat"> Колобок победил  ${
          animl.name
        }! Пообедав печенью врага восстановил ${bonusLife} жизней (теперь ${Math.round(
          kol.live,
          2
        )}) </p>`
      );
      warDesctiption(
        `<p class="kolobok-heat"> Колобок заработал  ${animl.many} $</p>`
      );
      wins++; //увеличиваем счетчик побед
      document.getElementById(
        "wins"
      ).innerHTML = `Побед: ${wins} Уровень: ${level}`;
      checkLeveUp(kol, wins); //проверяем не пора ли увеличивать скилы (увеличиваем за каждые 3 победы)
      break;
    }

    kol.live = kol.live - animl.damage - animl.damage * kol.armor; // животное бъет колобка
    updateInfo(kol);
    warDesctiption(
      `<p class="animal-heat">${
        animl.name
      } нанес удар, у колобка осталось ${Math.round(kol.live, 2)} жизней </p>`
    );

    if (!checkAlive(kol.live)) {
      // проверяем жив ли еще колобок
      alert("колобок погиб");
      warDesctiption(
        `<p class="animal-heat">Колобок погиб! Обновите страницу, чтобы начать заново</p>`
      );
      break;
    }
  }
}

// повышение навыков за каждые 3 победы
function checkLeveUp(kol, wins) {
  switch (true) {
    case wins % 3 == 0:
      level++;
      document.getElementById("levelUp").style.display = "block";
      let damUp = kol.damage * 0.2;
      let armorUp = kol.armor * 0.1;
      kol.damage += damUp;
      kol.armor += armorUp;
      document.getElementById(
        "levels"
      ).innerHTML = `<ul><li>Удар: ${kol.damage} (увеличение на ${damUp} ед.) </li><li>Броня: ${kol.armor} (увеличение на ${armorUp} ед.)  </li></ul>`;
      break;
  }
  document.getElementById("closeLevelUp").onclick = () => {
    document.getElementById("levelUp").style.display = "none";
    document.getElementById(
      "wins"
    ).innerHTML = `Побед: ${wins} Уровень: ${level}`;
  };
  updateInfo(kol);
}

function checkAlive(live) {
  if (live <= 0) {
    return false;
  } else {
    return true;
  }
}

dedBattle.onclick = () => {
  //битва с дедом (главным босом)
  if (kolobok.damage < 15) {
    alert(
      `Вы еще слишко слабы.\n Минимальное значение Урона для битвы с дедом = 15 (у вас ${kolobok.damage})`
    );
  }
};

// function lickeChoise() {
//   let animalPic = document.getElementById("animalFoto");
//   for (let i = 0; i < 30; i++) {
//     setTimeout(function() {
//       if (i % 2) {
//         console.log(i);
//         animalPic.style.backgroundImage = `url(${animalPictures["Волк"]})`;
//       } else {
//         console.log(i);
//         animalPic.style.backgroundImage = `url(${animalPictures["Заяц"]})`;
//       }
//     }, i * 200);
//   }
// }

//колобок идет в лес
right.onclick = function() {
  // lickeChoise();
  getEnemy();
};

function getEnemy() {
  document.getElementById("warDescription").innerHTML = ``;
  document.getElementById("kolobok-change").innerHTML = ``;
  document.getElementById("animal-change").innerHTML = ``;
  document.getElementById("kolobok-change").style.display = "none";
  document.getElementById("animal-change").style.display = "none";
  document.getElementById("actionChoise").style.display = "none"; //убираем кнопки магазина и прочего на время боя
  buttonBlock.style.display = "block";
  if (oneAnimal == "") {
    oneAnimal = animal[randomInteger(0, animal.length - 1)]();
  }
  let animalPic = document.getElementById("animalFoto");
  document.getElementById("personName").innerHTML = oneAnimal.name;
  animalPic.style.backgroundImage = `url(${animalPictures[oneAnimal.name]})`;
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
        if (name == "kolobok") {
          let info = document.getElementById("kolobok-change");
          info.innerHTML = `Колобок нашел ${newItem.name} его ${elem} изменилось на ${newItem[elem]}`;
          info.style.display = "block";
        } else {
          let info = document.getElementById("animal-change");
          info.innerHTML = `${name} нашел ${newItem.name} его ${elem} изменилось на ${newItem[elem]}`;
          info.style.display = "block";
          // alert(
          //   `${name} нашел ${newItem.name} его ${elem} изменилось на ${newItem[elem]}`
          // );
        }
      }
    }
  }
}

function buyGood(goods) {
  switch (goods) {
    case goods == "live": {
    }
  }
}

//магазин
top1.onclick = function() {
  document.getElementById("shop").style.display = "block";
  document.getElementById("shop-exit-button").onclick = () => {
    document.getElementById("shop").style.display = "none";
  };

  let goods = {
    damage: {
      cost: 20,
      count: 10,
      name: "damage",
      descr: "увеличение урона"
    },
    live: {
      cost: 10,
      count: 10,
      name: "live",
      descr: "увеличение жизни"
    },
    armor: {
      cost: 15,
      count: 10,
      name: "armor",
      descr: "увеличение брони"
    }
  };

  let buyButtons = document.getElementsByClassName("buyBtn");
  for (el in buyButtons) {
    buyButtons[el].onclick = function() {
      let wantGoods = goods[this.id];
      if (kolobok.many >= wantGoods.cost) {
        kolobok.many -= wantGoods.cost;
        if (this.id == "live") {
          //если покупаем жизнь, то увеличиваем на 10 ед
          kolobok[this.id] += wantGoods.count;
        } else {
          // если что-то другое, то увеличиваем на 10%
          let up = kolobok[this.id] * 0.1;
          kolobok[this.id] += up;
        }
        updateInfo(kolobok);
        alert(
          `Ура!\nПреобретено ${wantGoods.descr}! Новое значение: ${
            kolobok[this.id]
          }`
        );
      } else {
        alert(
          `Денег нет, но вы держитесь!\nУ вас ${kolobok.many}$, а ${wantGoods.descr} стоит ${wantGoods.cost}$.`
        );
      }
    };
  }
};

// выбор случайной величины
function randomInteger(min, max) {
  let rand = min + Math.random() * (max - min);
  return Math.round(rand);
}

// обновление статистики
function updateInfo(item) {
  if (item.mod === "kolobok") {
    kolName.innerHTML = `Имя: ${item.name}`;
    kolDamage.innerHTML = `Урон: ${item.damage}`;
    kolArmor.innerHTML = `Броня: ${item.armor}`;
    kolMany.innerHTML = `Деньги: ${item.many}`;
    kolLive.value = item.live;
  } else {
    animalName.innerHTML = `Имя: ${item.name}`;
    animalDamage.innerHTML = `Урон: ${item.damage}`;
    animalArmor.innerHTML = `Броня: ${item.armor}`;
    animalCost.innerHTML = `Стоимость: ${item.many}`;
    animalLive.value = item.live;
  }
}
