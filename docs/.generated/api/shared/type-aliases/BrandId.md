[**@dragdropdeploy/shared**](../README.md)

***

[@dragdropdeploy/shared](../README.md) / BrandId

# Type Alias: BrandId\<T, B\>

> **BrandId**\<`T`, `B`\> = `T` & `object`

Defined in: [index.ts:22](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/shared/src/index.ts#L22)

Add a nominal brand to a primitive/base type to avoid accidental mixing of logically distinct values.

## Type Declaration

### \_\_brand

> **\_\_brand**: `B`

## Type Parameters

### T

`T`

### B

`B` *extends* `string`

## Example

```ts
type UserId = BrandId<string, 'UserId'>;
function loadUser(id: UserId) {
  // implementation
}
```
