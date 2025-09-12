[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / Omit

# Type Alias: Omit\<T, K\>

> **Omit**\<`T`, `K`\> = `{ [P in keyof T as P extends K ? never : P]: T[P] }`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:2498

## Type Parameters

### T

`T`

### K

`K` *extends* `string` \| `number` \| `symbol`
