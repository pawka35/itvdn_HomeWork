window.addEventListener("load", startFunc, false);

window.addEventListener("load", secondFunc, false);

function startFunc() {
  let btn = document.getElementById("switchButton");
  let inp = document.getElementById("inputElement");
  let listener1 = event => event.preventDefault();

  btn.addEventListener("click", e => {
    if (e.target.innerHTML == "SwitchOff") {
      e.target.innerHTML = "SwitchOn";
      inp.addEventListener("keypress", listener1);
    } else {
      e.target.innerHTML = "SwitchOff";
      inp.removeEventListener("keypress", listener1);
    }
  });

  let listener2 = e => {
    btn.innerHTML == "SwitchOn"
      ? (e.target.className = "off")
      : (e.target.className = "on");
  };

  inp.addEventListener("focus", listener2);
}

function secondFunc() {
  let txtArea = document.getElementById("textAreaInput");
  let rb = [...document.getElementsByName("exc2")];
  let shift = 1;
  let shiftInput = document.getElementById("number");

  let listener2 = function(e) {
    shift = parseInt(e.target.value);
  };

  shiftInput.addEventListener("change", listener2, false);
  let listener1 = e => {
    let ds = txtArea.value.split("");
    let shArr = [];
    ds.forEach(item => shArr.push(item.charCodeAt(0)));
    txtArea.value = "";
    if (e.target.value == "shifr") {
      shiftInput.setAttribute("readonly", "readonly");
      shArr.forEach(item => {
        txtArea.value += String.fromCharCode(item + shift);
      });
    } else if (e.target.value == "clearText") {
      shiftInput.removeAttribute("readonly");
      txtArea.value = "";
      shArr.forEach(item => {
        txtArea.value += String.fromCharCode(item - shift);
      });
    }
  };
  rb.forEach(item => item.addEventListener("change", listener1, false));
}
