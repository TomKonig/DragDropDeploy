[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / ProjectUpdateManyArgs

# Type Alias: ProjectUpdateManyArgs\<ExtArgs\>

> **ProjectUpdateManyArgs**\<`ExtArgs`\> = `object`

Defined in: backend/src/generated/prisma/index.d.ts:3176

Project updateMany

## Type Parameters

### ExtArgs

`ExtArgs` *extends* [`InternalArgs`](../../../runtime/library/type-aliases/InternalArgs.md) = [`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)

## Properties

### data

> **data**: [`XOR`](XOR.md)\<[`ProjectUpdateManyMutationInput`](ProjectUpdateManyMutationInput.md), [`ProjectUncheckedUpdateManyInput`](ProjectUncheckedUpdateManyInput.md)\>

Defined in: backend/src/generated/prisma/index.d.ts:3180

The data used to update Projects.

***

### limit?

> `optional` **limit**: `number`

Defined in: backend/src/generated/prisma/index.d.ts:3188

Limit how many Projects to update.

***

### where?

> `optional` **where**: [`ProjectWhereInput`](ProjectWhereInput.md)

Defined in: backend/src/generated/prisma/index.d.ts:3184

Filter which Projects to update
