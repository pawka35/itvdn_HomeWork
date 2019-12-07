function _get(id) {
  return document.getElementById(id);
}

//const block
const CORSE_HACK = "https://cors-anywhere.herokuapp.com/";
const USERS_ENDPOINT = "https://gorest.co.in/public-api/users";
const NEWS_API = "72e5bc2b78bc4b8ea87cc9eabf5b372f";
const NEWS_ENDPOINT = `https://newsapi.org/v2/top-headlines?country=ru&apiKey=${NEWS_API}`;
const CLOSE_WELLCOME = "welcome-close";
const WELLCOME_BANNER = "welcome";
const ADD_FRIEND_FORM = "main-menu-addFriendForm";
const ADD_FRIEND_BTN = "addFriend-btn";
//end const block

window.addEventListener("DOMContentLoaded", () => {
  init();

  function init() {
    getFromAPI(USERS_ENDPOINT, "GET", showFriendsList);
    getFromAPI(NEWS_ENDPOINT, "GET", showNews);

    let addFriend = _get("addFriend");
    addFriend.addEventListener("click", () => {
      _get(ADD_FRIEND_FORM).style.display = "grid";
      _get(ADD_FRIEND_BTN).addEventListener("click", e => {
        e.preventDefault();
        let frm = document.forms["addFriendForm"];
        console.log(frm);
        let data = JSON.stringify({
          email: frm["emailFriend"].value,
          first_name: frm["first_name"].value,
          last_name: frm["last_name"].value,
          gender: frm["genre"].value,
          avatar: "https://lorempixel.com/250/250/people/?89233"
        });

        // console.log(data);
        getFromAPI(USERS_ENDPOINT, "POST", showNewFrind, data);
      });
    });

    let clsWlk = _get(CLOSE_WELLCOME);
    clsWlk.addEventListener("click", () => {
      _get(WELLCOME_BANNER).style.display = "none";
    });
  }

  function showNewFrind(result) {
    console.log(result);
    if (result._meta.code == 200) {
      let data = result.result;
      let userList = _get("main-friends");
      let newFriendDiv = document.createElement("div");
      let newP = document.createElement("div");
      let newPhoto = document.createElement("div");
      let newActive = document.createElement("div");
      newFriendDiv.classList.add("friends");
      newP.classList.add("friends-name");
      newPhoto.classList.add("friends-avatar");
      newActive.classList.add("friends-status");
      newP.innerHTML = data.first_name + " " + data.last_name;
      newFriendDiv.dataset.id = data.id;

      newFriendDiv.classList.add("active");
      newActive.style.backgroundColor = "green";
      newFriendDiv.addEventListener("click", () => {
        goToChat(newFriendDiv);
      });
      newFriendDiv.appendChild(newPhoto);
      newFriendDiv.appendChild(newP);
      newFriendDiv.appendChild(newActive);
      newPhoto.style.backgroundImage = `url(${data._links.avatar.href})`;
      userList.appendChild(newFriendDiv);
    } else {
      console.log(result);
      alert(result._meta.message);
    }
  }

  function showNews(info) {
    info.articles.forEach(item => {
      let newsDiv = _get("main-news");
      newsDiv.classList.add("news-container");
      let newArticle = document.createElement("div");
      newArticle.classList.add("news-article");
      let title = document.createElement("div");
      title.classList.add("news-title");
      let desc = document.createElement("div");
      desc.classList.add("news-desc");

      let url = document.createElement("div");
      url.classList.add("news-url");

      let photo = document.createElement("div");
      photo.classList.add("news-photo");

      desc.innerHTML = item.description;
      title.innerHTML = item.title;
      url.innerHTML = `<a href="${item.url}" target="_blank">Читать в источнике</a>`;
      photo.style.backgroundImage = `url(${item.urlToImage})`;

      newArticle.appendChild(title);
      newArticle.appendChild(photo);
      newArticle.appendChild(desc);
      newArticle.appendChild(url);
      newsDiv.appendChild(newArticle);
    });
  }
});

function getFromAPI(url, method, showFunction, dataToSend) {
  let res;
  let xhr = new XMLHttpRequest(); // Создание объекта для HTTP запроса.
  xhr.open(method, url, true);
  if (url.includes(USERS_ENDPOINT)) {
    xhr.setRequestHeader(
      "Authorization",
      "Bearer a5ceU_1231n7Z2tsOpOt9G_hYHPmVZu4FYUL"
    );
  }

  if (dataToSend) {
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
  }

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      res = JSON.parse(xhr.response);
      showFunction(res); //передаем ответ в функцию для отображения
    }
    if (xhr.status == 401) {
      res = JSON.parse(xhr.response);
    }
    let loader = document.getElementsByClassName("loader")[0];
    loader.style.display = "none";
  };

  xhr.send(dataToSend);
}

