[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / SelectSubset

# Type Alias: SelectSubset\<T, U\>

> **SelectSubset**\<`T`, `U`\> = `{ [key in keyof T]: key extends keyof U ? T[key] : never }` & `T` *extends* [`SelectAndInclude`](SelectAndInclude.md) ? `` "Please either choose `select` or `include`." `` : `T` *extends* [`SelectAndOmit`](SelectAndOmit.md) ? `` "Please either choose `select` or `omit`." `` : `object`

Defined in: backend/src/generated/prisma/index.d.ts:395

SelectSubset

## Type Parameters

### T

`T`

### U

`U`

## Desc

From `T` pick properties that exist in `U`. Simple version of Intersection.
Additionally, it validates, if both select and include are present. If the case, it errors.
