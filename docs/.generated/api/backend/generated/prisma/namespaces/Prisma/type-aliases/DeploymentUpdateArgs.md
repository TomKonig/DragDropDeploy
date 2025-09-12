[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / DeploymentUpdateArgs

# Type Alias: DeploymentUpdateArgs\<ExtArgs\>

> **DeploymentUpdateArgs**\<`ExtArgs`\> = `object`

Defined in: backend/src/generated/prisma/index.d.ts:4279

Deployment update

## Type Parameters

### ExtArgs

`ExtArgs` *extends* [`InternalArgs`](../../../runtime/library/type-aliases/InternalArgs.md) = [`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)

## Properties

### data

> **data**: [`XOR`](XOR.md)\<[`DeploymentUpdateInput`](DeploymentUpdateInput.md), [`DeploymentUncheckedUpdateInput`](DeploymentUncheckedUpdateInput.md)\>

Defined in: backend/src/generated/prisma/index.d.ts:4295

The data needed to update a Deployment.

***

### include?

> `optional` **include**: [`DeploymentInclude`](DeploymentInclude.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:4291

Choose, which related nodes to fetch as well

***

### omit?

> `optional` **omit**: [`DeploymentOmit`](DeploymentOmit.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:4287

Omit specific fields from the Deployment

***

### select?

> `optional` **select**: [`DeploymentSelect`](DeploymentSelect.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:4283

Select specific fields to fetch from the Deployment

***

### where

> **where**: [`DeploymentWhereUniqueInput`](DeploymentWhereUniqueInput.md)

Defined in: backend/src/generated/prisma/index.d.ts:4299

Choose, which Deployment to update.
