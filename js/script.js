exc_pre1();
//exc2();

function exc_pre1() {
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

let doc;

let docButton = document.getElementById("docButton");
docButton.onclick = () => {
  let docHeader = document.getElementById("docHeader").value;
  let docFooter = document.getElementById("docFooter").value;
  let docBody = document.getElementById("docBody").value;
  doc = createDocument(); // создаем документ
  doc.makeDoc(docHeader, docBody, docFooter); //заполняем значениями из полей ввода
  writeDocument();
  document.getElementById("appButton").disabled = false;
};

let appButton = document.getElementById("appButton");
appButton.onclick = () => {
  let appHeader = document.getElementById("appHeader").value;
  let appFooter = document.getElementById("appFooter").value;
  let appBody = document.getElementById("appBody").value;
  let appDate = document.getElementById("appDate").value;

  doc.makeApp(appHeader, appBody, appFooter, appDate); //заполняем значениями из полей ввода
  writeApp();
};

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

    makeDoc: function(docHeader, docBody, docFooter){
      this.header = docHeader,
      this.body = docBody,
      this.footer = docFooter
    },

    makeApp: function (header,body,footer,date){
      this.app.header = header;
      this.app.body = body;
      this.app.footer=footer;
      this.app.date = date;
    }
  };
  return document;
}

function writeDocument() {
  let docHeader = document.getElementById("headerDocText");
  let docFooter = document.getElementById("footerDocText");
  let docBody = document.getElementById("bodyDocText");
  docHeader.innerHTML = doc.header;
  docFooter.innerHTML = doc.footer;
  docBody.innerHTML = doc.body;
}

function writeApp(){
  alert(doc.app.header);
  alert(doc.app.body);
  alert(doc.app.footer);
  alert(doc.app.date);
}