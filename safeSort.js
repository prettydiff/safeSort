/*global define, exports*/
/*

Just a simple array sort scheme. The provided sorting accounts for values and types.

It only takes two parameters:

* array - an actual array to pass in
* operation - what kind of sort do you want?  Three modes supported:
    - "normal" - will normalize (remove redundant values) from the array
    - "descend" - will order the array from greatest values to lowest values
    - "ascend" - will order the array from lowest valus to greatest values

The operation parameter is optional. If not specified the value "ascend"
will be assumed.

Enjoy and visit http://prettydiff.com/


MIT license
Copyright 2015 Austin Cheney

*/
var safeSort = function (array, operation) {
        "use strict";
        var normal  = function () {
                var done    = [array[0]],
                    storeb  = array,
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
                            array = done;
                        }
                    };
                recurse(array[0]);
            },
            descend = function () {
                var done    = [],
                    storeb  = array,
                    recurse = function () {
                        var a      = 0,
                            b      = 0,
                            ind    = [],
                            len    = storeb.length,
                            min    = storeb[0];
                        for (a = 0; a < len; a += 1) {
                            if (storeb[a] > min || typeof storeb[a] > typeof min) {
                                min = storeb[a];
                                ind = [a];
                            } else if (storeb[a] === min) {
                                ind.push(a);
                            }
                        }
                        b = ind.length;
                        for (a = b - 1; a > -1; a -= 1) {
                            done.push(min);
                            storeb.splice(ind[a], 1);
                        }
                        if (storeb.length > 0) {
                            recurse();
                        } else {
                            array = done;
                        }
                    };
                recurse();
            },
            ascend  = function () {
                var done    = [],
                    storeb  = array,
                    recurse = function () {
                        var a      = 0,
                            b      = 0,
                            ind    = [],
                            len    = storeb.length,
                            min    = storeb[0];
                        for (a = 0; a < len; a += 1) {
                            if (storeb[a] < min || typeof storeb[a] < typeof min) {
                                min = storeb[a];
                                ind = [a];
                            } else if (storeb[a] === min) {
                                ind.push(a);
                            }
                        }
                        b = ind.length;
                        for (a = b - 1; a > -1; a -= 1) {
                            done.push(min);
                            storeb.splice(ind[a], 1);
                        }
                        if (storeb.length > 0) {
                            recurse();
                        } else {
                            array = done;
                        }
                    };
                recurse();
            };
        if (typeof array !== "object" || array.length === undefined || array.length < 2) {
            return array;
        }
        if (operation === "normal") {
            normal();
        } else if (operation === "descend") {
            descend();
        } else {
            ascend();
        }
        return array;
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
