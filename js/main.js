const CORSE_HACK = "https://cors-anywhere.herokuapp.com/";
// let countryList = document.getElementById("hotel-list");
let myMap;

document.addEventListener("DOMContentLoaded", () => {
  getWeather();

  let wrapper = document.getElementById("hotels-list-wrapper");
  let coutrySelector = document.createElement("select");
  coutrySelector.classList.add("hotel-list-coutry");

  fetch("http://api-gateway.travelata.ru/directory/countries")
    .then(result => result.json())
    .then(res => {
      res.data.forEach(element => {
        let newCountry = document.createElement("option");
        newCountry.innerHTML = element.name;
        newCountry.value = element.name;
        newCountry.dataset.id = element.id;
        coutrySelector.appendChild(newCountry);
      });
      wrapper.appendChild(coutrySelector);
      coutrySelector.addEventListener("change", e => {
        // let citySel = document.getElementById("citySelect");
        clearSelectors(1); //очищаем все селекты на странице, начиная с первого (данный 0-ой)
        let selId = e.target[e.target.selectedIndex].dataset.id;
        getCities(selId);
      });
    });
});

function clearSelectors(beg) {
  //очищаем дивы и пр для нового запроса
  let wrapper = document.getElementById("hotels-list-wrapper");
  let selectors = wrapper.getElementsByTagName("select");
  for (i = beg; selectors.length > i; i++) {
    wrapper.removeChild(selectors[i]);
    console.log(beg);
  }

  let hotelDiv = document.getElementsByClassName("newHotel-wrapper")[0];
  if (!!hotelDiv) {
    console.log(hotelDiv);
    wrapper.removeChild(hotelDiv);
  }
  let mapDiv = document.getElementById("map");

  if (!!mapDiv) {
    if (!!myMap) {
      //если была карта, ее убираем
      myMap.destroy();
    }
    wrapper.removeChild(mapDiv);
  }
  //очищаем вывод погоды на курорте
  let wDiv = document.getElementById("footer-weather-hotel");
  wDiv.style.display = "none";
  wDiv.innerHTML = "";
}

function getCities(countryId) {
  //получаем список курортов в стране
  console.log(countryId);
  let container = document.getElementById("hotels-list-wrapper");
  let citySelect = document.createElement("select");
  citySelect.id = "citySelect";
  citySelect.classList.add("hotel-list-city");

  fetch("http://api-gateway.travelata.ru/directory/resorts")
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
    clearSelectors(2);
    getHotels(e.target.value);
  });
  container.appendChild(citySelect);
}

function getHotels(resortId) {
  // получаем отели выбранного курорта
  let container = document.getElementById("hotels-list-wrapper");
  let hotelSelect = document.createElement("select");
  hotelSelect.classList.add("hotel-list-hotels");
  fetch(
    `http://api-gateway.travelata.ru/directory/resortHotels?resortId=${resortId}`
  )
    .then(res => res.json())
    .then(data => {
      //выводим полученные отели
      data.data.forEach(item => {
        let newHotel = document.createElement("option");
        newHotel.innerHTML = item.name;
        newHotel.value = item.name;
        hotelSelect.appendChild(newHotel);
      });
      hotelSelect.addEventListener("change", e => {
        //при выборе отеля ищем его уже в другом api, чтобы получить подробную информацию
        clearSelectors(3);
        getCurrentHotel(e.target.value);
      });
      container.appendChild(hotelSelect);
    })
    .catch(error => console.log(error));
}

function getCurrentHotel(hotelName) {
  //получаем информацию по конкретному отелю
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
  fetch(`http://engine.hotellook.com/api/v2/lookup.json`, options)
    .then(res => res.json())
    .then(data => {
      let needHotel = data.results.hotels[0];
      console.log(needHotel);
      let newHotel = document.createElement("div");
      newHotel.className = "newHotel-wrapper";
      let loc = document.createElement("div");
      loc.className = "newHotel-location";
      loc.innerHTML = needHotel.locationName;

      let hotName = document.createElement("div");
      hotName.innerHTML = needHotel.label;
      hotName.className = "hotelName";

      newHotel.appendChild(loc);
      newHotel.appendChild(hotName);
      // newHotel.appendChild(hotPhoto);
      document.getElementById("hotels-list-wrapper").appendChild(newHotel);

      let showMap = document.createElement("button"); //кнопка показать на карте
      showMap.innerHTML = "Показать на карте";
      showMap.classList = "showMap";
      showMap.addEventListener("click", e => {
        //при нажатии обращаемся к функции API яндекс-карт
        showHotelMap(needHotel.location.lat, needHotel.location.lon);
        console.log(e.target);
        e.target.disabled = true;
      });
      newHotel.appendChild(showMap);
      showHotlePhoto(needHotel.id, newHotel); // получаем фото отеля в отдельном потоке

      //запрашиваем погоду в координатах донного отеля:
      let promise = getYandexWeather(
        needHotel.location.lat,
        needHotel.location.lon
      );
      promise.then(res => {
        let wDiv = document.getElementById("footer-weather-hotel");
        wDiv.innerHTML += `Текущая температура там: ${res.fact}&#8451;<br>Ощущается как: ${res.feelLike}&#8451;`;
        wDiv.style.display = "block";
      });
    });
}

