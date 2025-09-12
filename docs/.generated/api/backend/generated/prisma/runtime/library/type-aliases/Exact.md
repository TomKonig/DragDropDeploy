[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / Exact

# Type Alias: Exact\<A, W\>

> **Exact**\<`A`, `W`\> = `A` *extends* `unknown` ? `W` *extends* `A` ? `{ [K in keyof A]: Exact<A[K], W[K]> }` : `W` : `never` \| `A` *extends* [`Narrowable`](Narrowable.md) ? `A` : `never`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1187

## Type Parameters

### A

`A`

### W

`W`
