document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  //CHANGE STORE TIMES HERE
  var storeOpen = 4;
  var storeClose = 16;            //uses function to convert military time format 00 - 24

  function Store(minHourlyCustomers, maxHourlyCustomers, averageCookiesPerCustomer) {
    this.minHourlyCustomers = parseInt(minHourlyCustomers);
    this.maxHourlyCustomers = parseInt(maxHourlyCustomers);
    this.averageCookiesPerCustomer = parseInt(averageCookiesPerCustomer);
    this.cookieCounts = [];
  }

  Store.prototype.generateRandomCustomers = function (min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  };

  Store.prototype.predictCookiesToBake = function (averageCookiesPerCustomer, randomGenCustomers) {
    var cookies = Math.round(this.averageCookiesPerCustomer * this.generateRandomCustomers(this.minHourlyCustomers, this.maxHourlyCustomers));
    this.cookieCounts.push(cookies);
    return cookies;
  };
  //ADD NEW STORES HERE
  var firstandpike = new Store(23, 65, 6.3);
  var seatacairport = new Store(3, 24, 1.2);
  var seattlecenter = new Store(11, 38, 3.7);
  var capitolhill = new Store(28, 38, 2.3);
  var alki = new Store(2, 16, 4.6);
  //ADD NEW STORES HERE
  var stores = {
    firstandpike: firstandpike,
    seatacairport: seatacairport,
    seattlecenter: seattlecenter,
    capitolhill: capitolhill,
    alki: alki,
  };
  createFormElem();
  createTableElem();

  printStoreHours();
  insertEmptyCornerCell();
  insertDailyTotalCell();
  printLocationsAndCookies();
  insertHourlyTotalsCell();
  collectHourlyCookies();
  function createFormElem(){
    var form = document.createElement('form');
    document.body.appendChild(form);
    form.setAttribute('id', 'storeform');
    var fieldset = document.createElement('fieldset');
    var formEl = document.getElementById('storeform');
    formEl.appendChild(fieldset);
    var legend = document.createElement('legend');
    fieldset.appendChild(legend);

    var label = document.createElement('label');
    label.setAttribute('for', 'store-name');
    legend.insertAdjacentElement('afterend', label);
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'store-name');
    input.setAttribute('name', 'store-name');
    label.insertAdjacentElement('afterend', input);

    var label = document.createElement('label');
    label.setAttribute('for', 'min-hourly-customers');
    legend.insertAdjacentElement('afterend', label);
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'min-hourly-customers');
    input.setAttribute('name', 'minHourlyCustomers');
    label.insertAdjacentElement('afterend', input);

    var label = document.createElement('label');
    label.setAttribute('for', 'max-hourly-customers');
    legend.insertAdjacentElement('afterend', label);
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'max-hourly-customer-input');
    input.setAttribute('name', 'maxHourlyCustomers');
    label.insertAdjacentElement('afterend', input);

    var label = document.createElement('label');
    label.setAttribute('for', 'average-cookies-per-customer');
    legend.insertAdjacentElement('afterend', label);
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'average-cookies-per-customer-input');
    input.setAttribute('name', 'averageCookiesPerCustomer');
    label.insertAdjacentElement('afterend', input);

    var submit = document.createElement('button');
    submit.setAttribute('value', 'submit');
    fieldset.appendChild(submit);
    submit.innerText = 'submit';

    createObject(form);
  }

  function createObject(form){
    form.addEventListener('submit', function (event){
      event.preventDefault();
      event.stopPropagation();

      var minHourlyCustomers = event.target.minHourlyCustomers.value;
      var maxHourlyCustomers = event.target.maxHourlyCustomers.value;
      var averageCookiesPerCustomer = event.target.averageCookiesPerCustomer.value;

      console.dir(event.target);

      var store = new Store (minHourlyCustomers, maxHourlyCustomers, averageCookiesPerCustomer);
      console.log(store);

    }, false);
  }

  function createTableElem() {
    var table = document.createElement('table');
    document.body.appendChild(table);
    table.setAttribute('id', 'salestable');
  }

  function insertEmptyCornerCell() {
    var empty_th = document.createElement('th');
    empty_th.textContent = '';
    var firstElem = document.getElementById('salestable').firstChild.childNodes[0];
    var parent = firstElem.parentElement;

    parent.insertBefore(empty_th, firstElem);
  }

  function insertDailyTotalCell() {
    var dailyTotalCell = document.createElement('th');
    dailyTotalCell.textContent = 'Daily Location Total';
    var firstElem = document.getElementById('salestable').firstChild.childNodes[0];
    var parent = firstElem.parentElement;

    parent.appendChild(dailyTotalCell);
  }

  function printStoreHours() {
    var table = document.getElementById('salestable');
    document.getElementById('salestable');
    var tr = document.createElement('tr');
    table.appendChild(tr);                      //makes top <tr> for store hours

    function insertTimeString(expression, am_pm) {  //appends <th> for each hour
      var th = document.createElement('th');
      tr.appendChild(th);
      th.textContent = '' + expression + am_pm;
    }

    for (var i = storeOpen; i <= storeClose; i++) {     //iterates through each hour
      if (i === 0) {
        insertTimeString(i + 12, 'am');
      } else if (i < 12) {
        insertTimeString(i, 'am');
      } else if (i === 12) {
        insertTimeString(i, 'pm');
      } else {
        insertTimeString(i - 12, 'pm');
      }
    }
  }

  function printLocationsAndCookies() {

    for (var h = 0; h < Object.keys(stores).length; h++) { //for each store...
      var store = Object.keys(stores)[h];

      var table = document.getElementById('salestable');
      var tr = document.createElement('tr');
      table.appendChild(tr);                      //insert row to table

      var th = document.createElement('th');      //make table header
      th.setAttribute('id', store);
      tr.appendChild(th);
      th.textContent = store;                     //insert store name into header

      printCookiesToBake(store); // Then, call function to print cookies to bake
    };
  };

  function printCookiesToBake(store) {
    for (var i = storeOpen; i <= storeClose; i++) { //for each hour, print cookies
      var td = document.createElement('td');
      document.getElementById(store).insertAdjacentElement('afterend', td);
      td.textContent = stores[store].predictCookiesToBake();
    }
    printLocationTotalCookies(store);
  };

  function printLocationTotalCookies(store) {
    var td = document.createElement('td');
    var parent = document.getElementById(store).parentElement;
    parent.appendChild(td);

    var totalStoreCookies = stores[store].cookieCounts.reduce(function (a, b) {  //boils cookieCounts down to sum
      return a + b;
    });

    td.textContent = totalStoreCookies;

  }

  function insertHourlyTotalsCell() {
    var table = document.getElementById('salestable');
    var tr = document.createElement('tr');
    table.appendChild(tr);
    tr.setAttribute('id', 'finalrow');
    var th = document.createElement('th');
    tr.appendChild(th);
    th.textContent = 'Hourly Totals';
  }

  function collectHourlyCookies() {
    var allHours = [];

    for (var h = (storeClose - storeOpen); h >= 0; h--) { //for each hour...
      var outer = [];
      var inner = []; //create outer array
      for (var i = 0; i < Object.keys(stores).length; i++) { //iterate through each store
        var store = Object.keys(stores)[i];
        outer[i] = stores[store].cookieCounts[h];
        //populate inner array
        var store = Object.keys(stores)[i];
      }

      inner.push(outer);
      allHours.push(inner);

    }
    reduceHourlyCookies(allHours);

  }

  function reduceHourlyCookies(allHours) {
    var finalrow = document.getElementById('finalrow');
    allHours.forEach(function (hour) {
      var td = document.createElement('td');
      finalrow.appendChild(td);
      hour.forEach(function (cookies) {
        td.textContent = cookies.reduce(function (a, b) {
          return a + b;
        });
      });

    });
  }
});
