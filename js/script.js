function _get(id) {
  return document.getElementById(id);
}

window.addEventListener("DOMContentLoaded", () => {
  //const block
  const USERS_ENDPOINT = "https://gorest.co.in/public-api/users";

  const USERS_LIST =
    //end const block
    init();
  function init() {
    getUsers(USERS_ENDPOINT, "GET");
  }

  function getUsers(url, method) {
    let res;
    let xhr = new XMLHttpRequest(); // Создание объекта для HTTP запроса.
    xhr.open(method, url, true);
    xhr.setRequestHeader(
      "Authorization",
      "Bearer a5ceU_1231n7Z2tsOpOt9G_hYHPmVZu4FYUL"
    );
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        res = JSON.parse(xhr.response);

        let userList = _get("main-friends");
        for (let i = 0; i < 10; i++) {
          //   console.log(res.result[i]);
          let newFriendDiv = document.createElement("div");
          let newP = document.createElement("div");
          let newPhoto = document.createElement("div");
          let newActive = document.createElement("div");
          newFriendDiv.classList.add("friends");
          newP.classList.add("friends-name");
          newPhoto.classList.add("friends-avatar");
          newActive.classList.add("friends-status");

          // console.log(res.result[i].status)
          newP.innerHTML = res.result[i].first_name + res.result[i].last_name;
          newFriendDiv.dataset.id = res.result[i].id;

          if (res.result[i].status == "active") {
            newActive.style.backgroundColor = "red";
          } else {
            newFriendDiv.classList.add("active");
            newActive.style.backgroundColor = "green";
            newFriendDiv.addEventListener("click", () => {
              goToChat(newFriendDiv);
            });
            // goToChat(newFriendDiv);
          }
          // userList.innerHTML += res.result[i].first_name + res.result[i].last_name+'<br>';
          newFriendDiv.appendChild(newPhoto);
          newFriendDiv.appendChild(newP);
          newFriendDiv.appendChild(newActive);
          newPhoto.style.backgroundImage = `url(${res.result[i]._links.avatar.href})`;
          userList.appendChild(newFriendDiv);
        }
        // addToHtml(res.result)
      }
      if (xhr.status == 401) {
        res = JSON.parse(xhr.response);
        // console.log(res);
        // addToHtml(res.result)
      }

      let loader = document.getElementsByClassName("loader")[0];
      loader.style.display = "none";
    };
  }
});

function goToChat(frDiv) {
    // downloadScript();
  //   frDiv.addEventListener("click", () => {
//   console.log('we in to chat');
//   console.log(frDiv.dataset.id); 
 let chat = _get("main-news");
//     chat.innerHTML = `<script src="js/chat.js"></script>`;
  let xhr = new XMLHttpRequest(); // Создание объекта для HTTP запроса.
  
  xhr.open("GET", "_chat.html", false);
  xhr.send(); 
  if (xhr.readyState === xhr.DONE) {
    console.log(xhr.responseText);
    chat.innerHTML = xhr.responseText;
  }
   test();


//   xhr.onreadystatechange = function() {
   
//     // if (xhr.readyState == 4 && xhr.status == 200) {
//     //   res = xhr.response;
     
//     // // console.log(res);
//     //   chat.innerHTML = res;
//     //   test();
//     }
  };

//   xhr.open();
  //   });






function getMusic() {
  var data = null;

  var xhr = new XMLHttpRequest();
  // xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function() {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
    }
  });

  xhr.open(
    "GET",
    `${CORSE_HACK}https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem`
  );
  xhr.setRequestHeader("x-rapidapi-host", "deezerdevs-deezer.p.rapidapi.com");
  xhr.setRequestHeader(
    "x-rapidapi-key",
    "66002bd060msh0f2312223da9155p12aaf4jsn0f415817bea5"
  );

  xhr.send(data);
}

function talk(message) {
  let xhr = new XMLHttpRequest();
  // let url = `${CORSE_HACK}http://aiproject.ru/api/`
  let url = `http://aiproject.ru/api/`;
  //let url = 'https://xu.su/api/send'; //another chat bot
  // pp = {'uid':"e06a5358-560c-4def-b2d0-6ec87e7a443a",'bot':"main",'text':"Спать будешь?"};

  console.log(url);
  xhr.open("POST", url, true);
  pp = { ask: `${message}`, userid: "654321", key: "" };
  jpp = JSON.stringify(pp);
  console.log(JSON.stringify(pp));
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      outDiv.innerHTML += JSON.parse(xhr.response).aiml;
    }
  };
  console.log(jpp);

  xhr.send(`query=${jpp}`);
}


function test(){
    let rr = _get('chat-input');
    rr.addEventListener('input',()=>{
        console.log('sdfs');
    })
    
}
