document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    var storeOpen = 0;              //code allows to dynamically set store hours
    var storeClose = 20;            //uses function to convert military time format 00 - 24

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

    var firstandpike = new Store(23, 65, 6.3);
    var seatacairport = new Store(3, 24, 1.2);
    var seattlecenter = new Store(11, 38, 3.7);
    var capitolhill = new Store(28, 38, 2.3);
    var alki = new Store(2, 16, 4.6);

    var stores = {
        firstandpike: firstandpike,
        seatacairport: seatacairport,
        seattlecenter: seattlecenter,
        capitolhill: capitolhill,
        alki: alki
    }


    createTableElem();
    printStoreHours();
    insertEmptyCornerCell();
    printLocationsAndCookies();

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
        console.log(firstElem);

        parent.insertBefore(empty_th, firstElem);    //inserts empty cell
    }

    function printStoreHours() {
        var table = document.getElementById('salestable');
        document.getElementById('salestable')
        var tr = document.createElement('tr');
        table.appendChild(tr);

        function insertTimeString(expression, am_pm) {  //constructs time string to DRY
            var th = document.createElement('th');
            tr.appendChild(th);
            th.textContent = '' + expression + am_pm;
        }

        for (var i = storeOpen; i <= storeClose; i++) {
            if (i === 0) {
                insertTimeString(i + 12, 'am');      //inserts midnight time string
            } else if (i < 12) {
                insertTimeString(i, 'am');      //inserts am time string
            } else if (i === 12) {
                insertTimeString(i, 'pm');      //inserts noon time string
            } else {
                insertTimeString(i - 12, 'pm');   //inserts afternoon time string
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
    };

    function printTotalsToDom(stores) {
        var totalCookies = [];
        for (var i = 0; i < Object.keys(stores).length; i++) {
            var store = Object.keys(stores)[i];
            totalCookies.push(stores[store].cookieCounts.reduce(function (a, b) {  //boils cookieCounts down to sum
                return a + b;
            }));
        }

        var uls = document.getElementsByTagName('ul');
        var ulsArray = Array.prototype.slice.call(uls);
        for (var i = 0; i < ulsArray.length; i++) {
            var totalsli = document.createElement('li');
            ulsArray[i].appendChild(totalsli);
            totalsli.textContent = 'Total: ' + totalCookies[i];
        }
    };
});