function showHotlePhoto(hotelId, container) {
  fetch(
    // `${CORSE_HACK}https://yasen.hotellook.com/photos/hotel_photos?id=${hotelId}`
    `https://yasen.hotellook.com/photos/hotel_photos?id=${hotelId}`
  )
    .then(result => result.json()) // как получили ответ, парсим json
    .then(result => {
      //отбираем 3 картинки (может прийти больше)
      for (let i = 0; i < 3; i++) {
        fetch(
          //получили id картинки, теперьь надо запросить саму картинку
          //`${CORSE_HACK}https://photo.hotellook.com/image_v2/limit/${result[hotelId][i]}/800/520.auto`
          `https://photo.hotellook.com/image_v2/limit/${result[hotelId][i]}/800/520.auto`
        )
          .then(result => {
            //когда придет ответ - складываем картинки в массив
            let im = new Image();
            im.url = result.url;
            let hotelPhoto = document.createElement("img");
            hotelPhoto.src = im.url;
            hotelPhoto.style.width = "250px";
            hotelPhoto.classList = "hotelPhoto";
            container.appendChild(hotelPhoto);
          })
          .catch(error => {
            console.log(error);
          }); //если что-то пошло не так, то отображаем ошибку
      }
    })
    .catch(error => alert(error));
}

function showHotelMap(lat, lon) {
  // let myMap;
  let container = document.getElementById("hotels-list-wrapper");
  let mapDiv = document.createElement("div");
  mapDiv.id = "map";
  container.appendChild(mapDiv);
  // Дождёмся загрузки API и готовности DOM.
  ymaps.ready(init);

  function init() {
    (myMap = new ymaps.Map("map", {
      // При инициализации карты обязательно нужно указать её центр и коэффициент масштабирования.
      center: [parseFloat(lat), parseFloat(lon)],
      zoom: 14
    })),
      (myGeoObject = new ymaps.GeoObject(
        {
          // Описание геометрии.
          geometry: {
            type: "Point",
            coordinates: [parseFloat(lat), parseFloat(lon)]
          },
          // Свойства.
          properties: {
            // Контент метки.
            iconContent: "Ваш отель"
            // hintContent: "Ну давай уже тащи"
          }
        },
        {
          // Опции.  Иконка метки будет растягиваться под размер ее содержимого.
          preset: "islands#blackStretchyIcon",
          // Метку можно перемещать.
          draggable: false
        }
      ));
    myMap.geoObjects.add(myGeoObject);
  }
}

//немного потренируемся с геолокацией
function getWeather() {
  navigator.geolocation.getCurrentPosition(updateLocation);
}

//как получили логкацию, будем запращивать по ней температуру и выводить в футер
function updateLocation(pos) {
  let promise = getYandexWeather(pos.coords.latitude, pos.coords.longitude);
  promise.then(res => {
    document.getElementById("footer-weather-here").innerHTML += `
        Текущая температура у вас: ${res.fact}&#8451;<br>Ощущается как: ${res.feelLike}&#8451;
        `;
  });
}

//функция получения температуры по долготе и широте от api яндекса
function getYandexWeather(lat, lon) {
  let options = {
    headers: {
      "X-Yandex-API-Key": "d1ebab50-32b5-4f4e-9169-96df13730071"
    }
  };
  //let url = `${CORSE_HACK}https://api.weather.yandex.ru/v1/forecast?lat=${lat}&lon=${lon}&lang="ru_RU"&limit=2`;
  let url = `https://api.weather.yandex.ru/v1/forecast?lat=${lat}&lon=${lon}&lang="ru_RU"&limit=2`;

  return fetch(url, options)
    .then(result => result.json())
    .then(res => {
      return { fact: res.fact.temp, feelLike: res.fact.feels_like };
    });
}
