[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / DeploymentUpdateManyAndReturnArgs

# Type Alias: DeploymentUpdateManyAndReturnArgs\<ExtArgs\>

> **DeploymentUpdateManyAndReturnArgs**\<`ExtArgs`\> = `object`

Defined in: backend/src/generated/prisma/index.d.ts:4323

Deployment updateManyAndReturn

## Type Parameters

### ExtArgs

`ExtArgs` *extends* [`InternalArgs`](../../../runtime/library/type-aliases/InternalArgs.md) = [`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)

## Properties

### data

> **data**: [`XOR`](XOR.md)\<[`DeploymentUpdateManyMutationInput`](DeploymentUpdateManyMutationInput.md), [`DeploymentUncheckedUpdateManyInput`](DeploymentUncheckedUpdateManyInput.md)\>

Defined in: backend/src/generated/prisma/index.d.ts:4335

The data used to update Deployments.

***

### include?

> `optional` **include**: [`DeploymentIncludeUpdateManyAndReturn`](DeploymentIncludeUpdateManyAndReturn.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:4347

Choose, which related nodes to fetch as well

***

### limit?

> `optional` **limit**: `number`

Defined in: backend/src/generated/prisma/index.d.ts:4343

Limit how many Deployments to update.

***

### omit?

> `optional` **omit**: [`DeploymentOmit`](DeploymentOmit.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:4331

Omit specific fields from the Deployment

***

### select?

> `optional` **select**: [`DeploymentSelectUpdateManyAndReturn`](DeploymentSelectUpdateManyAndReturn.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:4327

Select specific fields to fetch from the Deployment

***

### where?

> `optional` **where**: [`DeploymentWhereInput`](DeploymentWhereInput.md)

Defined in: backend/src/generated/prisma/index.d.ts:4339

Filter which Deployments to update
