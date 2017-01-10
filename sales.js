document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    //put all stores in an object
    var stores = {
        firstandpike: {
            minHourlyCustomers: 23,
            maxHourlyCustomers: 65,
            averageCookiesPerCustomer: 6.3,
            generateRandomCustomers: function (min, max) {
                return Math.floor((Math.random() * (max - min + 1)) + min);
            },
            predictCookiesToBake: function (averageCookiesPerCustomer, randomGenCustomers) {
                return Math.round(this.averageCookiesPerCustomer * this.generateRandomCustomers(this.minHourlyCustomers, this.maxHourlyCustomers));
            },
        },
        seatacairport: {
            minHourlyCustomers: 3,
            maxHourlyCustomers: 24,
            averageCookiesPerCustomer: 1.2,
            generateRandomCustomers: function (min, max) {
                return Math.floor((Math.random() * (max - min + 1)) + min);
            },
            predictCookiesToBake: function (averageCookiesPerCustomer, randomGenCustomers) {
                return Math.round(this.averageCookiesPerCustomer * this.generateRandomCustomers(this.minHourlyCustomers, this.maxHourlyCustomers));
            }
        },
        seattlecenter: {
            minHourlyCustomers: 11,
            maxHourlyCustomers: 38,
            averageCookiesPerCustomer: 3.7,
            generateRandomCustomers: function (min, max) {
                return Math.floor((Math.random() * (max - min + 1)) + min);
            },
            predictCookiesToBake: function (averageCookiesPerCustomer, randomGenCustomers) {
                return Math.round(this.averageCookiesPerCustomer * this.generateRandomCustomers(this.minHourlyCustomers, this.maxHourlyCustomers));
            }
        },
        capitolhill: {
            minHourlyCustomers: 20,
            maxHourlyCustomers: 38,
            averageCookiesPerCustomer: 2.3,
            generateRandomCustomers: function (min, max) {
                return Math.floor((Math.random() * (max - min + 1)) + min);
            },
            predictCookiesToBake: function (averageCookiesPerCustomer, randomGenCustomers) {
                return Math.round(this.averageCookiesPerCustomer * this.generateRandomCustomers(this.minHourlyCustomers, this.maxHourlyCustomers));
            }
        },
        alki: {
            minHourlyCustomers: 2,
            maxHourlyCustomers: 16,
            averageCookiesPerCustomer: 4.6,
            generateRandomCustomers: function (min, max) {
                return Math.floor((Math.random() * (max - min + 1)) + min);
            },
            predictCookiesToBake: function (averageCookiesPerCustomer, randomGenCustomers) {
                return Math.round(this.averageCookiesPerCustomer * this.generateRandomCustomers(this.minHourlyCustomers, this.maxHourlyCustomers));
            }
        }

    };

    //note: Object.keys returns array of stores ["firstandpike", "seatacairports", etc ]
    function printStringToDom() {
        for (var h = 0; h < Object.keys(stores).length; h++) { //for each store, make h3 and a ul sibling
            var store = Object.keys(stores)[h];    

            var h3 = document.createElement('h3');
            h3.setAttribute('class', 'storename');
            document.body.appendChild(h3);
            h3.textContent = store;

            var ul = document.createElement('ul');
            ul.setAttribute('id', store + 'List');
            h3.insertAdjacentElement('afterend', ul);

            for (var i = 6; i <= 20; i++) { //for each store: print time (i), call predictCookiesToBake and print
                if (i < 12) {
                    var li = document.createElement('li');
                    document.getElementById(store + 'List').appendChild(li);
                    li.textContent = '' + i + 'am: ' + stores[store].predictCookiesToBake() + ' cookies';
                    console.log(i + 'am: ' + stores[store].predictCookiesToBake() + ' cookies'); //sets am
                } else if (i === 12) {
                    var li = document.createElement('li');
                    document.getElementById(store + 'List').appendChild(li);
                    li.textContent = '' +  i + 'pm: ' + stores[store].predictCookiesToBake() + ' cookies';
                    console.log(i + 'pm: ' + stores[store].predictCookiesToBake() + ' cookies'); //switches to pm
                } else {
                    var li = document.createElement('li');
                    document.getElementById(store + 'List').appendChild(li);
                    li.textContent = '' + (i - 12) + 'am: ' + stores[store].predictCookiesToBake() + ' cookies';
                    console.log((i - 12) + 'pm: ' + stores[store].predictCookiesToBake() + ' cookies'); //sets back to 1 for afternoon
                }
            };
        }
    };

    printStringToDom();

});