[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / ProjectWhereInput

# Type Alias: ProjectWhereInput

> **ProjectWhereInput** = `object`

Defined in: backend/src/generated/prisma/index.d.ts:4663

## Properties

### AND?

> `optional` **AND**: `ProjectWhereInput` \| `ProjectWhereInput`[]

Defined in: backend/src/generated/prisma/index.d.ts:4664

***

### createdAt?

> `optional` **createdAt**: [`DateTimeFilter`](DateTimeFilter.md)\<`"Project"`\> \| `Date` \| `string`

Defined in: backend/src/generated/prisma/index.d.ts:4668

***

### deployments?

> `optional` **deployments**: [`DeploymentListRelationFilter`](DeploymentListRelationFilter.md)

Defined in: backend/src/generated/prisma/index.d.ts:4673

***

### id?

> `optional` **id**: [`StringFilter`](StringFilter.md)\<`"Project"`\> \| `string`

Defined in: backend/src/generated/prisma/index.d.ts:4667

***

### name?

> `optional` **name**: [`StringFilter`](StringFilter.md)\<`"Project"`\> \| `string`

Defined in: backend/src/generated/prisma/index.d.ts:4670

***

### NOT?

> `optional` **NOT**: `ProjectWhereInput` \| `ProjectWhereInput`[]

Defined in: backend/src/generated/prisma/index.d.ts:4666

***

### OR?

> `optional` **OR**: `ProjectWhereInput`[]

Defined in: backend/src/generated/prisma/index.d.ts:4665

***

### owner?

> `optional` **owner**: [`XOR`](XOR.md)\<[`UserScalarRelationFilter`](UserScalarRelationFilter.md), [`UserWhereInput`](UserWhereInput.md)\>

Defined in: backend/src/generated/prisma/index.d.ts:4672

***

### ownerId?

> `optional` **ownerId**: [`StringFilter`](StringFilter.md)\<`"Project"`\> \| `string`

Defined in: backend/src/generated/prisma/index.d.ts:4671

***

### updatedAt?

> `optional` **updatedAt**: [`DateTimeFilter`](DateTimeFilter.md)\<`"Project"`\> \| `Date` \| `string`

Defined in: backend/src/generated/prisma/index.d.ts:4669
