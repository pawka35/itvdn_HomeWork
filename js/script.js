
const CORSE_HACK = 'https://cors-anywhere.herokuapp.com/';

let inpMessage = document.getElementById('message');
let outDiv = document.getElementById('outputDiv');

inpMessage.addEventListener('change',()=>{
    //talk(inpMessage.value);
    PeopleGenerator();
    console.log(inpMessage.value);
});


function PeopleGenerator(){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `https://randomuser.me/api/?results=5`);
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(JSON.parse(this.response));
        }
    });

    xhr.send();
}

function getMusic(){
    var data = null;

var xhr = new XMLHttpRequest();
// xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
	}
});

xhr.open("GET", `${CORSE_HACK}https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem`);
xhr.setRequestHeader("x-rapidapi-host", "deezerdevs-deezer.p.rapidapi.com");
xhr.setRequestHeader("x-rapidapi-key", "66002bd060msh0f2312223da9155p12aaf4jsn0f415817bea5");

xhr.send(data);
}


function talk(message){
    let xhr = new XMLHttpRequest();
    // let url = `${CORSE_HACK}http://aiproject.ru/api/`
    let url = `http://aiproject.ru/api/`
    //let url = 'https://xu.su/api/send'; //another chat bot
    // pp = {'uid':"e06a5358-560c-4def-b2d0-6ec87e7a443a",'bot':"main",'text':"Спать будешь?"};

    console.log(url);
     xhr.open("POST", url,true);
    pp = {'ask':`${message}`,'userid':'654321','key':''};
    jpp = JSON.stringify(pp);
     console.log(JSON.stringify(pp));
     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
     xhr.onreadystatechange = function () {
         if (xhr.readyState == 4 ) {
             outDiv.innerHTML += JSON.parse(xhr.response).aiml;
         }
     }
      console.log(jpp);
  
     xhr.send(`query=${jpp}`);
 }

