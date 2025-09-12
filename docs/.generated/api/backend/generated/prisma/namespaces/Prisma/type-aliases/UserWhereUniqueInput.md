[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / UserWhereUniqueInput

# Type Alias: UserWhereUniqueInput

> **UserWhereUniqueInput** = [`AtLeast`](AtLeast.md)\<\{ `AND?`: [`UserWhereInput`](UserWhereInput.md) \| [`UserWhereInput`](UserWhereInput.md)[]; `createdAt?`: [`DateTimeFilter`](DateTimeFilter.md)\<`"User"`\> \| `Date` \| `string`; `deployments?`: [`DeploymentListRelationFilter`](DeploymentListRelationFilter.md); `displayName?`: [`StringNullableFilter`](StringNullableFilter.md)\<`"User"`\> \| `string` \| `null`; `email?`: `string`; `id?`: `string`; `isOperator?`: [`BoolFilter`](BoolFilter.md)\<`"User"`\> \| `boolean`; `NOT?`: [`UserWhereInput`](UserWhereInput.md) \| [`UserWhereInput`](UserWhereInput.md)[]; `OR?`: [`UserWhereInput`](UserWhereInput.md)[]; `projects?`: [`ProjectListRelationFilter`](ProjectListRelationFilter.md); `updatedAt?`: [`DateTimeFilter`](DateTimeFilter.md)\<`"User"`\> \| `Date` \| `string`; \}, `"id"` \| `"email"`\>

Defined in: backend/src/generated/prisma/index.d.ts:4625
