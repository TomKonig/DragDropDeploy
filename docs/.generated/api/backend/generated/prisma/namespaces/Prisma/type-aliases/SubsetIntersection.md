[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / SubsetIntersection

# Type Alias: SubsetIntersection\<T, U, K\>

> **SubsetIntersection**\<`T`, `U`, `K`\> = `{ [key in keyof T]: key extends keyof U ? T[key] : never }` & `K`

Defined in: backend/src/generated/prisma/index.d.ts:408

Subset + Intersection

## Type Parameters

### T

`T`

### U

`U`

### K

`K`

## Desc

From `T` pick properties that exist in `U` and intersect `K`
