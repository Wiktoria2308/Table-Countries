/**
 * method which finds 5 top currencies and 5 top languages
 * and show them on the page
 */

function topLangAnDCurrency() {
  fetch('https://restcountries.eu/rest/v2/all')
    .then((response) => response.json())
    .then((data) => {
      let array = [];
      let array2 = [];
      for (let i = 0; i < data.length; i++) {
        let lang = data[i].languages[0].name;
        let currency = data[i].currencies[0].name;
        array.push(lang);
        array2.push(currency);
      }
      array.sort();
      array2.sort();
      let sameItems = [];
      let sameItems2 = [];
      for (let j = 0; j < array.length; j++) {
        if (array[j + 1] === array[j]) {
          let howMany = getOccurrence(array, array[j]);
          sameItems.push([array[j], howMany]);
        }
        if (array2[j + 1] === array2[j]) {
          let howMany2 = getOccurrence(array2, array2[j]);
          sameItems2.push([array2[j], howMany2]);
        }
      }
      sameItems = sameItems
        .map(JSON.stringify)
        .reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
        .filter(function (item, index, sameItems) {
          return sameItems.indexOf(item, index + 1) === -1;
        }) // check if there is any occurence of the item in whole array
        .reverse()
        .map(JSON.parse); // revert it to original state

      sameItems.sort(function (a, b) {
        return b[1] - a[1];
      });

      sameItems2 = sameItems2
        .map(JSON.stringify)
        .reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
        .filter(function (item, index, sameItems2) {
          return sameItems2.indexOf(item, index + 1) === -1;
        }) // check if there is any occurence of the item in whole array
        .reverse()
        .map(JSON.parse); // revert it to original state

      sameItems2.sort(function (a, b) {
        return b[1] - a[1];
      });
      for (let l = 0; l < 5; l++) {
        let list = document.getElementById('top-language');
        let list2 = document.getElementById('top-currency');
        let listItem = document.createElement('LI');
        let listItem2 = document.createElement('LI');
        let listText = document.createTextNode(sameItems[l][0]);
        let listText2 = document.createTextNode(sameItems2[l][0]);
        listItem.appendChild(listText);
        list.appendChild(listItem);
        listItem2.appendChild(listText2);
        list2.appendChild(listItem2);
      }
      avgPopulationAreaNeighbours();
    });
}

/**
 * method which counts and shows average of population, area and number of neighbours
 */

function avgPopulationAreaNeighbours() {
  fetch('https://restcountries.eu/rest/v2/all')
    .then((response) => response.json())
    .then((data) => {
      let array = [];
      let array2 = [];
      let array3 = [];
      for (let i = 0; i < data.length; i++) {
        let population = data[i].population;
        let area = data[i].area;
        let neighbours = data[i].borders.length;
        array.push(population);
        array2.push(area);
        array3.push(neighbours);
      }
      let total = 0;
      let total2 = 0;
      let total3 = 0;
      for (let j = 0; j < array.length; j++) {
        total += array[j];
        total2 += array2[j];
        total3 += array3[j];
      }

      let avg = total / array.length;
      let avg2 = total2 / array2.length;
      let avg3 = total3 / array3.length;
      let result = document.getElementById('population');
      let result2 = document.getElementById('area');
      let result3 = document.getElementById('neighbours');
      result.innerHTML = Math.round(avg);
      result2.innerHTML = Math.round(avg2);
      result3.innerHTML = Math.round(avg3);
    });
}

/**
 * method counts how many same items includes in an array
 */

function getOccurrence(array, value) {
  let count = 0;
  array.forEach((v) => v === value && count++);
  return count;
}

/**
 * First example of method sameLanguage() which only finds top 5 languages
 * using i.a. JSON
 */
// function sameLanguage() {
//   fetch('https://restcountries.eu/rest/v2/all')
//     .then((response) => response.json())
//     .then((data) => {
//       let array = [];
//       for (let i = 0; i < data.length; i++) {
//         let lang = data[i].languages[0].name;
//         array.push(lang);
//       }
//       array.sort();
//       let sameItems = [];
//       for (let j = 0; j < array.length; j++) {
//         if (array[j + 1] === array[j]) {
//           let howMany = getOccurrence(array, array[j]);
//           sameItems.push([array[j], howMany]);
//         }
//       }
//       sameItems = sameItems
//         .map(JSON.stringify)
//         .reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
//         .filter(function (item, index, sameItems) {
//           return sameItems.indexOf(item, index + 1) === -1;
//         }) // check if there is any occurence of the item in whole array
//         .reverse()
//         .map(JSON.parse); // revert it to original state

//       sameItems.sort(function (a, b) {
//         return b[1] - a[1];
//       });
//       for (let l = 0; l < 5; l++) {
//         let list = document.getElementById('top-language');
//         let listItem = document.createElement('LI');
//         let listText = document.createTextNode(sameItems[l][0]);
//         listItem.appendChild(listText);
//         list.appendChild(listItem);
//       }
//     });
// }

/**
 * Second example of sameLanguage() method which only finds top 5 languages
 * using new Set
 *
 */

// function sameLanguage() {
//   fetch('https://restcountries.eu/rest/v2/all')
//   .then((response) => response.json())
//     .then((data) => {

//       let array= [];
//       for (let i = 0; i < data.length; i++) {
//         let lang = data[i].languages[0].name;
//         array.push(lang);
//       }
//       array.sort();
//       let sameItems = [];
//       for (let j = 0; j < array.length; j++) {
//         if (array[j + 1] === array[j]) {
//           sameItems.push(array[j]);
//         }
//       }
//       let reduceSameItems = [...new Set(sameItems)];

//       let langQuantity = [];
//       let howMany;
//       for (let k = 0; k < reduceSameItems.length; k++){
//         howMany = getOccurrence(sameItems, reduceSameItems[k]);
//         langQuantity.push([reduceSameItems[k], howMany]);
//       }
//       langQuantity.sort(function(a, b) {
//         return b[1] - a[1];
//        });
//       for (let l = 0; l < 5; l++){
//         let list = document.getElementById("top-language");
//         let listItem = document.createElement("LI");
//         let listText = document.createTextNode(langQuantity[l][0]);
//         listItem.appendChild(listText);
//         list.appendChild(listItem);
//       }
//     });
// }
