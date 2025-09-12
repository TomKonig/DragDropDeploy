[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / DynamicModelExtensionOperationFn

# Type Alias: DynamicModelExtensionOperationFn\<TypeMap, M, P\>

> **DynamicModelExtensionOperationFn**\<`TypeMap`, `M`, `P`\> = `object` *extends* `TypeMap`\[`"model"`\]\[`M`\]\[`"operations"`\]\[`P`\]\[`"args"`\] ? \<`A`\>(`args?`) => [`DynamicModelExtensionFnResult`](DynamicModelExtensionFnResult.md)\<`TypeMap`, `M`, `A`, `P`, [`DynamicModelExtensionFnResultNull`](DynamicModelExtensionFnResultNull.md)\<`P`\>\> : \<`A`\>(`args`) => [`DynamicModelExtensionFnResult`](DynamicModelExtensionFnResult.md)\<`TypeMap`, `M`, `A`, `P`, [`DynamicModelExtensionFnResultNull`](DynamicModelExtensionFnResultNull.md)\<`P`\>\>

Defined in: backend/src/generated/prisma/runtime/library.d.ts:939

## Type Parameters

### TypeMap

`TypeMap` *extends* [`TypeMapDef`](TypeMapDef.md)

### M

`M` *extends* `PropertyKey`

### P

`P` *extends* `PropertyKey`
