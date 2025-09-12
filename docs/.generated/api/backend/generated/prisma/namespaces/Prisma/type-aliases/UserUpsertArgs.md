[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / UserUpsertArgs

# Type Alias: UserUpsertArgs\<ExtArgs\>

> **UserUpsertArgs**\<`ExtArgs`\> = `object`

Defined in: backend/src/generated/prisma/index.d.ts:2112

User upsert

## Type Parameters

### ExtArgs

`ExtArgs` *extends* [`InternalArgs`](../../../runtime/library/type-aliases/InternalArgs.md) = [`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)

## Properties

### create

> **create**: [`XOR`](XOR.md)\<[`UserCreateInput`](UserCreateInput.md), [`UserUncheckedCreateInput`](UserUncheckedCreateInput.md)\>

Defined in: backend/src/generated/prisma/index.d.ts:2132

In case the User found by the `where` argument doesn't exist, create a new User with this data.

***

### include?

> `optional` **include**: [`UserInclude`](UserInclude.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:2124

Choose, which related nodes to fetch as well

***

### omit?

> `optional` **omit**: [`UserOmit`](UserOmit.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:2120

Omit specific fields from the User

***

### select?

> `optional` **select**: [`UserSelect`](UserSelect.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:2116

Select specific fields to fetch from the User

***

### update

> **update**: [`XOR`](XOR.md)\<[`UserUpdateInput`](UserUpdateInput.md), [`UserUncheckedUpdateInput`](UserUncheckedUpdateInput.md)\>

Defined in: backend/src/generated/prisma/index.d.ts:2136

In case the User was found with the provided `where` argument, update it with this data.

***

### where

> **where**: [`UserWhereUniqueInput`](UserWhereUniqueInput.md)

Defined in: backend/src/generated/prisma/index.d.ts:2128

The filter to search for the User to update in case it exists.
