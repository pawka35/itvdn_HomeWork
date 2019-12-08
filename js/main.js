// https://support.travelpayouts.com/hc/ru/articles/115000343268-API-данных-отелей#hotelphoto

document.addEventListener("DOMContentLoaded", () => {
  console.log("dsf");
  getFromAPI(
    "http://api-gateway.travelata.ru/directory/countries",
    "GET",
    fillCountryList
  );
});

function fillCountryList(data) { //выводим доступные страны
  // console.log(data.data);
  let countryList = document.getElementById("hotel-list");
  data.data.forEach(element => {
    let newCountry = document.createElement("option");
    newCountry.innerHTML = element.name;
    newCountry.value = element.name;
    newCountry.dataset.id = element.id;
    countryList.appendChild(newCountry);
  });

  countryList.addEventListener("change", e => { //при выборе страны делаем запрос на города
    let selId = e.target[e.target.selectedIndex].dataset.id;
    // console.log(selId);
    // e.options[e.selectedIndex].value;
    getFromAPI(
      " http://api-gateway.travelata.ru/directory/resorts",
      "GET",
      fillResorts,
      (transData = selId)
    );
  });
}

function fillResorts(data, transData) { //выводим города
  //выведем города выбранной страны
//   console.log(data.data, transData);
  let container = document.getElementById("hotels-list-wrapper");
  let citySelect = document.createElement("select");

  data.data.forEach(item => {
    // console.log(item.countryId);
    if (item.countryId == transData) {
      let newCity = document.createElement("option");
      newCity.innerHTML = item.name;
      newCity.value = item.id;

      console.log(item, transData);
    
      citySelect.appendChild(newCity);
    }
  });

  citySelect.addEventListener("change", e => { //при выборе города делаем запросы на отели этого города
    // console.log(e.target.value);
    fillHotels(e.target.value);
  });
  container.appendChild(citySelect);
}

function fillHotels(city){ //выводим отели
    getFromAPI(`http://api-gateway.travelata.ru/directory/resortHotels?resortId=${city}`,"GET", showHotels);
};


function showHotels(data){ //показываем отели в данном городе
    let container = document.getElementById("hotels-list-wrapper");
     let hotelSelect = document.createElement("select");
   console.log(data.data);
    data.data.forEach(item=>{
        let newHotel = document.createElement("option");
        newHotel.innerHTML = item.name;
        newHotel.value = item.name;
        hotelSelect.appendChild(newHotel);
    });
    hotelSelect.addEventListener('change',(e)=>{//при выборе отеля ищем его уже в другом api
        findCurrentHotel(e.target.value);
    });
    container.appendChild(hotelSelect);
}

function findCurrentHotel(hotelname){ //ищем конкретный отель
    let data = JSON.stringify({
        query:`${hotelname}'`,
        lang:'ru',
        lookFor:'both',
        limit:10
    });

    getFromAPI("http://engine.hotellook.com/api/v2/lookup.json","POST",showCurrentHote,null,data);
}

function showCurrentHote(data){ //показываем инфомацию по конкретному отелю
    // https://yasen.hotellook.com/photos/hotel_photos?id=27926056 запрос id фото отеля
    // https://photo.hotellook.com/image_v2/limit/photo_id/800/520.auto вставить фото отеля
    console.log(data.results.hotels);
//     fullName: "Suites & aparments by Goya, Гуаякиль, Эквадор"
// id: "6972161"
// label: "Suites & aparments by Goya"
// location: {lon: -79.89407, lat: -2.14937}
// locationId: 913
// locationName: "Гуаякиль, Эквадор"
// _score: 431583
    //   http://iatageo.com/getCode/ lon / lat




}
// getFromAPI(https://multitour.ru/mtapi/)

function getFromAPI(url, method, showFunction, transData = null, dataToSend) {
  //   console.log(transData);
  let res;
  let xhr = new XMLHttpRequest(); // Создание объекта для HTTP запроса.
  xhr.open(method, url, true);
  // if (url.includes(USERS_ENDPOINT)) {
  //   //если обращаемся к апи где пользователи...для новостного нам овтор. не нужна
  //   xhr.setRequestHeader(
  //     "Authorization",
  //     "Bearer a5ceU_1231n7Z2tsOpOt9G_hYHPmVZu4FYUL"
  //   );
  // }
  // if (dataToSend) {
  //     //если мы передаем какие-то данные, то указываем, что передаем json
  //     xhr.setRequestHeader("Content-Type", "application/json");
  //     xhr.setRequestHeader("Accept", "application/json");
  //   }

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      res = JSON.parse(xhr.response);
      //   console.log(transData);
      showFunction(res, transData); //передаем ответ в функцию для отображения
    }
    if (xhr.status == 401) {
      res = JSON.parse(xhr.response);
    }
    // let loader = document.getElementsByClassName("loader")[0];
    // loader.style.display = "none";
  };
  xhr.send(dataToSend);
}
