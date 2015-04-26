safeSort
========

Motivation
---

JavaScript has a native array sort method, but it is neither stable nor consistent cross browser. The native sort method coerces all values to string type by default or requires a comparator function to specify sorting by a different type. It cannot sort multiple types with any predictability without using multiple comparator functions, which is then still not predictable.

This is not acceptable. Sorting data is a foundational requirement and we can do better.

Intro
-----

safeSort provides a sorting method that sorts by value and type and does so in fewer passes than the native sort method. It takes three options:

* array - This is the actual array object to sort.
* operation - How we should sort, which accepts 3 values:
    - ascending (default) - Sort from smallest to largest types/values
    - descending - Sort from largest to smallest types/values
    - normal - Normalize the data, or rather reduce the array to only items of a unique type and value
* recursive - If this operation should also sort child arrays if the array value is multidimensional. Accepts boolean type values.

Limitations Compared to Native sort
-----------------------------------

Despite being more programmatically more efficient and more predictable safeSort is roughly twice as slow as the native sort method. This could be due to the native sort method having the advantage of compiled native code. safeSort uses an array as a recursive intermediary that may also account for its slowness.

Using a comparator function in the native sort method it is possible to completely customize how a multidimensional array sorts relative to the comparison of selective child array indexes. safeSort does not have this capability at this time, but may be expanded to support custom definitions at a later time.

The Algorithm
-------------

safeSort uses an algorithm defined by the following steps:

1. Walk the entire array search for the ideal key (lowest value and type for ascending or largest for descending).
2. Using an intermediary array note which indexes contain the key.
3. Keep aware of the number of indexes in the intermediary array. I will call this length variable "c".
4. Swap values of the first "c" number of indexes with those contained in the intermediary array.
5. Recursively repeat the first 4 steps until "c" is the length of the array, but starting at index "c" instead of index 0 at each recursive pass.

Enjoy and please visit http://prettydiff.com/
