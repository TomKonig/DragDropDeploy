[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / DeploymentUpsertArgs

# Type Alias: DeploymentUpsertArgs\<ExtArgs\>

> **DeploymentUpsertArgs**\<`ExtArgs`\> = `object`

Defined in: backend/src/generated/prisma/index.d.ts:4353

Deployment upsert

## Type Parameters

### ExtArgs

`ExtArgs` *extends* [`InternalArgs`](../../../runtime/library/type-aliases/InternalArgs.md) = [`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)

## Properties

### create

> **create**: [`XOR`](XOR.md)\<[`DeploymentCreateInput`](DeploymentCreateInput.md), [`DeploymentUncheckedCreateInput`](DeploymentUncheckedCreateInput.md)\>

Defined in: backend/src/generated/prisma/index.d.ts:4373

In case the Deployment found by the `where` argument doesn't exist, create a new Deployment with this data.

***

### include?

> `optional` **include**: [`DeploymentInclude`](DeploymentInclude.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:4365

Choose, which related nodes to fetch as well

***

### omit?

> `optional` **omit**: [`DeploymentOmit`](DeploymentOmit.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:4361

Omit specific fields from the Deployment

***

### select?

> `optional` **select**: [`DeploymentSelect`](DeploymentSelect.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:4357

Select specific fields to fetch from the Deployment

***

### update

> **update**: [`XOR`](XOR.md)\<[`DeploymentUpdateInput`](DeploymentUpdateInput.md), [`DeploymentUncheckedUpdateInput`](DeploymentUncheckedUpdateInput.md)\>

Defined in: backend/src/generated/prisma/index.d.ts:4377

In case the Deployment was found with the provided `where` argument, update it with this data.

***

### where

> **where**: [`DeploymentWhereUniqueInput`](DeploymentWhereUniqueInput.md)

Defined in: backend/src/generated/prisma/index.d.ts:4369

The filter to search for the Deployment to update in case it exists.
