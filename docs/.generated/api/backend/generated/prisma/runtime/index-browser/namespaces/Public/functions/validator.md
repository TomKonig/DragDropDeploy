[**@dragdropdeploy/backend**](../../../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../../../README.md) / [generated/prisma/runtime/index-browser](../../../README.md) / [Public](../README.md) / validator

# Function: validator()

## Call Signature

> **validator**\<`V`\>(): \<`S`\>(`select`) => `S`

Defined in: backend/src/generated/prisma/runtime/index-browser.d.ts:364

### Type Parameters

#### V

`V`

### Returns

> \<`S`\>(`select`): `S`

#### Type Parameters

##### S

`S`

#### Parameters

##### select

`Exact`\<`S`, `V`\>

#### Returns

`S`

## Call Signature

> **validator**\<`C`, `M`, `O`\>(`client`, `model`, `operation`): \<`S`\>(`select`) => `S`

Defined in: backend/src/generated/prisma/runtime/index-browser.d.ts:366

### Type Parameters

#### C

`C`

#### M

`M` *extends* `string` \| `number` \| `symbol`

#### O

`O` *extends* `"create"` \| `"findUnique"` \| `"findFirst"` \| `"$executeRaw"` \| `"$executeRawUnsafe"` \| `"$queryRaw"` \| `"$queryRawUnsafe"` \| `"count"` \| `"findMany"` \| `"findUniqueOrThrow"` \| `"findFirstOrThrow"` \| `"createManyAndReturn"` \| `"delete"` \| `"update"` \| `"updateManyAndReturn"` \| `"upsert"` \| `"createMany"` \| `"updateMany"` \| `"deleteMany"` \| `"aggregate"` \| `"groupBy"` \| `"findRaw"` \| `"aggregateRaw"` \| `"$runCommandRaw"`

### Parameters

#### client

`C`

#### model

`M`

#### operation

`O`

### Returns

> \<`S`\>(`select`): `S`

#### Type Parameters

##### S

`S`

#### Parameters

##### select

`Exact`\<`S`, `Args`\<`C`\[`M`\], `O`\>\>

#### Returns

`S`

## Call Signature

> **validator**\<`C`, `M`, `O`, `P`\>(`client`, `model`, `operation`, `prop`): \<`S`\>(`select`) => `S`

Defined in: backend/src/generated/prisma/runtime/index-browser.d.ts:368

### Type Parameters

#### C

`C`

#### M

`M` *extends* `string` \| `number` \| `symbol`

#### O

`O` *extends* `"create"` \| `"findUnique"` \| `"findFirst"` \| `"$executeRaw"` \| `"$executeRawUnsafe"` \| `"$queryRaw"` \| `"$queryRawUnsafe"` \| `"count"` \| `"findMany"` \| `"findUniqueOrThrow"` \| `"findFirstOrThrow"` \| `"createManyAndReturn"` \| `"delete"` \| `"update"` \| `"updateManyAndReturn"` \| `"upsert"` \| `"createMany"` \| `"updateMany"` \| `"deleteMany"` \| `"aggregate"` \| `"groupBy"` \| `"findRaw"` \| `"aggregateRaw"` \| `"$runCommandRaw"`

#### P

`P` *extends* `string` \| `number` \| `symbol`

### Parameters

#### client

`C`

#### model

`M`

#### operation

`O`

#### prop

`P`

### Returns

> \<`S`\>(`select`): `S`

#### Type Parameters

##### S

`S`

#### Parameters

##### select

`Exact`\<`S`, `Args`\<`C`\[`M`\], `O`\>\[`P`\]\>

#### Returns

`S`
