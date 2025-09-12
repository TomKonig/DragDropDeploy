[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / DynamicModelExtensionArgs

# Type Alias: DynamicModelExtensionArgs\<M_, TypeMap, TypeMapCb, ExtArgs\>

> **DynamicModelExtensionArgs**\<`M_`, `TypeMap`, `TypeMapCb`, `ExtArgs`\> = `{ [K in keyof M_]: K extends "$allModels" ? { [P in keyof M_[K]]?: unknown } & { [K: symbol]: {} } : K extends TypeMap["meta"]["modelProps"] ? { [P in keyof M_[K]]?: unknown } & { [K: symbol]: { ctx: DynamicModelExtensionThis<TypeMap, ModelKey<TypeMap, K>, ExtArgs> & { $parent: DynamicClientExtensionThis<TypeMap, TypeMapCb, ExtArgs> } & { $name: ModelKey<TypeMap, K> } & { name: ModelKey<TypeMap, K> } } } : never }`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:902

Model

## Type Parameters

### M_

`M_`

### TypeMap

`TypeMap` *extends* [`TypeMapDef`](TypeMapDef.md)

### TypeMapCb

`TypeMapCb` *extends* [`TypeMapCbDef`](TypeMapCbDef.md)

### ExtArgs

`ExtArgs` *extends* `Record`\<`string`, `any`\>
