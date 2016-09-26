/**
 * Returns the last element of an array.
 * @param array The array.
 * @param n Which element from the end (default ist zero).
 */
export declare function tail<T>(array: T[], n?: number): T;
/**
 * Iterates the provided array and allows to remove
 * elements while iterating.
 */
export declare function forEach<T>(array: T[], callback: (element: T, remove: Function) => void): void;
export declare function equals<T>(one: T[], other: T[], itemEquals?: (a: T, b: T) => boolean): boolean;
export declare function binarySearch<T>(array: T[], key: T, comparator: (op1: T, op2: T) => number): number;
/**
 * Takes a sorted array and a function p. The array is sorted in such a way that all elements where p(x) is false
 * are located before all elements where p(x) is true.
 * @returns the least x for which p(x) is true or array.length if no element fullfills the given function.
 */
export declare function findFirst<T>(array: T[], p: (x: T) => boolean): number;
/**
 * Returns the top N elements from the array.
 *
 * Faster than sorting the entire array when the array is a lot larger than N.
 *
 * @param array The unsorted array.
 * @param compare A sort function for the elements.
 * @param n The number of elements to return.
 * @return The first n elemnts from array when sorted with compare.
 */
export declare function top<T>(array: T[], compare: (a: T, b: T) => number, n: number): T[];
export declare function merge<T>(arrays: T[][], hashFn?: (element: T) => string): T[];
/**
 * @returns a new array with all undefined or null values removed. The original array is not modified at all.
 */
export declare function coalesce<T>(array: T[]): T[];
/**
 * @returns true if the given item is contained in the array.
 */
export declare function contains<T>(array: T[], item: T): boolean;
/**
 * Swaps the elements in the array for the provided positions.
 */
export declare function swap(array: any[], pos1: number, pos2: number): void;
/**
 * Moves the element in the array for the provided positions.
 */
export declare function move(array: any[], from: number, to: number): void;
/**
 * @returns {{false}} if the provided object is an array
 * 	and not empty.
 */
export declare function isFalsyOrEmpty(obj: any): boolean;
/**
 * Removes duplicates from the given array. The optional keyFn allows to specify
 * how elements are checked for equalness by returning a unique string for each.
 */
export declare function distinct<T>(array: T[], keyFn?: (t: T) => string): T[];
export declare function uniqueFilter<T>(keyFn: (t: T) => string): (t: T) => boolean;
export declare function firstIndex<T>(array: T[], fn: (item: T) => boolean): number;
export declare function first<T>(array: T[], fn: (item: T) => boolean, notFoundValue?: T): T;
export declare function commonPrefixLength<T>(one: T[], other: T[], equals?: (a: T, b: T) => boolean): number;
export declare function flatten<T>(arr: T[][]): T[];
export declare function range(to: number, from?: number): number[];
export declare function fill<T>(num: number, valueFn: () => T, arr?: T[]): T[];
export declare function index<T>(array: T[], indexer: (t: T) => string): {
    [key: string]: T;
};
export declare function index<T, R>(array: T[], indexer: (t: T) => string, merger?: (t: T, r: R) => R): {
    [key: string]: R;
};