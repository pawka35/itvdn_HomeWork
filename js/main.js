const CORSE_HACK = "https://cors-anywhere.herokuapp.com/";
let countryList = document.getElementById("hotel-list");

document.addEventListener("DOMContentLoaded", () => {
  // console.log("dsf");
  testFetch("http://api-gateway.travelata.ru/directory/countries")
    .then(result => result.json())
    .then(res => {
      res.data.forEach(element => {
        let newCountry = document.createElement("option");
        newCountry.innerHTML = element.name;
        newCountry.value = element.name;
        newCountry.dataset.id = element.id;
        countryList.appendChild(newCountry);
      });

      countryList.addEventListener("change", e => {
        let selId = e.target[e.target.selectedIndex].dataset.id;
        getCities(selId);
      });
    });
});

function getCities(countryId) {
  //получаем список курортов в стране
  console.log(countryId);
  let container = document.getElementById("hotels-list-wrapper");
  let citySelect = document.createElement("select");

  testFetch("http://api-gateway.travelata.ru/directory/resorts")
    .then(res => res.json())
    .then(res => {
      res.data.forEach(item => {
        if (item.countryId == countryId) {
          let newCity = document.createElement("option");
          newCity.innerHTML = item.name;
          newCity.value = item.id;
          citySelect.appendChild(newCity);
        }
      });
    });
  citySelect.addEventListener("change", e => {
    //при выборе курорта делаем запросы на его отели
    getHotels(e.target.value);
  });
  container.appendChild(citySelect);
}

function getHotels(resortId) {
  // получаем отели выбранного курорта
  let container = document.getElementById("hotels-list-wrapper");
  let hotelSelect = document.createElement("select");
  testFetch(
    `http://api-gateway.travelata.ru/directory/resortHotels?resortId=${resortId}`
  )
    .then(res => res.json())
    .then(data => { //выводим полученные отели
      data.data.forEach(item => {
        let newHotel = document.createElement("option");
        newHotel.innerHTML = item.name;
        newHotel.value = item.name;
        hotelSelect.appendChild(newHotel);
      });
      hotelSelect.addEventListener("change", e => {
        //при выборе отеля ищем его уже в другом api, чтобы получить подробную информацию
        getCurrentHotel(e.target.value);
      });
      container.appendChild(hotelSelect);
    })
    .catch(error => console.log(error));
}

function getCurrentHotel(hotelName) { //получаем информацию по конкретному отелю
  console.log(hotelName);
  let options = {
    method: "POST",
    body: JSON.stringify({
      query: `${hotelName}'`,
      lang: "ru",
      lookFor: "both",
      limit: 10
    })
  };
  testFetch(`http://engine.hotellook.com/api/v2/lookup.json`, options)
    .then(res => res.json())
    .then(data => {
      showCurrentHote(data); // передаем для вывода в документ
    });
}

function showCurrentHote(data) {
  //показываем инфомацию по конкретному отелю
  let needHotel = data.results.hotels[0]; //возьмем только 1-ый найденный отель
  let hotelId = needHotel.id;
  let newHotel = document.createElement("div");
  // https://yasen.hotellook.com/photos/hotel_photos?id=27926056 запрос id фото отеля
  // https://photo.hotellook.com/image_v2/limit/photo_id/800/520.auto вставить фото отеля
  // console.log(data.results.hotels[0]);
  //сегодня посмотрел урок про fetch, будем пробовать к использованию
  testFetch(
    `${CORSE_HACK}https://yasen.hotellook.com/photos/hotel_photos?id=${data.results.hotels[0].id}`
  )
    .then(result => result.json()) // как получили ответ, парсим json
    .then(result => {
      //отбираем 3 картинки (может прийти больше)
      for (let i = 0; i < 3; i++) {
        testFetch(
          //получили id картинки, теперьь надо запросить саму картинку
          `${CORSE_HACK}https://photo.hotellook.com/image_v2/limit/${result[hotelId][i]}/800/520.auto`
        )
          .then(result => {
            //когда придет ответ - складываем картинки в массив
            let im = new Image();
            im.url = result.url;
            let hotelPhoto = document.createElement("img");
            hotelPhoto.src = im.url;
            newHotel.appendChild(hotelPhoto);
          })
          .catch(error => console.log(error)); //если что-то пошло не так, то отображаем ошибку
      }
    })
    .then(res => {
      newHotel.className = "newHotel-wrapper";
      let loc = document.createElement("div");
      loc.className = "newHotel-location";
      loc.innerHTML = needHotel.locationName;

      let hotName = document.createElement("div");
      hotName.innerHTML = needHotel.label;

      newHotel.appendChild(loc);
      newHotel.appendChild(hotName);
      // newHotel.appendChild(hotPhoto);
      document.getElementById("hotels-list-wrapper").appendChild(newHotel);
    }) //выводим див с информацией об отеле
    .catch(error => console.log(error));
}

//сегодня посмотрел урок про fetch, надо тренироваться
function testFetch(url, options) {
  return fetch(url, options);
}
