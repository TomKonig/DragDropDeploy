[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / ProjectAggregateArgs

# Type Alias: ProjectAggregateArgs\<ExtArgs\>

> **ProjectAggregateArgs**\<`ExtArgs`\> = `object`

Defined in: backend/src/generated/prisma/index.d.ts:2303

## Type Parameters

### ExtArgs

`ExtArgs` *extends* [`InternalArgs`](../../../runtime/library/type-aliases/InternalArgs.md) = [`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)

## Properties

### \_count?

> `optional` **\_count**: `true` \| [`ProjectCountAggregateInputType`](ProjectCountAggregateInputType.md)

Defined in: backend/src/generated/prisma/index.d.ts:2337

[Aggregation Docs](https://www.prisma.io/docs/concepts/components/prisma-client/aggregations)

Count returned Projects

***

### \_max?

> `optional` **\_max**: [`ProjectMaxAggregateInputType`](ProjectMaxAggregateInputType.md)

Defined in: backend/src/generated/prisma/index.d.ts:2349

[Aggregation Docs](https://www.prisma.io/docs/concepts/components/prisma-client/aggregations)

Select which fields to find the maximum value

***

### \_min?

> `optional` **\_min**: [`ProjectMinAggregateInputType`](ProjectMinAggregateInputType.md)

Defined in: backend/src/generated/prisma/index.d.ts:2343

[Aggregation Docs](https://www.prisma.io/docs/concepts/components/prisma-client/aggregations)

Select which fields to find the minimum value

***

### cursor?

> `optional` **cursor**: [`ProjectWhereUniqueInput`](ProjectWhereUniqueInput.md)

Defined in: backend/src/generated/prisma/index.d.ts:2319

[Cursor Docs](https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination)

Sets the start position

***

### orderBy?

> `optional` **orderBy**: [`ProjectOrderByWithRelationInput`](ProjectOrderByWithRelationInput.md) \| [`ProjectOrderByWithRelationInput`](ProjectOrderByWithRelationInput.md)[]

Defined in: backend/src/generated/prisma/index.d.ts:2313

[Sorting Docs](https://www.prisma.io/docs/concepts/components/prisma-client/sorting)

Determine the order of Projects to fetch.

***

### skip?

> `optional` **skip**: `number`

Defined in: backend/src/generated/prisma/index.d.ts:2331

[Pagination Docs](https://www.prisma.io/docs/concepts/components/prisma-client/pagination)

Skip the first `n` Projects.

***

### take?

> `optional` **take**: `number`

Defined in: backend/src/generated/prisma/index.d.ts:2325

[Pagination Docs](https://www.prisma.io/docs/concepts/components/prisma-client/pagination)

Take `±n` Projects from the position of the cursor.

***

### where?

> `optional` **where**: [`ProjectWhereInput`](ProjectWhereInput.md)

Defined in: backend/src/generated/prisma/index.d.ts:2307

Filter which Project to aggregate.
