[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / DeploymentCreateArgs

# Type Alias: DeploymentCreateArgs\<ExtArgs\>

> **DeploymentCreateArgs**\<`ExtArgs`\> = `object`

Defined in: backend/src/generated/prisma/index.d.ts:4223

Deployment create

## Type Parameters

### ExtArgs

`ExtArgs` *extends* [`InternalArgs`](../../../runtime/library/type-aliases/InternalArgs.md) = [`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)

## Properties

### data

> **data**: [`XOR`](XOR.md)\<[`DeploymentCreateInput`](DeploymentCreateInput.md), [`DeploymentUncheckedCreateInput`](DeploymentUncheckedCreateInput.md)\>

Defined in: backend/src/generated/prisma/index.d.ts:4239

The data needed to create a Deployment.

***

### include?

> `optional` **include**: [`DeploymentInclude`](DeploymentInclude.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:4235

Choose, which related nodes to fetch as well

***

### omit?

> `optional` **omit**: [`DeploymentOmit`](DeploymentOmit.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:4231

Omit specific fields from the Deployment

***

### select?

> `optional` **select**: [`DeploymentSelect`](DeploymentSelect.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:4227

Select specific fields to fetch from the Deployment
