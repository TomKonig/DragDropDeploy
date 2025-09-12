[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / AtLeast

# Type Alias: AtLeast\<O, K\>

> **AtLeast**\<`O`, `K`\> = [`NoExpand`](NoExpand.md)\<`O` *extends* `unknown` ? `K` *extends* keyof `O` ? `{ [P in K]: O[P] }` & `O` : `O` \| `{ [P in keyof O as P extends K ? P : never]-?: O[P] }` & `O` : `never`\>

Defined in: backend/src/generated/prisma/index.d.ts:522

## Type Parameters

### O

`O` *extends* `object`

### K

`K` *extends* `string`
