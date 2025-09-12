[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / DynamicResultExtensionNeeds

# Type Alias: DynamicResultExtensionNeeds\<TypeMap, M, S\>

> **DynamicResultExtensionNeeds**\<`TypeMap`, `M`, `S`\> = `{ [K in keyof S]: K extends keyof TypeMap["model"][M]["payload"]["scalars"] ? S[K] : never }` & `{ [N in keyof TypeMap["model"][M]["payload"]["scalars"]]?: boolean }`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:994

## Type Parameters

### TypeMap

`TypeMap` *extends* [`TypeMapDef`](TypeMapDef.md)

### M

`M` *extends* `PropertyKey`

### S

`S`
