[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / Subset

# Type Alias: Subset\<T, U\>

> **Subset**\<`T`, `U`\> = `{ [key in keyof T]: key extends keyof U ? T[key] : never }`

Defined in: backend/src/generated/prisma/index.d.ts:386

Subset

## Type Parameters

### T

`T`

### U

`U`

## Desc

From `T` pick properties that exist in `U`. Simple version of Intersection
