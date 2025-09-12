[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / DeploymentUpdateManyArgs

# Type Alias: DeploymentUpdateManyArgs\<ExtArgs\>

> **DeploymentUpdateManyArgs**\<`ExtArgs`\> = `object`

Defined in: backend/src/generated/prisma/index.d.ts:4305

Deployment updateMany

## Type Parameters

### ExtArgs

`ExtArgs` *extends* [`InternalArgs`](../../../runtime/library/type-aliases/InternalArgs.md) = [`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)

## Properties

### data

> **data**: [`XOR`](XOR.md)\<[`DeploymentUpdateManyMutationInput`](DeploymentUpdateManyMutationInput.md), [`DeploymentUncheckedUpdateManyInput`](DeploymentUncheckedUpdateManyInput.md)\>

Defined in: backend/src/generated/prisma/index.d.ts:4309

The data used to update Deployments.

***

### limit?

> `optional` **limit**: `number`

Defined in: backend/src/generated/prisma/index.d.ts:4317

Limit how many Deployments to update.

***

### where?

> `optional` **where**: [`DeploymentWhereInput`](DeploymentWhereInput.md)

Defined in: backend/src/generated/prisma/index.d.ts:4313

Filter which Deployments to update
