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

let player = myPlayer(); //создаем наш объект и запускаем функционал

function myPlayer() {
  //инкапсулируем наш плеер в отдельный объект
  this.video = document.querySelector("video");
  this.btnPlay = document.querySelector("#play");
  this.btnFullScreen = document.querySelector("#fullScreen");
  this.progress = document.querySelector("progress");
  this.stop = document.querySelector("#stop");
  this.nextSong = document.querySelector("#next");
  this.prevSong = document.querySelector("#prev");
  this.mute = document.querySelector("#mute");
  this.sound = document.querySelector("#sound");
  this.playList;
  this.playingClip = null;

  window.addEventListener("DOMContentLoaded", () => {
    let worker = new Worker("js/worker.js"); //запускаем воркер, который получит список файлов
    worker.postMessage(""); //запускаем воркера

    worker.addEventListener("message", e => {
      //при получении ответа от воркера
      let playListDiv = document.querySelector("#playlist"); // находим див, в котором должен быть список песен
      playList = [...e.data.playlist]; //создаем массив в песнями
      playList.forEach((element, index) => {
        //для каждого элемента списка делаем
        let newClip = document.createElement("div"); //создаем новый див
        newClip.innerHTML = element.artist; // вписываем имя исполнителя
        newClip.dataset.id = index; //айдишник в нашем массиве
        newClip.classList.add("playlist-currentSong"); //добавяем класс фоормления
        playListDiv.appendChild(newClip); //добавлеяем в список
        newClip.addEventListener("click", e => {
          //по щелчку на него, меняем текущую песню на выбранную
          changeSong(index);
        });
      });
    });
  });

  function changeSong(id) {
    //функкция смены песни
    video.src = playList[id].url; //из массива вытаскиваем элемент и присваиваем плееру
    video.poster = playList[id].poster;
    playingClip = id;
    playlSong(); //начинаем проиграывать клип
  }

  function playlSong() {
    //проигрывание клипа
    let fromLoc = JSON.parse(localStorage.getItem("clips")); //загружаем наши клипы из стораджа
    if (!!fromLoc) {
      //если есть записанные данные
      if (!!fromLoc[playingClip].timeStamp) {//если существует место прошлого останова
        video.currentTime = fromLoc[playingClip].timeStamp; //то перематываем на место окончания просмотра
      }
    }

    video.play(); //начинаем проигрывание
    let tmpPl = [...document.querySelectorAll(".playlist-currentSong")]; //выбираем все наши дивы с клипами
    tmpPl.forEach((element, index) => {
      if (element.dataset.id == playingClip) {
        //если это тот, что сейчас играет - добавляем оформления
        element.classList.add("playingSong");
      } else {
        element.classList.remove("playingSong"); //для оставльных убираем оформление
      }
    });
    setTimeout(() => {
      //без таймера не успевало получить данные о клиппе
      sound.value = video.volume;
      progress.max = video.duration; //выставляем макс значение полосы прогресса, согласно продолжительности клипа
      document.querySelector("#curDur").innerHTML = secondsToDate(
        video.duration
      ); //показываем общую длину песни
    }, 300);
  }

  function secondsToDate(seconds) {
    //функция для перевода секундв в формат чч:мм:сс
    let date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
  }

  prevSong.addEventListener("click", () => {
    //нажатие на кнопку предыдущая песня
    playNextPrev("prev");
    setTimeout(() => playlSong(), 1000); //таймаут для красоты, чтобы посмотреть обложку
  });

  nextSong.addEventListener("click", () => {
    //нажатие на кнопку следующая
    playNextPrev("next");
    setTimeout(() => playlSong(), 1000);
  });

  stop.addEventListener("click", () => {
    //стоп
    video.pause();
    video.currentTime = 0;
    progress.value = 0;
  });

  btnPlay.addEventListener("click", () => {
    //плей
    if (!playingClip) playingClip = 0; //если песня не играла, то начинаем с 0
    changeSong(playingClip);
  });

  btnFullScreen.addEventListener("click", () => {
    //на полный экран
    video.requestFullscreen();
  });

  video.addEventListener("timeupdate", e => {
    //при обновлении видео
    progress.value = video.currentTime; //двигаем прогресс бар
    document.querySelector("#duration").innerHTML = secondsToDate(
      video.currentTime
    ); //отображаем текущее положение
    playList[playingClip].timeStamp = video.currentTime;
    localStorage.setItem("clips", JSON.stringify([...playList]));
  });

  progress.addEventListener("click", e => {
    //при щалчке на прогрессе, может перескакивать к выбранному моменту
    let totalLength = parseInt(getComputedStyle(progress).width);
    video.currentTime = (video.duration * e.clientX) / totalLength;
  });

  mute.addEventListener("click", e => {
    video.muted = !video.muted;
    if (video.muted) {
      mute.classList.add("playingSong");
    } else {
      mute.classList.remove("playingSong");
    }
  });

  document.addEventListener("keydown", e => {
    e.preventDefault(); //предотвращаем перемотку документа вверх/вниз
    switch (e.keyCode) {
      case 40:
        if (video.volume > 0.1) video.volume -= 0.1;
        break;
      case 38:
        if (video.volume < 1) video.volume += 0.1;
        break;
    }
    sound.value = video.volume;
  });

  function playNextPrev(direction) {
    //перемотка на 10 сек туда-сюда
    switch (direction) {
      case "next":
        video.currentTime += 10;
        break;
      case "prev":
        video.currentTime -= 10;
        break;
    }
  }
}
