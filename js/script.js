exc_pre1();

/*Создать объект «Менеджер» с помощью блока инициализации, задать свойства «Имя, Фамилия,
возраст …».
Создать объект «Секретарь» с помощью конструктора, задать свойства «Имя, Фамилия, возраст …».*/ 
function exc_pre1() {
  document.write(`=========Задание 1====================<br>`);
  let manager = exc1("manager");
  for (let prop in manager) {
    document.write(`${prop}: ${manager[prop]}<br>`);
  }
  document.write(`=============================<br>`);
  let secr = exc1("secretary");
  for (let prop in secr) {
    document.write(`${prop}: ${secr[prop]}<br>`);
  }
  document.write(`=============================<br>`);
}

function exc1(who) {
  switch (who) {
    case "manager":
      //создаем объект с помощью блока инициализации
      let manager = {
        firstName: "Petr",
        lastName: "Petrov",
        age: 27
      };
      return manager;
    case "secretary":
      // создание блока с помощью конструктора
      let secretar = new Object();
      secretar.firstName = "Olga";
      secretar.LastName = "Volkova";
      secretar.age = 25;
      return secretar;
  }
}
//конец задания 1

/* 
Создать объект «Документ», в котором определить свойства «Заголовок, Тело, Футер, Дата». Создать в
объекте вложенный объект – «Приложение». Создать в объекте «Приложение», вложенные объекты,
«Заголовок, Тело, Футер, Дата». Создать методы для заполнения и отображения документа.
*/

let doc; 

// Ищем кнопку для формирования документа
let docButton = document.getElementById("docButton");
docButton.onclick = () => { // весим на нее событие
  let docHeader = document.getElementById("docHeader").value; //ищем инпуты в которых инфа для документа
  let docFooter = document.getElementById("docFooter").value;
  let docBody = document.getElementById("docBody").value;
  doc = createDocument(); // создаем документ
  doc.makeDoc(docHeader, docBody, docFooter); //заполняем значениями из полей ввода
  writeDocument(); // переносим документ в поля для вывода
  document.getElementById("appButton").disabled = false; //делаем активной кнопку добавить вложение

};

let appButton = document.getElementById("appButton"); //ищем кнопку для добавления инфы во вложение
appButton.onclick = () => {
  let appHeader = document.getElementById("appHeader").value; //далее тоже что и для документа, только для вложения
  let appFooter = document.getElementById("appFooter").value;
  let appBody = document.getElementById("appBody").value;
  let appDate = document.getElementById("appDate").value;

  doc.makeApp(appHeader, appBody, appFooter, appDate); //заполняем значениями из полей ввода
  writeApp();
};

let genButton = document.getElementById("genButton"); //кнопка для авт. заполнения полей
genButton.onclick = () => {
  let appHeader = document.getElementById("appHeader").value;
  let appFooter = document.getElementById("appFooter").value;
  let appBody = document.getElementById("appBody").value;
  let appDate = document.getElementById("appDate").value;

  document.getElementById("docHeader").value = "Lorem ipsum dolor.";
  document.getElementById("docBody").value = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit modi velit earum voluptatum iure cum, accusamus qui. Enim necessitatibus ipsum officia mollitia rem voluptas explicabo, distinctio, optio aperiam omnis vel."+
  "Sed sint incidunt enim, facilis saepe aut dolor error quaerat illo. Neque dolor nihil unde illo totam autem atque adipisci, architecto, eius dolorum incidunt facilis sunt, nam suscipit officiis voluptas."+
  "Perferendis cum dolor minima veritatis distinctio accusamus, recusandae ab dicta cumque earum, fugiat, eos nostrum nesciunt! Iure harum, similique repudiandae reiciendis fuga velit repellat pariatur fugit dignissimos, molestias numquam officiis!"+
  "Culpa inventore repellat commodi. Eius labore itaque quam nostrum saepe, unde repudiandae libero. Sunt ex eaque ad nam omnis fuga, ipsam eligendi! Dolores deleniti cum illo quam enim ducimus labore."+
  "Ipsam ut magni tempora repellat modi tenetur nam unde eaque, culpa illum, in fugiat vitae sed earum dignissimos nostrum, saepe quas sequi aliquam molestiae deserunt fugit doloribus dolore. Quisquam, accusamus!";
  document.getElementById("docFooter").value = "Neque dolor nihil unde illo totam autem .";

  document.getElementById("appHeader").value = "Eius labore itaque quam";
  document.getElementById("appBody").value = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit modi velit earum voluptatum iure cum, accusamus qui. Enim necessitatibus ipsum officia mollitia rem voluptas explicabo, distinctio, optio aperiam omnis vel."+
  "Sed sint incidunt enim, facilis saepe aut dolor error quaerat illo. Neque dolor nihil unde illo totam autem atque adipisci, architecto, eius dolorum incidunt facilis sunt, nam suscipit officiis voluptas."+
  "Perferendis cum dolor minima veritatis distinctio accusamus, recusandae ab dicta cumque earum, fugiat, eos nostrum nesciunt! Iure harum, similique repudiandae reiciendis fuga velit repellat pariatur fugit dignissimos, molestias numquam officiis!"+
  "Culpa inventore repellat commodi. Eius labore itaque quam nostrum saepe, unde repudiandae libero. Sunt ex eaque ad nam omnis fuga, ipsam eligendi! Dolores deleniti cum illo quam enim ducimus labore."+
  "Ipsam ut magni tempora repellat modi tenetur nam unde eaque, culpa illum, in fugiat vitae sed earum dignissimos nostrum, saepe quas sequi aliquam molestiae deserunt fugit doloribus dolore. Quisquam, accusamus!";
  document.getElementById("appFooter").value = "Quisquam, accusamus!";
  document.getElementById("appDate").value = '2019-11-07';

};

//создаем документ с вложенным объектом "вложение", также делаем функции для заполнения свойтств объектов
//возвращаем созданный объект (конструктор в классическом понимании)
function createDocument() {
  let document = {
    header:"",
    body: "",
    footer:"",
    app:{
      header: "",
      body: "",
      footer: "",
      date: ""
    },

    makeDoc: function(docHeader, docBody, docFooter){ //для заполнения полей документа
      this.header = docHeader,
      this.body = docBody,
      this.footer = docFooter
    },

    makeApp: function (header,body,footer,date){ //для заполнения полей вложенного объекта "вложение"
      this.app.header = header;
      this.app.body = body;
      this.app.footer=footer;
      this.app.date = date;
    }
  };
  return document;
};

//вывод документа в соотв. области разметки
function writeDocument() {
  let docHeader = document.getElementById("headerDocText");
  let docFooter = document.getElementById("footerDocText");
  let docBody = document.getElementById("bodyDocText");
  docHeader.innerHTML = doc.header;
  docFooter.innerHTML = doc.footer;
  docBody.innerHTML = doc.body;
};

//вывод вложения в соотв. области разметки
function writeApp(){
  let appHeader = document.getElementById("headerAppText");
  let appFooter = document.getElementById("footerAppText");
  let appBody = document.getElementById("bodyAppText");
  let appDate = document.getElementById("dateAppText");

  appHeader.innerHTML = doc.app.header;
  appFooter.innerHTML = doc.app.footer;
  appBody.innerHTML = doc.app.body;
  appDate.innerHTML = doc.app.date;
};
