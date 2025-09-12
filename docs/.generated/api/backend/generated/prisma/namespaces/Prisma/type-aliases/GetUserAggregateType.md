[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / GetUserAggregateType

# Type Alias: GetUserAggregateType\<T\>

> **GetUserAggregateType**\<`T`\> = \{ \[P in keyof T & keyof AggregateUser\]: P extends "\_count" \| "count" ? T\[P\] extends true ? number : GetScalarType\<T\[P\], AggregateUser\[P\]\> : GetScalarType\<T\[P\], AggregateUser\[P\]\> \}

Defined in: backend/src/generated/prisma/index.d.ts:1247

## Type Parameters

### T

`T` *extends* [`UserAggregateArgs`](UserAggregateArgs.md)
