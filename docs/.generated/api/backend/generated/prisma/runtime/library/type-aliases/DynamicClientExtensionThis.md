[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / DynamicClientExtensionThis

# Type Alias: DynamicClientExtensionThis\<TypeMap, TypeMapCb, ExtArgs\>

> **DynamicClientExtensionThis**\<`TypeMap`, `TypeMapCb`, `ExtArgs`\> = `{ [P in keyof ExtArgs["client"]]: Return<ExtArgs["client"][P]> }` & `{ [P in Exclude<TypeMap["meta"]["modelProps"], keyof ExtArgs["client"]>]: DynamicModelExtensionThis<TypeMap, ModelKey<TypeMap, P>, ExtArgs> }` & `{ [P in Exclude<keyof TypeMap["other"]["operations"], keyof ExtArgs["client"]>]: P extends keyof ClientOtherOps ? ClientOtherOps[P] : never }` & `{ [P in Exclude<ClientBuiltInProp, keyof ExtArgs["client"]>]: DynamicClientExtensionThisBuiltin<TypeMap, TypeMapCb, ExtArgs>[P] }` & `object`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:871

## Type Parameters

### TypeMap

`TypeMap` *extends* [`TypeMapDef`](TypeMapDef.md)

### TypeMapCb

`TypeMapCb` *extends* [`TypeMapCbDef`](TypeMapCbDef.md)

### ExtArgs

`ExtArgs` *extends* `Record`\<`string`, `any`\>
