[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / DeploymentAggregateArgs

# Type Alias: DeploymentAggregateArgs\<ExtArgs\>

> **DeploymentAggregateArgs**\<`ExtArgs`\> = `object`

Defined in: backend/src/generated/prisma/index.d.ts:3409

## Type Parameters

### ExtArgs

`ExtArgs` *extends* [`InternalArgs`](../../../runtime/library/type-aliases/InternalArgs.md) = [`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)

## Properties

### \_count?

> `optional` **\_count**: `true` \| [`DeploymentCountAggregateInputType`](DeploymentCountAggregateInputType.md)

Defined in: backend/src/generated/prisma/index.d.ts:3443

[Aggregation Docs](https://www.prisma.io/docs/concepts/components/prisma-client/aggregations)

Count returned Deployments

***

### \_max?

> `optional` **\_max**: [`DeploymentMaxAggregateInputType`](DeploymentMaxAggregateInputType.md)

Defined in: backend/src/generated/prisma/index.d.ts:3455

[Aggregation Docs](https://www.prisma.io/docs/concepts/components/prisma-client/aggregations)

Select which fields to find the maximum value

***

### \_min?

> `optional` **\_min**: [`DeploymentMinAggregateInputType`](DeploymentMinAggregateInputType.md)

Defined in: backend/src/generated/prisma/index.d.ts:3449

[Aggregation Docs](https://www.prisma.io/docs/concepts/components/prisma-client/aggregations)

Select which fields to find the minimum value

***

### cursor?

> `optional` **cursor**: [`DeploymentWhereUniqueInput`](DeploymentWhereUniqueInput.md)

Defined in: backend/src/generated/prisma/index.d.ts:3425

[Cursor Docs](https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination)

Sets the start position

***

### orderBy?

> `optional` **orderBy**: [`DeploymentOrderByWithRelationInput`](DeploymentOrderByWithRelationInput.md) \| [`DeploymentOrderByWithRelationInput`](DeploymentOrderByWithRelationInput.md)[]

Defined in: backend/src/generated/prisma/index.d.ts:3419

[Sorting Docs](https://www.prisma.io/docs/concepts/components/prisma-client/sorting)

Determine the order of Deployments to fetch.

***

### skip?

> `optional` **skip**: `number`

Defined in: backend/src/generated/prisma/index.d.ts:3437

[Pagination Docs](https://www.prisma.io/docs/concepts/components/prisma-client/pagination)

Skip the first `n` Deployments.

***

### take?

> `optional` **take**: `number`

Defined in: backend/src/generated/prisma/index.d.ts:3431

[Pagination Docs](https://www.prisma.io/docs/concepts/components/prisma-client/pagination)

Take `±n` Deployments from the position of the cursor.

***

### where?

> `optional` **where**: [`DeploymentWhereInput`](DeploymentWhereInput.md)

Defined in: backend/src/generated/prisma/index.d.ts:3413

Filter which Deployment to aggregate.
