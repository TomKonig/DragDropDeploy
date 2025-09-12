[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / ProjectUpsertArgs

# Type Alias: ProjectUpsertArgs\<ExtArgs\>

> **ProjectUpsertArgs**\<`ExtArgs`\> = `object`

Defined in: backend/src/generated/prisma/index.d.ts:3224

Project upsert

## Type Parameters

### ExtArgs

`ExtArgs` *extends* [`InternalArgs`](../../../runtime/library/type-aliases/InternalArgs.md) = [`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)

## Properties

### create

> **create**: [`XOR`](XOR.md)\<[`ProjectCreateInput`](ProjectCreateInput.md), [`ProjectUncheckedCreateInput`](ProjectUncheckedCreateInput.md)\>

Defined in: backend/src/generated/prisma/index.d.ts:3244

In case the Project found by the `where` argument doesn't exist, create a new Project with this data.

***

### include?

> `optional` **include**: [`ProjectInclude`](ProjectInclude.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:3236

Choose, which related nodes to fetch as well

***

### omit?

> `optional` **omit**: [`ProjectOmit`](ProjectOmit.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:3232

Omit specific fields from the Project

***

### select?

> `optional` **select**: [`ProjectSelect`](ProjectSelect.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:3228

Select specific fields to fetch from the Project

***

### update

> **update**: [`XOR`](XOR.md)\<[`ProjectUpdateInput`](ProjectUpdateInput.md), [`ProjectUncheckedUpdateInput`](ProjectUncheckedUpdateInput.md)\>

Defined in: backend/src/generated/prisma/index.d.ts:3248

In case the Project was found with the provided `where` argument, update it with this data.

***

### where

> **where**: [`ProjectWhereUniqueInput`](ProjectWhereUniqueInput.md)

Defined in: backend/src/generated/prisma/index.d.ts:3240

The filter to search for the Project to update in case it exists.
