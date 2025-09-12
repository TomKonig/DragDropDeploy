[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / GetDeploymentGroupByPayload

# Type Alias: GetDeploymentGroupByPayload\<T\>

> **GetDeploymentGroupByPayload**\<`T`\> = [`PrismaPromise`](PrismaPromise.md)\<[`PickEnumerable`](PickEnumerable.md)\<[`DeploymentGroupByOutputType`](DeploymentGroupByOutputType.md), `T`\[`"by"`\]\> & `{ [P in keyof T & keyof DeploymentGroupByOutputType]: P extends "_count" ? T[P] extends boolean ? number : GetScalarType<T[P], DeploymentGroupByOutputType[P]> : GetScalarType<T[P], DeploymentGroupByOutputType[P]> }`[]\>

Defined in: backend/src/generated/prisma/index.d.ts:3495

## Type Parameters

### T

`T` *extends* [`DeploymentGroupByArgs`](DeploymentGroupByArgs.md)
