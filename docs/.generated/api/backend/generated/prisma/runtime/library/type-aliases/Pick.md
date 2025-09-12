[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / Pick

# Type Alias: Pick\<T, K\>

> **Pick**\<`T`, `K`\> = `{ [P in keyof T as P extends K ? P : never]: T[P] }`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:2598

## Type Parameters

### T

`T`

### K

`K` *extends* `string` \| `number` \| `symbol`
