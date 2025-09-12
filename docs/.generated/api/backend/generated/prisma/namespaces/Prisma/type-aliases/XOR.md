[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / XOR

# Type Alias: XOR\<T, U\>

> **XOR**\<`T`, `U`\> = `T` *extends* `object` ? `U` *extends* `object` ? [`Without`](Without.md)\<`T`, `U`\> & `U` \| [`Without`](Without.md)\<`U`, `T`\> & `T` : `U` : `T`

Defined in: backend/src/generated/prisma/index.d.ts:419

XOR is needed to have a real mutually exclusive union type
https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types

## Type Parameters

### T

`T`

### U

`U`
