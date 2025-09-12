[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / ProjectUpdateManyAndReturnArgs

# Type Alias: ProjectUpdateManyAndReturnArgs\<ExtArgs\>

> **ProjectUpdateManyAndReturnArgs**\<`ExtArgs`\> = `object`

Defined in: backend/src/generated/prisma/index.d.ts:3194

Project updateManyAndReturn

## Type Parameters

### ExtArgs

`ExtArgs` *extends* [`InternalArgs`](../../../runtime/library/type-aliases/InternalArgs.md) = [`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)

## Properties

### data

> **data**: [`XOR`](XOR.md)\<[`ProjectUpdateManyMutationInput`](ProjectUpdateManyMutationInput.md), [`ProjectUncheckedUpdateManyInput`](ProjectUncheckedUpdateManyInput.md)\>

Defined in: backend/src/generated/prisma/index.d.ts:3206

The data used to update Projects.

***

### include?

> `optional` **include**: [`ProjectIncludeUpdateManyAndReturn`](ProjectIncludeUpdateManyAndReturn.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:3218

Choose, which related nodes to fetch as well

***

### limit?

> `optional` **limit**: `number`

Defined in: backend/src/generated/prisma/index.d.ts:3214

Limit how many Projects to update.

***

### omit?

> `optional` **omit**: [`ProjectOmit`](ProjectOmit.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:3202

Omit specific fields from the Project

***

### select?

> `optional` **select**: [`ProjectSelectUpdateManyAndReturn`](ProjectSelectUpdateManyAndReturn.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:3198

Select specific fields to fetch from the Project

***

### where?

> `optional` **where**: [`ProjectWhereInput`](ProjectWhereInput.md)

Defined in: backend/src/generated/prisma/index.d.ts:3210

Filter which Projects to update
