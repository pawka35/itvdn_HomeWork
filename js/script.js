/* Я честно пытался все это сделать без использования eval(), но не смог разобраться, как организовать
приоритет выполнения операций. В качестве доказательств попыток оставляю закоменченный код */

// let actions = {
//   "+": (a, b) => {
//     return parseInt(a) + parseInt(b);
//   },
//   "-": (a, b) => {
//     return parseInt(a) - parseInt(b);
//   },
//   "*": (a, b) => {
//     return parseInt(a) * parseInt(b);
//   },
//   "/": (a, b) => {
//     return parseInt(a) / parseInt(b);
//   }
// };

let enterString = "";

let commonsButton = document.getElementsByClassName("common");
for (let item of commonsButton) {
  item.onclick = function() {
    if (
      enterString == "" &&
      (this.value == "+" ||
        this.value == "-" ||
        this.value == "*" ||
        this.value == "/")
    ) {
      return;
    }

    if (
      (enterString.slice(-1) == "+"  ||
        enterString.slice(-1) == "=" ||
        enterString.slice(-1) == "*" ||
        enterString.slice(-1) == "/") 
        &&
      (this.value == "+" ||
        this.value == "-" ||
        this.value == "*" ||
        this.value == "/")) 
    {
      return;
    }

    enterString += this.value;
    document.getElementById("calcWindow").value += this.value;
  };
}

let resultButtom = document.getElementById("result");
resultButtom.onclick = function() {
  let result;
  if (
    !enterString.includes("+") &&
    !enterString.includes("-") &&
    !enterString.includes("*") &&
    !enterString.includes("/")
  ) {
    return;
  }
  result = eval(enterString);
  // var expr = new RegExp("\\d+", "g");
  // let digits = enterString.match(expr);
  // expr = new RegExp("\\D", "g");
  // let actionsArray = enterString.match(expr);

  // let umn = actionsArray.map((element, index, a) => {
  //   if (element == "*") {
  //     return index;
  //   }
  // });

  // for(let i in umn) {
  //   if (typeof(umn[i])!== 'undefined')
  //     alert(umn[i]);
  // }

  // for (let i = 0; i < actionsArray.length; i++) {
  //   if (i == 0) {
  //     result = actions[actionsArray[i]](digits[i], digits[i + 1]);
  //   } else {
  //     result = actions[actionsArray[i]](result, digits[i + 1]);
  //   }
  // }
  document.getElementById("calcWindow").value += `=${result}\n`;
  enterString = "";
};
let resetButtom = document.getElementById("reset");
resetButtom.onclick = () => {
  enterString = "";
  document.getElementById("calcWindow").value = "";
};


let deleteSymbol = document.getElementById("deleteSymbol");
deleteSymbol.onclick = () => {
  enterString = enterString.slice(0,enterString.length-1);
  document.getElementById("calcWindow").value = enterString ;
};
