[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / GetDeploymentAggregateType

# Type Alias: GetDeploymentAggregateType\<T\>

> **GetDeploymentAggregateType**\<`T`\> = \{ \[P in keyof T & keyof AggregateDeployment\]: P extends "\_count" \| "count" ? T\[P\] extends true ? number : GetScalarType\<T\[P\], AggregateDeployment\[P\]\> : GetScalarType\<T\[P\], AggregateDeployment\[P\]\> \}

Defined in: backend/src/generated/prisma/index.d.ts:3458

## Type Parameters

### T

`T` *extends* [`DeploymentAggregateArgs`](DeploymentAggregateArgs.md)
