//для секундомера
function Secundomer()  {
  this.date = new Date(0, 0, 0, 0, 0, 0, 0),
  this.interval,
  this.startButton = document.getElementById("secStart"),
  this.outDiv = document.getElementById('outPutDiv'),
  this.curStamp = 0,

  this.startButton.onclick = ()=>{
    this.start();
  },
  this.stopButton = document.getElementById("secStop"),
  this.stopButton.onclick = ()=>{
    this.stop();
  },

  this.resetButton = document.getElementById("secReset"),
  this.resetButton.onclick = ()=>{
    this.reset();
  },
 
  this.main =  ()=> {
    this.date.setMilliseconds(this.date.getMilliseconds()+100);
    this.outDiv.innerHTML = `${this.date.getHours()<10?"0"+this.date.getHours():this.date.getHours()}:`+
    `${this.date.getMinutes()<10?"0"+this.date.getMinutes():this.date.getMinutes()}:`+
    `${this.date.getSeconds()<10?"0"+this.date.getSeconds():this.date.getSeconds()}:`+
    `${this.date.getMilliseconds()/100}`;
  },

  this.start =  function() {
    this.interval = setInterval(this.main,100);
    this.startButton.setAttribute("disabled", "disabled");
  },

  this.stop =  function(){
    clearInterval(this.interval);
    this.startButton.removeAttribute("disabled");
  },
  
  this.reset =  function(){
    this.date = new Date(0, 0, 0, 0, 0, 0, 0),
    this.outDiv.innerHTML = '00:00:00:0';
  }
};

let secundomer = new Secundomer();
