[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / UserCreateArgs

# Type Alias: UserCreateArgs\<ExtArgs\>

> **UserCreateArgs**\<`ExtArgs`\> = `object`

Defined in: backend/src/generated/prisma/index.d.ts:1990

User create

## Type Parameters

### ExtArgs

`ExtArgs` *extends* [`InternalArgs`](../../../runtime/library/type-aliases/InternalArgs.md) = [`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)

## Properties

### data

> **data**: [`XOR`](XOR.md)\<[`UserCreateInput`](UserCreateInput.md), [`UserUncheckedCreateInput`](UserUncheckedCreateInput.md)\>

Defined in: backend/src/generated/prisma/index.d.ts:2006

The data needed to create a User.

***

### include?

> `optional` **include**: [`UserInclude`](UserInclude.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:2002

Choose, which related nodes to fetch as well

***

### omit?

> `optional` **omit**: [`UserOmit`](UserOmit.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:1998

Omit specific fields from the User

***

### select?

> `optional` **select**: [`UserSelect`](UserSelect.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:1994

Select specific fields to fetch from the User
