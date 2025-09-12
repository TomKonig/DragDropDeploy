[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / DynamicClientExtensionThisBuiltin

# Type Alias: DynamicClientExtensionThisBuiltin\<TypeMap, TypeMapCb, ExtArgs\>

> **DynamicClientExtensionThisBuiltin**\<`TypeMap`, `TypeMapCb`, `ExtArgs`\> = `object`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:885

## Type Parameters

### TypeMap

`TypeMap` *extends* [`TypeMapDef`](TypeMapDef.md)

### TypeMapCb

`TypeMapCb` *extends* [`TypeMapCbDef`](TypeMapCbDef.md)

### ExtArgs

`ExtArgs` *extends* `Record`\<`string`, `any`\>

## Properties

### $extends

> **$extends**: [`ExtendsHook`](../interfaces/ExtendsHook.md)\<`"extends"`, `TypeMapCb`, `ExtArgs`, [`Call`](Call.md)\<`TypeMapCb`, \{ `extArgs`: `ExtArgs`; \}\>\>

Defined in: backend/src/generated/prisma/runtime/library.d.ts:886

## Methods

### $connect()

> **$connect**(): `Promise`\<`void`\>

Defined in: backend/src/generated/prisma/runtime/library.d.ts:898

#### Returns

`Promise`\<`void`\>

***

### $disconnect()

> **$disconnect**(): `Promise`\<`void`\>

Defined in: backend/src/generated/prisma/runtime/library.d.ts:897

#### Returns

`Promise`\<`void`\>

***

### $transaction()

#### Call Signature

> **$transaction**\<`P`\>(`arg`, `options?`): `Promise`\<[`UnwrapTuple`](UnwrapTuple.md)\<`P`\>\>

Defined in: backend/src/generated/prisma/runtime/library.d.ts:889

##### Type Parameters

###### P

`P` *extends* [`PrismaPromise`](../interfaces/PrismaPromise.md)\<`any`\>[]

##### Parameters

###### arg

\[`...P[]`\]

###### options?

###### isolationLevel?

`TypeMap`\[`"meta"`\]\[`"txIsolationLevel"`\]

##### Returns

`Promise`\<[`UnwrapTuple`](UnwrapTuple.md)\<`P`\>\>

#### Call Signature

> **$transaction**\<`R`\>(`fn`, `options?`): `Promise`\<`R`\>

Defined in: backend/src/generated/prisma/runtime/library.d.ts:892

##### Type Parameters

###### R

`R`

##### Parameters

###### fn

(`client`) => `Promise`\<`R`\>

###### options?

###### isolationLevel?

`TypeMap`\[`"meta"`\]\[`"txIsolationLevel"`\]

###### maxWait?

`number`

###### timeout?

`number`

##### Returns

`Promise`\<`R`\>
