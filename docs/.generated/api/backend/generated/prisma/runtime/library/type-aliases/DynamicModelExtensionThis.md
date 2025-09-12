[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / DynamicModelExtensionThis

# Type Alias: DynamicModelExtensionThis\<TypeMap, M, ExtArgs\>

> **DynamicModelExtensionThis**\<`TypeMap`, `M`, `ExtArgs`\> = `{ [P in keyof ExtArgs["model"][Uncapitalize<M & string>]]: Return<ExtArgs["model"][Uncapitalize<M & string>][P]> }` & `{ [P in Exclude<keyof TypeMap["model"][M]["operations"], keyof ExtArgs["model"][Uncapitalize<M & string>]>]: DynamicModelExtensionOperationFn<TypeMap, M, P> }` & `{ [P in Exclude<"fields", keyof ExtArgs["model"][Uncapitalize<M & string>]>]: TypeMap["model"][M]["fields"] }` & `object`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:941

## Type Parameters

### TypeMap

`TypeMap` *extends* [`TypeMapDef`](TypeMapDef.md)

### M

`M` *extends* `PropertyKey`

### ExtArgs

`ExtArgs` *extends* `Record`\<`string`, `any`\>
