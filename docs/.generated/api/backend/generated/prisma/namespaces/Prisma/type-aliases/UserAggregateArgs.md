[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / UserAggregateArgs

# Type Alias: UserAggregateArgs\<ExtArgs\>

> **UserAggregateArgs**\<`ExtArgs`\> = `object`

Defined in: backend/src/generated/prisma/index.d.ts:1198

## Type Parameters

### ExtArgs

`ExtArgs` *extends* [`InternalArgs`](../../../runtime/library/type-aliases/InternalArgs.md) = [`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)

## Properties

### \_count?

> `optional` **\_count**: `true` \| [`UserCountAggregateInputType`](UserCountAggregateInputType.md)

Defined in: backend/src/generated/prisma/index.d.ts:1232

[Aggregation Docs](https://www.prisma.io/docs/concepts/components/prisma-client/aggregations)

Count returned Users

***

### \_max?

> `optional` **\_max**: [`UserMaxAggregateInputType`](UserMaxAggregateInputType.md)

Defined in: backend/src/generated/prisma/index.d.ts:1244

[Aggregation Docs](https://www.prisma.io/docs/concepts/components/prisma-client/aggregations)

Select which fields to find the maximum value

***

### \_min?

> `optional` **\_min**: [`UserMinAggregateInputType`](UserMinAggregateInputType.md)

Defined in: backend/src/generated/prisma/index.d.ts:1238

[Aggregation Docs](https://www.prisma.io/docs/concepts/components/prisma-client/aggregations)

Select which fields to find the minimum value

***

### cursor?

> `optional` **cursor**: [`UserWhereUniqueInput`](UserWhereUniqueInput.md)

Defined in: backend/src/generated/prisma/index.d.ts:1214

[Cursor Docs](https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination)

Sets the start position

***

### orderBy?

> `optional` **orderBy**: [`UserOrderByWithRelationInput`](UserOrderByWithRelationInput.md) \| [`UserOrderByWithRelationInput`](UserOrderByWithRelationInput.md)[]

Defined in: backend/src/generated/prisma/index.d.ts:1208

[Sorting Docs](https://www.prisma.io/docs/concepts/components/prisma-client/sorting)

Determine the order of Users to fetch.

***

### skip?

> `optional` **skip**: `number`

Defined in: backend/src/generated/prisma/index.d.ts:1226

[Pagination Docs](https://www.prisma.io/docs/concepts/components/prisma-client/pagination)

Skip the first `n` Users.

***

### take?

> `optional` **take**: `number`

Defined in: backend/src/generated/prisma/index.d.ts:1220

[Pagination Docs](https://www.prisma.io/docs/concepts/components/prisma-client/pagination)

Take `±n` Users from the position of the cursor.

***

### where?

> `optional` **where**: [`UserWhereInput`](UserWhereInput.md)

Defined in: backend/src/generated/prisma/index.d.ts:1202

Filter which User to aggregate.
