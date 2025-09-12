[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / ExtendsHook

# Interface: ExtendsHook()\<Variant, TypeMapCb, ExtArgs, TypeMap\>

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1232

$extends, defineExtension

## Type Parameters

### Variant

`Variant` *extends* `"extends"` \| `"define"`

### TypeMapCb

`TypeMapCb` *extends* [`TypeMapCbDef`](../type-aliases/TypeMapCbDef.md)

### ExtArgs

`ExtArgs` *extends* `Record`\<`string`, `any`\>

### TypeMap

`TypeMap` *extends* [`TypeMapDef`](../type-aliases/TypeMapDef.md) = [`Call`](../type-aliases/Call.md)\<`TypeMapCb`, \{ `extArgs`: `ExtArgs`; \}\>

> **ExtendsHook**\<`R_`, `R`, `M_`, `M`, `Q_`, `C_`, `C`, `Args`, `MergedArgs`\>(`extension`): `object`\[`Variant`\]

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1236

$extends, defineExtension

## Type Parameters

### R_

`R_` *extends* `{ [K in any]?: unknown }`

### R

`R`

### M_

`M_` *extends* `{ [K in any]?: unknown }`

### M

`M`

### Q_

`Q_` *extends* `{ [K in any]?: unknown }`

### C_

`C_` *extends* `object`

### C

`C`

### Args

`Args` *extends* [`InternalArgs`](../type-aliases/InternalArgs.md)\<\{\[`key`: `string`\]: `object`; \}, \{\[`key`: `string`\]: `object`; \}, \{\[`key`: `string`\]: `object`; \}, \{\[`key`: `string`\]: `unknown`; \}\> = [`InternalArgs`](../type-aliases/InternalArgs.md)\<`R`, `M`, \{ \}, `C`\>

### MergedArgs

`MergedArgs` *extends* [`InternalArgs`](../type-aliases/InternalArgs.md)\<\{\[`key`: `string`\]: `object`; \}, \{\[`key`: `string`\]: `object`; \}, \{\[`key`: `string`\]: `object`; \}, \{\[`key`: `string`\]: `unknown`; \}\> = [`ComputeDeep`](../type-aliases/ComputeDeep.md)\<`ExtArgs` & `Args` & [`AllModelsToStringIndex`](../type-aliases/AllModelsToStringIndex.md)\<`TypeMap`, `Args`, `"result"`\> & [`AllModelsToStringIndex`](../type-aliases/AllModelsToStringIndex.md)\<`TypeMap`, `Args`, `"model"`\>\>

## Parameters

### extension

(`client`) => `object` | \{ `client?`: \{ \[P in string \| number \| symbol\]: unknown \} & `object` & `C`; `model?`: [`DynamicModelExtensionArgs`](../type-aliases/DynamicModelExtensionArgs.md)\<`M_`, `TypeMap`, `TypeMapCb`, `ExtArgs`\> & `M`; `name?`: `string`; `query?`: [`DynamicQueryExtensionArgs`](../type-aliases/DynamicQueryExtensionArgs.md)\<`Q_`, `TypeMap`\>; `result?`: [`DynamicResultExtensionArgs`](../type-aliases/DynamicResultExtensionArgs.md)\<`R_`, `TypeMap`\> & `R`; \}

## Returns

`object`\[`Variant`\]

## Properties

### extArgs

> **extArgs**: `ExtArgs`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1235
