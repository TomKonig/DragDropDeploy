[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / UserUpdateManyArgs

# Type Alias: UserUpdateManyArgs\<ExtArgs\>

> **UserUpdateManyArgs**\<`ExtArgs`\> = `object`

Defined in: backend/src/generated/prisma/index.d.ts:2068

User updateMany

## Type Parameters

### ExtArgs

`ExtArgs` *extends* [`InternalArgs`](../../../runtime/library/type-aliases/InternalArgs.md) = [`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)

## Properties

### data

> **data**: [`XOR`](XOR.md)\<[`UserUpdateManyMutationInput`](UserUpdateManyMutationInput.md), [`UserUncheckedUpdateManyInput`](UserUncheckedUpdateManyInput.md)\>

Defined in: backend/src/generated/prisma/index.d.ts:2072

The data used to update Users.

***

### limit?

> `optional` **limit**: `number`

Defined in: backend/src/generated/prisma/index.d.ts:2080

Limit how many Users to update.

***

### where?

> `optional` **where**: [`UserWhereInput`](UserWhereInput.md)

Defined in: backend/src/generated/prisma/index.d.ts:2076

Filter which Users to update
