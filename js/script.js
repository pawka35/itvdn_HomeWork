// const webamp = new Webamp({
//   // Optional.
//   initialTracks: [
//     {
//       metaData: {
//         artist: "Various Artist",
//         title: "TheFatRat & Anjulie"
//       },
//       url: "https://cors-anywhere.herokuapp.com/http://193.16.10.131/song1.mp3"
//     },
//     {
//       metaData: {
//         artist: "Rammstein",
//         title: "Random song"
//       },
//       url: "https://cors-anywhere.herokuapp.com/https://str3.pcradio.ru/Rammstein-med"
//     }
//   ]
// });
// // Render after the skin has loaded.
// webamp.renderWhenReady(document.getElementById("winamp-container"));

let video = document.querySelector("video");
let btnPlay = document.querySelector("#play");
let btnFullScreen = document.querySelector("#fullScreen");
let progress = document.querySelector("progress");
let stop = document.querySelector("#stop");

// webamp.close();

stop.addEventListener('click',()=>{
    video.pause();
    video.currentTime = 0;
    progress.value=0;
})


btnPlay.addEventListener("click", () => {
  video.play();
  console.log(video.duration);
  progress.max = video.duration;
});

btnFullScreen.addEventListener("click", () => {
  video.requestFullscreen();
});

video.addEventListener("timeupdate", e => {
//   console.log(video.currentTime);
  progress.value = video.currentTime;
});

progress.addEventListener('click',(e)=>{
    let totalLength = parseInt(getComputedStyle(progress).width);
    video.currentTime = video.duration*e.clientX/totalLength;
});

