[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / ComputeDeep

# Type Alias: ComputeDeep\<T\>

> **ComputeDeep**\<`T`\> = `T` *extends* `Function` ? `T` : `{ [K in keyof T]: ComputeDeep<T[K]> }` & `unknown`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:267

## Type Parameters

### T

`T`
