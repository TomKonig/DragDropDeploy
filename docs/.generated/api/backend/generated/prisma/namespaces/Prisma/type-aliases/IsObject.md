[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / IsObject

# Type Alias: IsObject\<T\>

> **IsObject**\<`T`\> = `T` *extends* `any`[] ? [`False`](False.md) : `T` *extends* `Date` ? [`False`](False.md) : `T` *extends* `Uint8Array` ? [`False`](False.md) : `T` *extends* `BigInt` ? [`False`](False.md) : `T` *extends* `object` ? [`True`](True.md) : [`False`](False.md)

Defined in: backend/src/generated/prisma/index.d.ts:429

Is T a Record?

## Type Parameters

### T

`T` *extends* `any`
