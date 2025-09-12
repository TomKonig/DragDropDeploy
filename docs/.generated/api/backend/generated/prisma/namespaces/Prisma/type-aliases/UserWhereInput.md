[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / UserWhereInput

# Type Alias: UserWhereInput

> **UserWhereInput** = `object`

Defined in: backend/src/generated/prisma/index.d.ts:4600

Deep Input Types

## Properties

### AND?

> `optional` **AND**: `UserWhereInput` \| `UserWhereInput`[]

Defined in: backend/src/generated/prisma/index.d.ts:4601

***

### createdAt?

> `optional` **createdAt**: [`DateTimeFilter`](DateTimeFilter.md)\<`"User"`\> \| `Date` \| `string`

Defined in: backend/src/generated/prisma/index.d.ts:4605

***

### deployments?

> `optional` **deployments**: [`DeploymentListRelationFilter`](DeploymentListRelationFilter.md)

Defined in: backend/src/generated/prisma/index.d.ts:4611

***

### displayName?

> `optional` **displayName**: [`StringNullableFilter`](StringNullableFilter.md)\<`"User"`\> \| `string` \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:4608

***

### email?

> `optional` **email**: [`StringFilter`](StringFilter.md)\<`"User"`\> \| `string`

Defined in: backend/src/generated/prisma/index.d.ts:4607

***

### id?

> `optional` **id**: [`StringFilter`](StringFilter.md)\<`"User"`\> \| `string`

Defined in: backend/src/generated/prisma/index.d.ts:4604

***

### isOperator?

> `optional` **isOperator**: [`BoolFilter`](BoolFilter.md)\<`"User"`\> \| `boolean`

Defined in: backend/src/generated/prisma/index.d.ts:4609

***

### NOT?

> `optional` **NOT**: `UserWhereInput` \| `UserWhereInput`[]

Defined in: backend/src/generated/prisma/index.d.ts:4603

***

### OR?

> `optional` **OR**: `UserWhereInput`[]

Defined in: backend/src/generated/prisma/index.d.ts:4602

***

### projects?

> `optional` **projects**: [`ProjectListRelationFilter`](ProjectListRelationFilter.md)

Defined in: backend/src/generated/prisma/index.d.ts:4610

***

### updatedAt?

> `optional` **updatedAt**: [`DateTimeFilter`](DateTimeFilter.md)\<`"User"`\> \| `Date` \| `string`

Defined in: backend/src/generated/prisma/index.d.ts:4606