function showFriendsList(res) {
  let userList = _get("main-friends");
  for (let i = 0; i < 10; i++) {
    let newFriendDiv = document.createElement("div");
    let newP = document.createElement("div");
    let newPhoto = document.createElement("div");
    let newActive = document.createElement("div");

    newFriendDiv.classList.add("friends");
    newP.classList.add("friends-name");
    newPhoto.classList.add("friends-avatar");
    newActive.classList.add("friends-status");
    newP.innerHTML = res.result[i].first_name + " " + res.result[i].last_name;
    newFriendDiv.dataset.id = res.result[i].id;

    if (res.result[i].status == "active") {
      newActive.style.backgroundColor = "red";
    } else {
      newFriendDiv.classList.add("active");
      newActive.style.backgroundColor = "green";
      newFriendDiv.addEventListener("click", e => {
        // console.log(e.button);
        goToChat(newFriendDiv);
      });
    }

    newFriendDiv.addEventListener("mouseover", e => {
      let menuDiv = _get("deleteFriend");
      let btn = _get("delBtnID");
      if (btn) menuDiv.removeChild(btn);
      menuDiv.style.display = "none";
    });

    newFriendDiv.addEventListener("contextmenu", e => {
      e.preventDefault();
      let menuDiv = _get("deleteFriend");
      menuDiv.style.display = "grid";
      menuDiv.style.position = "absolute";
      menuDiv.style.top =
        +e.clientY + document.documentElement.scrollTop + 5 + "px";
      menuDiv.style.left =
        +e.clientX + document.documentElement.scrollLeft + 5 + "px";

      let delBtn = document.createElement("button");
      delBtn.id = "delBtnID";
      delBtn.innerHTML = "Удалить друга";
      delBtn.addEventListener("click", () => {
        deleteFriend(newFriendDiv);
      });
      menuDiv.appendChild(delBtn);
    });
    newFriendDiv.appendChild(newPhoto);
    newFriendDiv.appendChild(newP);
    newFriendDiv.appendChild(newActive);
    newPhoto.style.backgroundImage = `url(${res.result[i]._links.avatar.href})`;
    userList.appendChild(newFriendDiv);
  }
}

function deleteFriend(friend) {
  getFromAPI(`${USERS_ENDPOINT}/${friend.dataset.id}`, "DELETE", deleteResult);
  // console.log(res);
  let userList = _get("main-friends");
  let menuDiv = _get("deleteFriend");
  userList.removeChild(friend);
  menuDiv.style.display = "none";
}

function deleteResult(res) {
  console.log(res._meta.code);
  if (res._meta.code != 204) {
    alert(`Удаление не удалось!`)
    console.log(res);
  };
}

function goToChat(frDiv) {
  //открываем страницу с чатом с другом
  window.scrollTo(0, 0);
  let chat = _get("chat");
  chat.style.display = 'grid';
  _get('main-news').style.display='none';
  _get('chat-output').innerHTML = "";

   //из-за corse пришлось убрать динамическую загрузку страницы...было более красиво
  // let xhr = new XMLHttpRequest(); // Создание объекта для HTTP запроса.
  // xhr.open("GET", "_chat.html", false);
  // xhr.send();
  // if (xhr.readyState === xhr.DONE) {
  //   // console.log(xhr.responseText);
  //   chat.innerHTML = xhr.responseText;
  // }
  // chat.innerHTML = xhr.responseText;
  activateChat(frDiv);

  function activateChat(frDiv) {
    //заполняем страницу информацией о друге
    let bigFoto = document.getElementById("chat-friendInfo-Foto");
    let ft = frDiv.getElementsByClassName(
      "friends-avatar"
    )[0]; /*иногда показывается не тот аватар
    т.к. сервис по одной и той же ссылке выдает разные аватары..с нормальном api такой фигни не 
    будет*/
    let name = frDiv.getElementsByClassName("friends-name")[0];
    document.getElementById("chat-friendInfo-Name").innerHTML = name.innerHTML;
    bigFoto.style.backgroundImage = ft.style.backgroundImage;

    let messageInput = _get("chat-input-textArea");
    let sendBTN = _get("sendMessage");
    let outDiv = _get("chat-output");

    sendBTN.addEventListener("click", () => {
      sendMessage();
    });

    messageInput.addEventListener("keydown", e => {
      if (e.keyCode == 13 && e.ctrlKey == true) {
        sendMessage();
      }
    });

    function sendMessage() {
      //фукнция отправки сообщения боту
      let message = messageInput.value;
      let xhr = new XMLHttpRequest();
      if (message=="") return;
      //если не работает из-за corse, раскоментируйте url и закоментируйте текущий
      //let url = `${CORSE_HACK}http://aiproject.ru/api/`;
      let url = `http://aiproject.ru/api/`;

      //let url = 'https://xu.su/api/send'; //another chat bot
      //question = `{'uid':"e06a5358-560c-4def-b2d0-6ec87e7a443a",'bot':"main",'text':"${question}"}`;

      // console.log(url);
      xhr.open("POST", url, true);
      question = { ask: `${message}`, userid: `${_get('chat-friendInfo-Name').innerHTML}`, key: "" };
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          outDiv.innerHTML = outDiv.innerHTML.replace(
            "Набирает сообщение...",
            ""
          );
          outDiv.innerHTML += `<font color="green">${
            JSON.parse(xhr.response).aiml
          }</font><br>`;
          outDiv.scrollTop = outDiv.scrollHeight;
        }
      };
      messageInput.value = "";
      xhr.send(`query=${JSON.stringify(question)}`);
      outDiv.innerHTML += message + "<br>";
      outDiv.innerHTML += "&emsp;Набирает сообщение...";
      outDiv.scrollTop = outDiv.scrollHeight;
    }
    // chatActivated = true;
  }
}
