[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / DeploymentCreateInput

# Type Alias: DeploymentCreateInput

> **DeploymentCreateInput** = `object`

Defined in: backend/src/generated/prisma/index.d.ts:4924

## Properties

### buildLogsUrl?

> `optional` **buildLogsUrl**: `string` \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:4930

***

### commitHash?

> `optional` **commitHash**: `string` \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:4928

***

### createdAt?

> `optional` **createdAt**: `Date` \| `string`

Defined in: backend/src/generated/prisma/index.d.ts:4926

***

### id?

> `optional` **id**: `string`

Defined in: backend/src/generated/prisma/index.d.ts:4925

***

### imageTag?

> `optional` **imageTag**: `string` \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:4929

***

### project

> **project**: [`ProjectCreateNestedOneWithoutDeploymentsInput`](ProjectCreateNestedOneWithoutDeploymentsInput.md)

Defined in: backend/src/generated/prisma/index.d.ts:4931

***

### status?

> `optional` **status**: [`DeployStatus`](../../$Enums/type-aliases/DeployStatus.md)

Defined in: backend/src/generated/prisma/index.d.ts:4927

***

### user?

> `optional` **user**: [`UserCreateNestedOneWithoutDeploymentsInput`](UserCreateNestedOneWithoutDeploymentsInput.md)

Defined in: backend/src/generated/prisma/index.d.ts:4932
