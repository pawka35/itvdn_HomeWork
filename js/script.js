const addedElemPrice = { parmezan: 10, chorizo: 20, halapenio: 30 }; //цены на добавленные ингриденты
const pizzaPrice = { bigSize: 100, middleSize: 400, smallSize: 500 }; //цены на добавленные ингриденты

let prise = 0; //общая цена заказа
let lastAddedSum = 0; //переменная для хранения последнего изменения цены

function get(id) {
  return document.getElementById(id);
}

let totalPrice = get("selectSection-price");

//функция для обновления цены, в зависимости от выбранных компонентов
let addedComponents = document.forms[0].ingridient;
for (let i = 0; i < addedComponents.length; i++) {
  addedComponents[i].addEventListener("change", e => {
    if (e.target.checked) {
      prise += addedElemPrice[e.target.id];
    } else {
      prise -= addedElemPrice[e.target.id];
    }
    renewPrice();
  });
}

//функиця выбора размера пиццы
let sizeSelector = document.forms[0].size;
for (let i = 0; i < sizeSelector.length; i++) {
  sizeSelector[i].addEventListener("change", e => {
    let pizzaFoto = get("selectSection-foto");
    switch (e.target.id) {
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
    prise -= lastAddedSum;
    prise += pizzaPrice[e.target.id];
    lastAddedSum = pizzaPrice[e.target.id];
    renewPrice();
  });
}

//функция обнвовляющая надпись цены на форме
function renewPrice() {
  totalPrice.innerHTML = prise;
}



let mainPageBuyBtn = [...document.getElementsByClassName("goods-buy-button")];
console.log(mainPageBuyBtn);
mainPageBuyBtn.forEach((item) => {
    item.addEventListener('click',(e)=>{
      let buyWindow = get('selectSection');
        // console.log(item.parentElement)
        let parent = item.parentElement; //элемент родитель, где взять описание
        let currentDesription = parent.getElementsByClassName('description')[0];//описание 
        let currentRecept = parent.getElementsByClassName('recept')[0];//рецепт 
        let currentFoto = parent.getElementsByClassName('foto')[0].style.backgroundImage;
        let currentPrice = parent.getElementsByClassName('price')[0].innerHTML;
        console.log(currentFoto);
        // console.log(currentDesription.innerHTML);
        // selectSection-foto
        buyWindow.getElementsByClassName('selectSection-description')[0].innerHTML = currentDesription.innerHTML;
        buyWindow.getElementsByClassName('selectSection-foto')[0].style.backgroundImage = currentFoto;
        buyWindow.getElementsByClassName('selectSection-price')[0].innerHTML = currentPrice;
      buyWindow.style.display = 'block';
    
  });
});
