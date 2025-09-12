[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / ProjectCreateArgs

# Type Alias: ProjectCreateArgs\<ExtArgs\>

> **ProjectCreateArgs**\<`ExtArgs`\> = `object`

Defined in: backend/src/generated/prisma/index.d.ts:3094

Project create

## Type Parameters

### ExtArgs

`ExtArgs` *extends* [`InternalArgs`](../../../runtime/library/type-aliases/InternalArgs.md) = [`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)

## Properties

### data

> **data**: [`XOR`](XOR.md)\<[`ProjectCreateInput`](ProjectCreateInput.md), [`ProjectUncheckedCreateInput`](ProjectUncheckedCreateInput.md)\>

Defined in: backend/src/generated/prisma/index.d.ts:3110

The data needed to create a Project.

***

### include?

> `optional` **include**: [`ProjectInclude`](ProjectInclude.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:3106

Choose, which related nodes to fetch as well

***

### omit?

> `optional` **omit**: [`ProjectOmit`](ProjectOmit.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:3102

Omit specific fields from the Project

***

### select?

> `optional` **select**: [`ProjectSelect`](ProjectSelect.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:3098

Select specific fields to fetch from the Project
