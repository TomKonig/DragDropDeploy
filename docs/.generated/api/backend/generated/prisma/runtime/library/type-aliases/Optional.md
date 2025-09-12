[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / Optional

# Type Alias: Optional\<O, K\>

> **Optional**\<`O`, `K`\> = `{ [P in K & keyof O]?: O[P] }` & `{ [P in Exclude<keyof O, K>]: O[P] }`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:2520

## Type Parameters

### O

`O`

### K

`K` *extends* keyof `any` = keyof `O`
