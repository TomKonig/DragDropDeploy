[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / ProjectWhereUniqueInput

# Type Alias: ProjectWhereUniqueInput

> **ProjectWhereUniqueInput** = [`AtLeast`](AtLeast.md)\<\{ `AND?`: [`ProjectWhereInput`](ProjectWhereInput.md) \| [`ProjectWhereInput`](ProjectWhereInput.md)[]; `createdAt?`: [`DateTimeFilter`](DateTimeFilter.md)\<`"Project"`\> \| `Date` \| `string`; `deployments?`: [`DeploymentListRelationFilter`](DeploymentListRelationFilter.md); `id?`: `string`; `name?`: [`StringFilter`](StringFilter.md)\<`"Project"`\> \| `string`; `NOT?`: [`ProjectWhereInput`](ProjectWhereInput.md) \| [`ProjectWhereInput`](ProjectWhereInput.md)[]; `OR?`: [`ProjectWhereInput`](ProjectWhereInput.md)[]; `owner?`: [`XOR`](XOR.md)\<[`UserScalarRelationFilter`](UserScalarRelationFilter.md), [`UserWhereInput`](UserWhereInput.md)\>; `ownerId?`: [`StringFilter`](StringFilter.md)\<`"Project"`\> \| `string`; `updatedAt?`: [`DateTimeFilter`](DateTimeFilter.md)\<`"Project"`\> \| `Date` \| `string`; \}, `"id"`\>

Defined in: backend/src/generated/prisma/index.d.ts:4686
