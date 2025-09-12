[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / DeploymentWhereInput

# Type Alias: DeploymentWhereInput

> **DeploymentWhereInput** = `object`

Defined in: backend/src/generated/prisma/index.d.ts:4721

## Properties

### AND?

> `optional` **AND**: `DeploymentWhereInput` \| `DeploymentWhereInput`[]

Defined in: backend/src/generated/prisma/index.d.ts:4722

***

### buildLogsUrl?

> `optional` **buildLogsUrl**: [`StringNullableFilter`](StringNullableFilter.md)\<`"Deployment"`\> \| `string` \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:4732

***

### commitHash?

> `optional` **commitHash**: [`StringNullableFilter`](StringNullableFilter.md)\<`"Deployment"`\> \| `string` \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:4730

***

### createdAt?

> `optional` **createdAt**: [`DateTimeFilter`](DateTimeFilter.md)\<`"Deployment"`\> \| `Date` \| `string`

Defined in: backend/src/generated/prisma/index.d.ts:4726

***

### id?

> `optional` **id**: [`StringFilter`](StringFilter.md)\<`"Deployment"`\> \| `string`

Defined in: backend/src/generated/prisma/index.d.ts:4725

***

### imageTag?

> `optional` **imageTag**: [`StringNullableFilter`](StringNullableFilter.md)\<`"Deployment"`\> \| `string` \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:4731

***

### NOT?

> `optional` **NOT**: `DeploymentWhereInput` \| `DeploymentWhereInput`[]

Defined in: backend/src/generated/prisma/index.d.ts:4724

***

### OR?

> `optional` **OR**: `DeploymentWhereInput`[]

Defined in: backend/src/generated/prisma/index.d.ts:4723

***

### project?

> `optional` **project**: [`XOR`](XOR.md)\<[`ProjectScalarRelationFilter`](ProjectScalarRelationFilter.md), [`ProjectWhereInput`](ProjectWhereInput.md)\>

Defined in: backend/src/generated/prisma/index.d.ts:4733

***

### projectId?

> `optional` **projectId**: [`StringFilter`](StringFilter.md)\<`"Deployment"`\> \| `string`

Defined in: backend/src/generated/prisma/index.d.ts:4727

***

### status?

> `optional` **status**: [`EnumDeployStatusFilter`](EnumDeployStatusFilter.md)\<`"Deployment"`\> \| [`DeployStatus`](../../$Enums/type-aliases/DeployStatus.md)

Defined in: backend/src/generated/prisma/index.d.ts:4729

***

### user?

> `optional` **user**: [`XOR`](XOR.md)\<[`UserNullableScalarRelationFilter`](UserNullableScalarRelationFilter.md), [`UserWhereInput`](UserWhereInput.md)\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:4734

***

### userId?

> `optional` **userId**: [`StringNullableFilter`](StringNullableFilter.md)\<`"Deployment"`\> \| `string` \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:4728
