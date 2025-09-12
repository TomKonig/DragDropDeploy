[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / Narrow

# Type Alias: Narrow\<A\>

> **Narrow**\<`A`\> = `{ [K in keyof A]: A[K] extends Function ? A[K] : Narrow<A[K]> }` \| `A` *extends* [`Narrowable`](Narrowable.md) ? `A` : `never`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:2459

## Type Parameters

### A

`A`
