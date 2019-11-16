window.onload = ()=>{
let parms = document.location.search.split('&');
document.getElementById('info').innerHTML = parms;
let elements =[];
parms.forEach(el => elements.push(el.split("=")[1]));
document.getElementById('info').innerHTML = elements;
let sum = 0;
elements.map(el=> sum+=parseFloat(el));
document.getElementById('summa').innerHTML = `Сумма: ${sum}`;

document.getElementById('back').onclick = ()=>{
    document.location = "index.html";
}
};