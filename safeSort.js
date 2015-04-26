/*global define, exports*/
/*

Just a simple array sort scheme. The provided sorting accounts for values and types.

It only takes three parameters:

* array - an actual array to pass in
* operation - what kind of sort do you want?  Three modes supported:
    - "normal" - will normalize (remove redundant values) from the array
    - "descend" - will order the array from greatest values to lowest values
    - "ascend" - will order the array from lowest valus to greatest values
* recursive - accepts a boolean and defaults to false. If true then any indexes
    that contain arrays will be independently sorted and returned into their
    proper location
The operation parameter is optional. If not specified the value "ascend"
will be assumed.


How the algorithm works:

1) Walk the entire array looking the lowest value and lowest type and count the
   instances.
2) Use a temporary array to note which index(es) of the original array contain this lowest value
3) Keep aware of the length of low values in a closure... variable c
4) Swap the values of the first c indexes with those in the temporary array.
5) Do it all over again until c is the length of the array with one exception:
      * Start walking the array from index c at each recursive pass.

Enjoy and visit http://prettydiff.com/


MIT license
Copyright 2015 Austin Cheney

*/
var safeSort = function (array, operation, recursive) {
    "use strict";
    var arTest  = function (item) {
            if (typeof item !== "object" || item.length === undefined || item.length < 2) {
                return false;
            }
            return true;
        },
        normal  = function (item) {
            var done    = [item[0]],
                storeb  = item,
                child   = function () {
                    var a   = 0,
                        len = storeb.length;
                    for (a = 0; a < len; a += 1) {
                        if (arTest(storeb[a]) === true) {
                            storeb[a] = normal(storeb[a]);
                        }
                    }
                },
                recurse = function (x) {
                    var a      = 0,
                        storea = [],
                        len    = storeb.length;
                    for (a = 0; a < len; a += 1) {
                        if (storeb[a] !== x) {
                            storea.push(storeb[a]);
                        }
                    }
                    storeb = storea;
                    if (storea.length > 0) {
                        done.push(storea[0]);
                        recurse(storea[0]);
                    } else {
                        if (recursive === true) {
                            child();
                        }
                        item = storeb;
                    }
                };
            recurse(array[0]);
        },
        descend = function (item) {
            var c       = 0,
                storeb  = item,
                len     = item.length,
                child   = function () {
                    var a    = 0,
                        lenc = storeb.length;
                    for (a = 0; a < lenc; a += 1) {
                        if (arTest(storeb[a]) === true) {
                            storeb[a] = descend(storeb[a]);
                        }
                    }
                },
                recurse = function () {
                    var a   = 0,
                        b   = 0,
                        d   = 0,
                        e   = 0,
                        ind = [],
                        key = storeb[c];
                    for (a = c; a < len; a += 1) {
                        if (storeb[a] > key || typeof storeb[a] > typeof key) {
                            key = storeb[a];
                            ind = [a];
                        } else if (storeb[a] === key) {
                            ind.push(a);
                        }
                    }
                    d = ind.length;
                    b = d + c;
                    for (a = c; a < b; a += 1) {
                        storeb[ind[e]] = storeb[a];
                        storeb[a]      = key;
                        e              += 1;
                    }
                    c += d;
                    if (c < len) {
                        recurse();
                    } else {
                        if (recursive === true) {
                            child();
                        }
                        item = storeb;
                    }
                };
            recurse();
            return item;
        },
        ascend  = function (item) {
            var c       = 0,
                storeb  = item,
                len     = item.length,
                child   = function () {
                    var a    = 0,
                        lenc = storeb.length;
                    for (a = 0; a < lenc; a += 1) {
                        if (arTest(storeb[a]) === true) {
                            storeb[a] = ascend(storeb[a]);
                        }
                    }
                },
                recurse = function () {
                    var a   = 0,
                        b   = 0,
                        d   = 0,
                        e   = 0,
                        ind = [],
                        key = storeb[c];
                    for (a = c; a < len; a += 1) {
                        if (storeb[a] < key || typeof storeb[a] < typeof key) {
                            key = storeb[a];
                            ind = [a];
                        } else if (storeb[a] === key) {
                            ind.push(a);
                        }
                    }
                    d = ind.length;
                    b = d + c;
                    for (a = c; a < b; a += 1) {
                        storeb[ind[e]] = storeb[a];
                        storeb[a]      = key;
                        e              += 1;
                    }
                    c += d;
                    if (c < len) {
                        recurse();
                    } else {
                        if (recursive === true) {
                            child();
                        }
                        item = storeb;
                    }
                };
            recurse();
            return item;
        };
    if (arTest(array) === false) {
        return array;
    }
    if (recursive === "true") {
        recursive = true;
    } else if (recursive !== true) {
        recursive = false;
    }
    if (operation === "normal") {
        return normal(array);
    }
    if (operation === "descend") {
        return descend(array);
    }
    return ascend(array);
};
if (typeof exports === "object" || typeof exports === "function") { //commonjs and nodejs support
    exports.safeSort = function commonjs(array, operation) {
        "use strict";
        return safeSort(array, operation);
    };
} else if (typeof define === "object" || typeof define === "function") { //requirejs support
    define(function requirejs(require, exports) {
        "use strict";
        exports.safeSort = function requirejs_export(array, operation) {
            return safeSort(array, operation);
        }; //worthless if block to appease RequireJS and JSLint
        if (typeof require === "number") {
            return require;
        }
        return exports.safeSort;
    });
}
