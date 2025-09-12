[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / GetProjectAggregateType

# Type Alias: GetProjectAggregateType\<T\>

> **GetProjectAggregateType**\<`T`\> = \{ \[P in keyof T & keyof AggregateProject\]: P extends "\_count" \| "count" ? T\[P\] extends true ? number : GetScalarType\<T\[P\], AggregateProject\[P\]\> : GetScalarType\<T\[P\], AggregateProject\[P\]\> \}

Defined in: backend/src/generated/prisma/index.d.ts:2352

## Type Parameters

### T

`T` *extends* [`ProjectAggregateArgs`](ProjectAggregateArgs.md)
