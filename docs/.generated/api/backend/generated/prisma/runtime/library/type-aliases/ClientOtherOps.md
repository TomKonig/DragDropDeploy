[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / ClientOtherOps

# Type Alias: ClientOtherOps

> **ClientOtherOps** = `object`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:190

## Methods

### $executeRaw()

> **$executeRaw**(`query`, ...`values`): [`PrismaPromise`](../interfaces/PrismaPromise.md)\<`number`\>

Defined in: backend/src/generated/prisma/runtime/library.d.ts:194

#### Parameters

##### query

`TemplateStringsArray` | [`Sql`](../classes/Sql.md)

##### values

...`any`[]

#### Returns

[`PrismaPromise`](../interfaces/PrismaPromise.md)\<`number`\>

***

### $executeRawUnsafe()

> **$executeRawUnsafe**(`query`, ...`values`): [`PrismaPromise`](../interfaces/PrismaPromise.md)\<`number`\>

Defined in: backend/src/generated/prisma/runtime/library.d.ts:195

#### Parameters

##### query

`string`

##### values

...`any`[]

#### Returns

[`PrismaPromise`](../interfaces/PrismaPromise.md)\<`number`\>

***

### $queryRaw()

> **$queryRaw**\<`T`\>(`query`, ...`values`): [`PrismaPromise`](../interfaces/PrismaPromise.md)\<`T`\>

Defined in: backend/src/generated/prisma/runtime/library.d.ts:191

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### query

`TemplateStringsArray` | [`Sql`](../classes/Sql.md)

##### values

...`any`[]

#### Returns

[`PrismaPromise`](../interfaces/PrismaPromise.md)\<`T`\>

***

### $queryRawTyped()

> **$queryRawTyped**\<`T`\>(`query`): [`PrismaPromise`](../interfaces/PrismaPromise.md)\<`T`[]\>

Defined in: backend/src/generated/prisma/runtime/library.d.ts:192

#### Type Parameters

##### T

`T`

#### Parameters

##### query

[`TypedSql`](../classes/TypedSql.md)\<`unknown`[], `T`\>

#### Returns

[`PrismaPromise`](../interfaces/PrismaPromise.md)\<`T`[]\>

***

### $queryRawUnsafe()

> **$queryRawUnsafe**\<`T`\>(`query`, ...`values`): [`PrismaPromise`](../interfaces/PrismaPromise.md)\<`T`\>

Defined in: backend/src/generated/prisma/runtime/library.d.ts:193

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### query

`string`

##### values

...`any`[]

#### Returns

[`PrismaPromise`](../interfaces/PrismaPromise.md)\<`T`\>

***

### $runCommandRaw()

> **$runCommandRaw**(`command`): [`PrismaPromise`](../interfaces/PrismaPromise.md)\<[`JsonObject`](JsonObject.md)\>

Defined in: backend/src/generated/prisma/runtime/library.d.ts:196

#### Parameters

##### command

[`InputJsonObject`](InputJsonObject.md)

#### Returns

[`PrismaPromise`](../interfaces/PrismaPromise.md)\<[`JsonObject`](JsonObject.md)\>
