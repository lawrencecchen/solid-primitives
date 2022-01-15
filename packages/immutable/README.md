# @solid-primitives/immutable

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg?style=for-the-badge)](https://lerna.js.org/)
[![size](https://img.shields.io/bundlephobia/minzip/@solid-primitives/immutable?style=for-the-badge&label=size)](https://bundlephobia.com/package/@solid-primitives/immutable)
[![version](https://img.shields.io/npm/v/@solid-primitives/immutable?style=for-the-badge)](https://www.npmjs.com/package/@solid-primitives/immutable)
[![stage](https://img.shields.io/endpoint?style=for-the-badge&url=https%3A%2F%2Fraw.githubusercontent.com%2Fdavedbase%2Fsolid-primitives%2Fmain%2Fassets%2Fbadges%2Fstage-0.json)](https://github.com/davedbase/solid-primitives#contribution-process)

Functional programming helpers for making non-mutating changes to data. Keeping it immutable.

## Installation

```bash
npm install @solid-primitives/immutable
# or
yarn add @solid-primitives/immutable
```

## How to use it

```ts
import { pick } from "@solid-primitives/immutable";

const original = { foo: 123, bar: "baz" };
const newObj = pick(original, "foo");
original; // { foo: 123, bar: "baz" }
newObj; // { foo: 123 }
```

## List of available functions:

- **`shallowArrayCopy`** - make shallow copy of an array
- **`shallowObjectCopy`** - make shallow copy of an object
- **`shallowCopy`** - make shallow copy of an array/object
- **`withArrayCopy`** - apply mutations to the an array without changing the original
- **`withObjectCopy`** - apply mutations to the an object without changing the original
- **`withCopy`** - apply mutations to the an object/array without changing the original
- **`push`** - non-mutating `Array.prototype.push()`
- **`drop`** - non-mutating function that drops n items from the array start
- **`dropRight`** - non-mutating function that drops n items from the array end
- **`filterOut`** - non-mutating `Array.prototype.filter()` that filters out passed item
- **`filter`** - non-mutating `Array.prototype.filter()` as a standalone function
- **`sort`** - non-mutating `Array.prototype.sort()` as a standalone function
- **`map`** - standalone `Array.prototype.map()` function
- **`slice`** - standalone `Array.prototype.slice()` function
- **`splice`** - non-mutating `Array.prototype.splice()` as a standalone function
- **`concat`** - Creates a new array concatenating array with any additional arrays and/or values.
- **`remove`** - Remove item from array
- **`omit`** - Create a new subset object without the provided keys
- **`pick`** - Create a new subset object with only the provided keys
- **`update`** - Change single value in an object by key.

## Changelog

<details>
<summary><b>Expand Changelog</b></summary>

0.0.100

Initial release as a Stage-0 primitive.

</details>