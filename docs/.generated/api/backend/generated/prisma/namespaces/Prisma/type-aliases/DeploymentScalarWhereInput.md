[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / DeploymentScalarWhereInput

# Type Alias: DeploymentScalarWhereInput

> **DeploymentScalarWhereInput** = `object`

Defined in: backend/src/generated/prisma/index.d.ts:5672

## Properties

### AND?

> `optional` **AND**: `DeploymentScalarWhereInput` \| `DeploymentScalarWhereInput`[]

Defined in: backend/src/generated/prisma/index.d.ts:5673

***

### buildLogsUrl?

> `optional` **buildLogsUrl**: [`StringNullableFilter`](StringNullableFilter.md)\<`"Deployment"`\> \| `string` \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:5683

***

### commitHash?

> `optional` **commitHash**: [`StringNullableFilter`](StringNullableFilter.md)\<`"Deployment"`\> \| `string` \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:5681

***

### createdAt?

> `optional` **createdAt**: [`DateTimeFilter`](DateTimeFilter.md)\<`"Deployment"`\> \| `Date` \| `string`

Defined in: backend/src/generated/prisma/index.d.ts:5677

***

### id?

> `optional` **id**: [`StringFilter`](StringFilter.md)\<`"Deployment"`\> \| `string`

Defined in: backend/src/generated/prisma/index.d.ts:5676

***

### imageTag?

> `optional` **imageTag**: [`StringNullableFilter`](StringNullableFilter.md)\<`"Deployment"`\> \| `string` \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:5682

***

### NOT?

> `optional` **NOT**: `DeploymentScalarWhereInput` \| `DeploymentScalarWhereInput`[]

Defined in: backend/src/generated/prisma/index.d.ts:5675

***

### OR?

> `optional` **OR**: `DeploymentScalarWhereInput`[]

Defined in: backend/src/generated/prisma/index.d.ts:5674

***

### projectId?

> `optional` **projectId**: [`StringFilter`](StringFilter.md)\<`"Deployment"`\> \| `string`

Defined in: backend/src/generated/prisma/index.d.ts:5678

***

### status?

> `optional` **status**: [`EnumDeployStatusFilter`](EnumDeployStatusFilter.md)\<`"Deployment"`\> \| [`DeployStatus`](../../$Enums/type-aliases/DeployStatus.md)

Defined in: backend/src/generated/prisma/index.d.ts:5680

***

### userId?

> `optional` **userId**: [`StringNullableFilter`](StringNullableFilter.md)\<`"Deployment"`\> \| `string` \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:5679
