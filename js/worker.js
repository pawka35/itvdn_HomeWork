(function getPlayList() {
  let res;
  console.log('start worker');
  fetch("http://193.16.10.131/PlayList.json")
    .then(result => result.json())
    .then(result => postMessage(result));
})();
