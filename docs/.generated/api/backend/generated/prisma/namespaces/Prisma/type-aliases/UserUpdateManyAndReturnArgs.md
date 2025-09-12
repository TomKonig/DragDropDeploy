[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / UserUpdateManyAndReturnArgs

# Type Alias: UserUpdateManyAndReturnArgs\<ExtArgs\>

> **UserUpdateManyAndReturnArgs**\<`ExtArgs`\> = `object`

Defined in: backend/src/generated/prisma/index.d.ts:2086

User updateManyAndReturn

## Type Parameters

### ExtArgs

`ExtArgs` *extends* [`InternalArgs`](../../../runtime/library/type-aliases/InternalArgs.md) = [`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)

## Properties

### data

> **data**: [`XOR`](XOR.md)\<[`UserUpdateManyMutationInput`](UserUpdateManyMutationInput.md), [`UserUncheckedUpdateManyInput`](UserUncheckedUpdateManyInput.md)\>

Defined in: backend/src/generated/prisma/index.d.ts:2098

The data used to update Users.

***

### limit?

> `optional` **limit**: `number`

Defined in: backend/src/generated/prisma/index.d.ts:2106

Limit how many Users to update.

***

### omit?

> `optional` **omit**: [`UserOmit`](UserOmit.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:2094

Omit specific fields from the User

***

### select?

> `optional` **select**: [`UserSelectUpdateManyAndReturn`](UserSelectUpdateManyAndReturn.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:2090

Select specific fields to fetch from the User

***

### where?

> `optional` **where**: [`UserWhereInput`](UserWhereInput.md)

Defined in: backend/src/generated/prisma/index.d.ts:2102

Filter which Users to update
