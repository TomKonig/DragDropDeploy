[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / DynamicResultExtensionArgs

# Type Alias: DynamicResultExtensionArgs\<R_, TypeMap\>

> **DynamicResultExtensionArgs**\<`R_`, `TypeMap`\> = `{ [K in keyof R_]: { [P in keyof R_[K]]?: { needs?: DynamicResultExtensionNeeds<TypeMap, ModelKey<TypeMap, K>, R_[K][P]>; compute: any } } }`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:981

Result

## Type Parameters

### R_

`R_`

### TypeMap

`TypeMap` *extends* [`TypeMapDef`](TypeMapDef.md)
