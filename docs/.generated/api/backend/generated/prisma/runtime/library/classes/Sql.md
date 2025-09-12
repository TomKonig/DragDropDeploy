[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / Sql

# Class: Sql

Defined in: backend/src/generated/prisma/runtime/library.d.ts:3644

A SQL instance can be nested within each other to build SQL strings.

## Constructors

### Constructor

> **new Sql**(`rawStrings`, `rawValues`): `Sql`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:3647

#### Parameters

##### rawStrings

readonly `string`[]

##### rawValues

readonly `unknown`[]

#### Returns

`Sql`

## Properties

### strings

> `readonly` **strings**: `string`[]

Defined in: backend/src/generated/prisma/runtime/library.d.ts:3646

***

### values

> `readonly` **values**: `unknown`[]

Defined in: backend/src/generated/prisma/runtime/library.d.ts:3645

## Accessors

### sql

#### Get Signature

> **get** **sql**(): `string`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:3648

##### Returns

`string`

***

### statement

#### Get Signature

> **get** **statement**(): `string`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:3649

##### Returns

`string`

***

### text

#### Get Signature

> **get** **text**(): `string`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:3650

##### Returns

`string`

## Methods

### inspect()

> **inspect**(): `object`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:3651

#### Returns

`object`

##### sql

> **sql**: `string`

##### statement

> **statement**: `string`

##### text

> **text**: `string`

##### values

> **values**: `unknown`[]
