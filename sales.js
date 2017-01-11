document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    //CHANGE STORE TIMES HERE
    var storeOpen = 4;              
    var storeClose = 16;            //uses function to convert military time format 00 - 24

    function Store(minHourlyCustomers, maxHourlyCustomers, averageCookiesPerCustomer) {
        this.minHourlyCustomers = minHourlyCustomers;
        this.maxHourlyCustomers = maxHourlyCustomers;
        this.averageCookiesPerCustomer = averageCookiesPerCustomer;
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
    }


    createTableElem();

    printStoreHours();
    insertEmptyCornerCell();
    insertDailyTotalCell();
    printLocationsAndCookies();
    insertHourlyTotalsCell();
    collectHourlyCookies();



    function createTableElem() {
        var table = document.createElement('table');
        document.body.appendChild(table);
        table.setAttribute('id', 'salestable');
    }

    function insertEmptyCornerCell() {
        var empty_th = document.createElement('th');
        empty_th.textContent = "";
        var firstElem = document.getElementById('salestable').firstChild.childNodes[0];
        var parent = firstElem.parentElement;

        parent.insertBefore(empty_th, firstElem);
    }

    function insertDailyTotalCell() {
        var dailyTotalCell = document.createElement('th');
        dailyTotalCell.textContent = "Daily Location Total"
        var firstElem = document.getElementById('salestable').firstChild.childNodes[0];
        var parent = firstElem.parentElement;

        parent.appendChild(dailyTotalCell);
    }

    function printStoreHours() {
        var table = document.getElementById('salestable');
        document.getElementById('salestable')
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
        var td = document.createElement('td')
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
        th.textContent = "Hourly Totals";
    }

    function collectHourlyCookies() {
        var allHours = [];

        for (var h = (storeClose - storeOpen); h >= 0 ; h--) { //for each hour... 
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
            var result = hour.reduce(function (a, b) {
              return a + b;
            });
            td.textContent = result.reduce(function(a,b) {
                return a + b;
            });
        });
    }

});