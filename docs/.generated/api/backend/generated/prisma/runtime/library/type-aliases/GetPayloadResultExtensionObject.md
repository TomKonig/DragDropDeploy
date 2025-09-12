[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / GetPayloadResultExtensionObject

# Type Alias: GetPayloadResultExtensionObject\<R\>

> **GetPayloadResultExtensionObject**\<`R`\> = `{ [K in GetPayloadResultExtensionKeys<R>]: R[K] extends () => { compute: (args: any) => infer C } ? C : never }`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1521

## Type Parameters

### R

`R` *extends* [`InternalArgs`](InternalArgs.md)\[`"result"`\]\[`string`\]
