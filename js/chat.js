// document.addEventListener("DOMContentLoaded", () => {
//   const CORSE_HACK = "https://cors-anywhere.herokuapp.com/";

// //   downloadScript();
//   let inpMessage = document.getElementById("chat-input");
//   let outDiv = document.getElementById("chat-output");

//   inpMessage.addEventListener("change", () => {
//     //talk(inpMessage.value);
//     PeopleGenerator();
//     console.log(inpMessage.value);
//   });

//   function PeopleGenerator() {
//     let xhr = new XMLHttpRequest();
//     xhr.open("GET", `https://randomuser.me/api/?results=5`);
//     xhr.addEventListener("readystatechange", function() {
//       if (this.readyState === this.DONE) {
//         console.log(JSON.parse(this.response));
//       }
//     });

//     xhr.send();
//   }

//   function downloadScript() {
//     var xhr = XMLHttpRequest(),
//       doc = document;
//     xhr.responseType = "blob";
//     xhr.open("GET", "js/chat.js", true);
//     xhr.onload = function() {
//       let script = doc.createElement("script"),
//         src = URL.createObjectURL(xhr.response);

//       script.src = src;
//       doc.body.appendChild(script);
//     };
//     xhr.send();
//   }
// });
alert('dfs');