[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / ProjectUpdateArgs

# Type Alias: ProjectUpdateArgs\<ExtArgs\>

> **ProjectUpdateArgs**\<`ExtArgs`\> = `object`

Defined in: backend/src/generated/prisma/index.d.ts:3150

Project update

## Type Parameters

### ExtArgs

`ExtArgs` *extends* [`InternalArgs`](../../../runtime/library/type-aliases/InternalArgs.md) = [`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)

## Properties

### data

> **data**: [`XOR`](XOR.md)\<[`ProjectUpdateInput`](ProjectUpdateInput.md), [`ProjectUncheckedUpdateInput`](ProjectUncheckedUpdateInput.md)\>

Defined in: backend/src/generated/prisma/index.d.ts:3166

The data needed to update a Project.

***

### include?

> `optional` **include**: [`ProjectInclude`](ProjectInclude.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:3162

Choose, which related nodes to fetch as well

***

### omit?

> `optional` **omit**: [`ProjectOmit`](ProjectOmit.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:3158

Omit specific fields from the Project

***

### select?

> `optional` **select**: [`ProjectSelect`](ProjectSelect.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:3154

Select specific fields to fetch from the Project

***

### where

> **where**: [`ProjectWhereUniqueInput`](ProjectWhereUniqueInput.md)

Defined in: backend/src/generated/prisma/index.d.ts:3170

Choose, which Project to update.
