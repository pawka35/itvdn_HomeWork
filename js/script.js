//TODO 
// Понимаю, что не корректно оформлен скрипт (не обернут в функцию или объект), но дедлайн и надо делать
// другие д.з. Основноый функционал ДЗ есть.
/////////////////////

const addedElemPrice = { parmezan: 10, chorizo: 20, halapenio: 30 }; //цены на добавленные ингриденты

//цена на пиццу, на главной указана базовая цена, большая +100 ру к базовой, маленькая -100 ру к базовой
const pizzaPrice = { bigSize: 100, middleSize: 0, smallSize: -100 };

let prise = 0; //общая цена заказа
let lastAddedSum = 0; //переменная для хранения последнего изменения цены

//вспомогательная функция для поиска элемета по id
function get(id) {
  return document.getElementById(id);
}

//общая цена (с учетом добавленных ингридиентов)
let totalPrice = get("selectSection-price");

//функция для обновления цены, в зависимости от выбранных компонентов
let addedComponents = document.forms[0].ingridient;
for (let i = 0; i < addedComponents.length; i++) {
  addedComponents[i].addEventListener("change", e => {
    if (e.target.checked) {//если состояние изменилось на выбранный
      prise += addedElemPrice[e.target.id];  //добавляем к цене стоимость компонента
    } else { //тоже если компонент стал "невыбранный"
      prise -= addedElemPrice[e.target.id];
    }
    renewPrice(); //обновляем цену
  });
}

//функиця выбора размера пиццы
let sizeSelector = document.forms[0].size;
for (let i = 0; i < sizeSelector.length; i++) {
  sizeSelector[i].addEventListener("change", e => {
    let pizzaFoto = get("selectSection-foto");
    switch (e.target.id) { //в зависимости от размера пиццы увеличиваем или уменьшаем картинку
      case "bigSize":
        pizzaFoto.style.width = "100%";
        break;
      case "middleSize":
        pizzaFoto.style.width = "70%";
        break;
      case "smallSize":
        pizzaFoto.style.width = "50%";
        break;
    }
    prise -= lastAddedSum; //возвращаем базовую цену 
    prise += pizzaPrice[e.target.id]; //прибавляем к базовой цене цену размера
    lastAddedSum = pizzaPrice[e.target.id]; //записываем, что мы в последний раз меняли, чтобы потом вернуть как было, если снова будут изменения
    renewPrice();
  });
}

//функция обнвовляющая надпись цены на форме
function renewPrice() {
  totalPrice.innerHTML = prise + " ₽";
}

let mainPageBuyBtn = [...document.getElementsByClassName("goods-buy-button")];

//навешиваем на кнопку "купить" отрытие окна с заданными параметрами пиццы
mainPageBuyBtn.forEach(item => {
  item.addEventListener("click", e => {
    let buyWindow = get("selectSection");
    let parent = item.parentElement; //элемент родитель, где взять данные для заполнения
    let currentDesription = parent.getElementsByClassName("description")[0]; //описание
    let currentRecept = parent.getElementsByClassName("recept")[0].innerHTML; //рецепт
    let currentFoto = parent.getElementsByClassName("foto")[0].style
      .backgroundImage; //фото
    let currentPrice = parent.getElementsByClassName("price")[0].innerHTML; //цена

    //формируем надписи на котрываемом окне, в зависимости от того на которую пиццу щелкнули
    buyWindow.getElementsByClassName("selectSection-description")[0].innerHTML =
      currentDesription.innerHTML;
    buyWindow.getElementsByClassName(
      "selectSection-foto"
    )[0].style.backgroundImage = currentFoto;
    buyWindow.getElementsByClassName(
      "selectSection-recept"
    )[0].innerHTML = currentRecept;
    buyWindow.getElementsByClassName(
      "selectSection-price"
    )[0].innerHTML = currentPrice.replace("от", "");
    prise = parseInt(currentPrice.match(/\d+/));
    buyWindow.style.display = "block";

    let clsButton = get("clsButton"); //закрытие данного окна
    clsButton.addEventListener("click", () => {
      buyWindow.style.display = "none";
    });
  });
});


//кнопка купить пиццу, в окне, где выбираем параметры
let byuBtn = get("selectSection-buyButton");
byuBtn.addEventListener("click", e => {
  let userPhone = get("userPhone"); //поле ввода телефона
  let userAddress = get("userAddres"); //поле ввода адреса

  // проверякм корректности введения номера телефона
  let chk = checkPhone(userPhone.value);
  if (!chk.res) {
    showMessageWindow(chk.description, chk.message, "coral");
    e.preventDefault();
    return;
  }
 
  if (userAddress.value == "") {//проверяем заполнен ли адрес
    showMessageWindow(
      "Не указан адрес доставки.",
      "Введите адрес доставки, иначе мы не сможем доставить вам пиццу :(",
      "coral"
    );
    e.preventDefault();
    return;
  }
  e.preventDefault();

  //если все хорошо, отображаем окно, что заказ принят
  showMessageWindow(
    "Заказ принят!",
    "Ожидайте доставку.\nПриятного аппетита!",
    "lightblue"
  );
  //прячем форму, где выбирали параметры заказа (размер пиццы, добвки и пр)
  get("selectSection").style.display = "none";
});

//функияи проверки корректности ввода номера телефона
function checkPhone(phoneNumber) {
  let result = { res: true };
  //если поле пусто, ставим ошибку, указываем причину
  if (phoneNumber.split() == "") {
    result.res = false;
    result.description = "Не введен номер телефона";
    result.message = "Просьба указать ваш телефон";
  }
  //если в поле номер телефона присутвуют не только цифры, ставим ошибку, указываем причину
  if (/\D+/.test(phoneNumber)) {
    result.res = false;
    result.description = "Неверно введен номер телефона";
    result.message = "В номере есть не только цифры";
  }
  return result;
}

//функция для отображения каких-либо сообщения для пользователя
function showMessageWindow(description, message, color) {
  let messWindow = get("messageSection");
  messWindow.style.display = "block";
  messWindow.style.backgroundColor = color;
  console.log(message);
  messWindow.getElementsByClassName(
    "messageSection-description"
  )[0].innerHTML = description;
  messWindow.getElementsByClassName(
    "messageSection-text"
  )[0].innerHTML = message;

  let okBtn = get("messageSectionBtn");
  okBtn.addEventListener("click", () => {
    messWindow.style.display = "none";
  });
}

//покупаем напитки
let buyDrinks =[...document.getElementsByClassName('drinks-current-buy')];

buyDrinks.forEach(item=>item.addEventListener('click',(e)=>{
  showMessageWindow('Функция не реализована', "Для реализации просьба внести предоплату",'red');
}));
