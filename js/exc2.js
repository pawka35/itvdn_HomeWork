(function() {
  let btn = document.getElementById("enterBtn");

  btn.onclick = event => {
    event.preventDefault();
    let lgn = document.getElementById("login");
    let psw = document.getElementById("password");

    psw.onfocus = lgn.onfocus = function(e) {
      let er = [...document.getElementsByClassName("errorMessage")];
      er.forEach(item => {
        document.getElementById("loginForm").removeChild(item);
      });
      e.target.className = "";
    };

    if (lgn.value == "") {
      showError("Не введено имя пользователя!", lgn);
    } else if (psw.value == "") {
      showError("Не введен пароль!", psw);
    } else {
      showAuthResult();
    }

    function showAuthResult() {
      let parent = document.getElementById("loginForm");
      let lgnError = document.createElement("p");
      lgnError.style.position = "absolute";
      lgnError.style.top = "10px";
      lgnError.style.left = "10%";

      lgnError.onclick = () => {
        parent.removeChild(lgnError);
      };

      if (lgn.value == "admin" && psw.value == "12345") {
        // parent.className = "errorDiv";
        lgnError.className = "succesMessage";
        lgnError.innerHTML = "Поздравляю! Вы все правильно ввели.";
        parent.append(lgnError);
      } else {
        lgnError.className = "succesMessage";
        lgnError.innerHTML = "Неверный логин или пароль.";
        parent.append(lgnError);
      }
    }

    function showError(message, parent) {
      parent.className = "errorDiv";
      let lgnError = document.createElement("p");
      lgnError.style.position = "absolute";
      lgnError.style.top = `${parent.offsetTop - 40}px`;
      lgnError.style.left = "50%";
      lgnError.className = "errorMessage";
      lgnError.innerHTML = message;
      document.getElementById("loginForm").insertBefore(lgnError, parent);
    }
  };
})();
