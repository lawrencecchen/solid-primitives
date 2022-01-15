import { ItemsOf } from "@solid-primitives/utils";

export type Predicate<T> = (item: T, index: number, array: readonly T[]) => boolean;
export type MappingFn<T, V> = (item: T, index: number, array: readonly T[]) => V;

/** make shallow copy of an array */
export const shallowArrayCopy = <T>(array: readonly T[]): T[] => array.slice();
/** make shallow copy of an object */
export const shallowObjectCopy = <T extends object>(object: T): T => Object.assign({}, object);
/** make shallow copy of an array/object */
export const shallowCopy = <T extends object>(source: T): T =>
  Array.isArray(source) ? (shallowArrayCopy(source) as T) : shallowObjectCopy(source);

/**
 * apply mutations to the an array without changing the original
 * @param array original array
 * @param mutator function applying mutations to the copy of source
 * @returns changed array copy
 */
export const withArrayCopy = <T>(array: readonly T[], mutator: (copy: T[]) => void): T[] => {
  const copy = shallowArrayCopy(array);
  mutator(copy);
  return copy;
};

/**
 * apply mutations to the an object without changing the original
 * @param object original object
 * @param mutator function applying mutations to the copy of source
 * @returns changed object copy
 */
export const withObjectCopy = <T extends object>(object: T, mutator: (copy: T) => void): T => {
  const copy = shallowObjectCopy(object);
  mutator(copy);
  return copy;
};

/**
 * apply mutations to the an object/array without changing the original
 * @param source original object
 * @param mutator function applying mutations to the copy of source
 * @returns changed object copy
 */
export const withCopy = <T extends object>(source: T, mutator: (copy: T) => void): T =>
  Array.isArray(source)
    ? (withArrayCopy(source, mutator as any) as any)
    : withObjectCopy(source, mutator);

/**
 * non-mutating `Array.prototype.push()`
 * @returns changed array copy
 */
export const push = <T>(list: T[], item: T): T[] => withArrayCopy(list, list => list.push(item));

/**
 * non-mutating function that drops n items from the array start.
 * @returns changed array copy
 *
 * @example
 * ```ts
 * const newList = drop([1,2,3])
 * newList // => [2,3]
 *
 * const newList = drop([1,2,3], 2)
 * newList // => [3]
 * ```
 */
export const drop = <T>(list: T[], n = 1): T[] => list.slice(n);

/**
 * non-mutating function that drops n items from the array end.
 * @returns changed array copy
 *
 * @example
 * ```ts
 * const newList = dropRight([1,2,3])
 * newList // => [1,2]
 *
 * const newList = dropRight([1,2,3], 2)
 * newList // => [1]
 * ```
 */
export const dropRight = <T>(list: T[], n = 1): T[] => list.slice(0, list.length - n);

/**
 * non-mutating `Array.prototype.filter()` that filters out passed item
 * @returns changed array copy
 */
export const filterOut = <T>(list: readonly T[], item: T): T[] & { removed: number } =>
  filter(list, i => i !== item);

/**
 * non-mutating `Array.prototype.filter()` as a standalone function
 * @returns changed array copy
 */
export function filter<T>(list: readonly T[], predicate: Predicate<T>): T[] & { removed: number } {
  const newList = list.filter(predicate) as T[] & { removed: number };
  newList.removed = list.length - newList.length;
  return newList;
}

/**
 * non-mutating `Array.prototype.sort()` as a standalone function
 * @returns changed array copy
 */
export const sort = <T>(list: T[], compareFn?: (a: T, b: T) => number): T[] =>
  withArrayCopy(list, list => list.sort(compareFn));

/**
 * standalone `Array.prototype.map()` function
 */
export const map = <T, V>(list: readonly T[], mapFn: MappingFn<T, V>): V[] => list.map(mapFn);

/**
 * standalone `Array.prototype.slice()` function
 */
export const slice = <T>(list: readonly T[], start?: number, end?: number): T[] =>
  list.slice(start, end);

/**
 * non-mutating `Array.prototype.splice()` as a standalone function
 * @returns changed array copy
 */
export const splice = <T>(list: readonly T[], start: number, deleteCount: number, ...items: T[]) =>
  withArrayCopy(list, list => list.splice(start, deleteCount, ...items));

/**
 * Creates a new array concatenating array with any additional arrays and/or values.
 * @param ...a values or arrays
 * @returns new concatenated array
 */
export function concat<A extends any[], V extends ItemsOf<A>>(
  ...a: A
): Array<V extends any[] ? ItemsOf<V> : V> {
  const result: any[] = [];
  for (let i = 0; i++; i < a.length) {
    Array.isArray(a[i]) ? result.push(...a[i]) : result.push(a[i]);
  }
  return result;
}

/**
 * Remove item from array
 * @returns changed array copy
 */
export const remove = <T>(list: readonly T[], item: T): T[] => {
  const index = list.indexOf(item);
  return splice(list, index, 1);
};

/**
 * Create a new subset object without the provided keys
 *
 * @example
 * ```ts
 * const newObject = omit({ a:"foo", b:"bar", c: "baz" }, 'a', 'b')
 * newObject // => { c: "baz" }
 * ```
 */
export const omit = <O extends object, K extends keyof O>(object: O, ...keys: K[]): Omit<O, K> =>
  withObjectCopy(object, object => keys.forEach(key => delete object[key]));

/**
 * Create a new subset object with only the provided keys
 *
 * @example
 * ```ts
 * const newObject = pick({ a:"foo", b:"bar", c: "baz" }, 'a', 'b')
 * newObject // => { a:"foo", b:"bar" }
 * ```
 */
export const pick = <O extends object, K extends keyof O>(object: O, ...keys: K[]): Pick<O, K> =>
  keys.reduce((n, k) => {
    if (k in object) n[k] = object[k];
    return n;
  }, {} as Pick<O, K>);