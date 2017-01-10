document.addEventListener('DOMContentLoaded', function () {
    'use strict';

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

    printTable();
    printLocationTimeCookiesToDom();
    printTotalsToDom(stores);


    function createTableElem() {
        var table = document.createElement('table');
        document.body.appendChild(table);
        table.setAttribute('id', 'salestable');
    }



    function printTable() {

        createTableElem();

        for (var h = 0; h < Object.keys(stores).length; h++) { //for each store, make h3 and a ul sibling
            var store = Object.keys(stores)[h];


            var table = document.getElementById('salestable');

            var tr = document.createElement('tr');
            table.appendChild(tr);

            var th = document.createElement('th');
            th.setAttribute('class', 'storename');
            tr.appendChild(th);
            th.textContent = store;                     // prints each store

            var td = document.createElement('td');
            td.setAttribute('id', store + 'List');
            th.insertAdjacentElement('afterend', td);

            printCookiesToBake(store) // Then, call function to print cookies to bake
        };
    };


    function printCookiesToBake(store) {
        for (var i = 6; i <= 20; i++) { //for each hour, print hour and print predictCookiesToBake
            if (i < 12) {
                var td = document.createElement('td');
                document.getElementById(store + 'List').appendChild(td);
                td.textContent = '' + i + 'am: ' + stores[store].predictCookiesToBake() + ' cookies';

            } else if (i === 12) {
                var td = document.createElement('td');
                document.getElementById(store + 'List').appendChild(td);
                td.textContent = '' + i + 'pm: ' + stores[store].predictCookiesToBake() + ' cookies';
            } else {
                var td = document.createElement('td');
                document.getElementById(store + 'List').appendChild(td);
                td.textContent = '' + (i - 12) + 'pm: ' + stores[store].predictCookiesToBake() + ' cookies';
            }
        }
    }

    // //note: Object.keys returns array of stores ["firstandpike", "seatacairport", etc ]
    // function printLocationTimeCookiesToDom() {
    //     for (var h = 0; h < Object.keys(stores).length; h++) { //for each store, make h3 and a ul sibling
    //         var store = Object.keys(stores)[h];

    //         var h3 = document.createElement('h3');
    //         h3.setAttribute('class', 'storename');
    //         document.body.appendChild(h3);
    //         h3.textContent = store;                     // prints each store

    //         var ul = document.createElement('ul');
    //         ul.setAttribute('id', store + 'List');
    //         h3.insertAdjacentElement('afterend', ul);

    //         printCookiesToBake(store) // Then, call function to print cookies to bake
    //     };

    // };

    function printTotalsToDom(stores) {
        var totalCookies = [];
        for (var i = 0; i < Object.keys(stores).length; i++) {
            var store = Object.keys(stores)[i];
            totalCookies.push(stores[store].cookieCounts.reduce(function (a, b) {  //boils cookieCounts down to sum
                return a + b;
            })); //
        }
        var uls = document.getElementsByTagName('ul');
        var ulsArray = Array.prototype.slice.call(uls);
        for (var i = 0; i < ulsArray.length; i++) {
            var totalsli = document.createElement('li');
            ulsArray[i].appendChild(totalsli);
            totalsli.textContent = 'Total: ' + totalCookies[i];
        }
    }
});