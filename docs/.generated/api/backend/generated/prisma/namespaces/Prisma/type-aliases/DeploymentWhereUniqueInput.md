[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / DeploymentWhereUniqueInput

# Type Alias: DeploymentWhereUniqueInput

> **DeploymentWhereUniqueInput** = [`AtLeast`](AtLeast.md)\<\{ `AND?`: [`DeploymentWhereInput`](DeploymentWhereInput.md) \| [`DeploymentWhereInput`](DeploymentWhereInput.md)[]; `buildLogsUrl?`: [`StringNullableFilter`](StringNullableFilter.md)\<`"Deployment"`\> \| `string` \| `null`; `commitHash?`: [`StringNullableFilter`](StringNullableFilter.md)\<`"Deployment"`\> \| `string` \| `null`; `createdAt?`: [`DateTimeFilter`](DateTimeFilter.md)\<`"Deployment"`\> \| `Date` \| `string`; `id?`: `string`; `imageTag?`: [`StringNullableFilter`](StringNullableFilter.md)\<`"Deployment"`\> \| `string` \| `null`; `NOT?`: [`DeploymentWhereInput`](DeploymentWhereInput.md) \| [`DeploymentWhereInput`](DeploymentWhereInput.md)[]; `OR?`: [`DeploymentWhereInput`](DeploymentWhereInput.md)[]; `project?`: [`XOR`](XOR.md)\<[`ProjectScalarRelationFilter`](ProjectScalarRelationFilter.md), [`ProjectWhereInput`](ProjectWhereInput.md)\>; `projectId?`: [`StringFilter`](StringFilter.md)\<`"Deployment"`\> \| `string`; `status?`: [`EnumDeployStatusFilter`](EnumDeployStatusFilter.md)\<`"Deployment"`\> \| [`DeployStatus`](../../$Enums/type-aliases/DeployStatus.md); `user?`: [`XOR`](XOR.md)\<[`UserNullableScalarRelationFilter`](UserNullableScalarRelationFilter.md), [`UserWhereInput`](UserWhereInput.md)\> \| `null`; `userId?`: [`StringNullableFilter`](StringNullableFilter.md)\<`"Deployment"`\> \| `string` \| `null`; \}, `"id"`\>

Defined in: backend/src/generated/prisma/index.d.ts:4750
