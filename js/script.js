//задание 1
//создаем объект в котором изолируем переменные и функции
let exc1 = {
  text: "Paragraph (from object)",
  method: function() {
    //т.к. у нас несколько дивов с параграфами, выбираем, который от первого задания
    let excDiv = document.getElementById("exc1");
    let allP = excDiv.getElementsByTagName("p");

    for (currentP in allP) {
      allP[currentP].innerHTML = this.text;
      allP[currentP].classList.remove("exc1-fromFun");
      allP[currentP].classList.add("exc1-fromObj");
    }
  }
};

//на кнопку вешаем вызов метода ранее созданного элемента
document.getElementById("fromObj").onclick = () => {
  exc1.method();
};

/*по задания нужно было самовызывающуюся анонимную функцию...но для удобства (чтоб на одном листе все было)
создал анонимную функцию, которая вызывается по клику кнопки...в принципе - принцип тотже
*/
document.getElementById("fromFun").onclick = () => {
  let text = "Paragraph (from anonim function)";
  let excDiv = document.getElementById("exc1");
  let allP = excDiv.getElementsByTagName("p");
  for (currentP in allP) {
    allP[currentP].innerHTML = text;
    allP[currentP].classList.remove("exc1-fromObj");
    allP[currentP].classList.add("exc1-fromFun");
  }
};

//задание 2
document.getElementById("addP").onclick = () => {
  //получаем наш див, в котором развернутся действия 2-ого задания
  let divExc2 = document.getElementById("exc2-list");
  // получаем кол-во дочерних параграфоф в нашем диве
  let counter = divExc2.getElementsByTagName("p");
  //если количетсво параграфоф уже 10
  if (counter.length >= 10) {
    alert("Внимание! Вы создали 10 параграфов! Они будут удалены.");
    //в цикле удаляем последний элемент в диве, пока не кончатся
    while (divExc2.lastChild) {
      divExc2.removeChild(divExc2.lastChild);
    }
    //если параграфов меньше 10, то создаем очередно
  } else {
    let newP = document.createElement("p");
    //присваиваем ему текст
    newP.innerHTML = `Element №${+counter.length + 1}`;
    //добавляем его к нашему диву
    divExc2.appendChild(newP);
  }
};
