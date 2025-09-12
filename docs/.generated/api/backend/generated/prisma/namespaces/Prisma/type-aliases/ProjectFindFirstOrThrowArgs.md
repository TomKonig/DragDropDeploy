[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / ProjectFindFirstOrThrowArgs

# Type Alias: ProjectFindFirstOrThrowArgs\<ExtArgs\>

> **ProjectFindFirstOrThrowArgs**\<`ExtArgs`\> = `object`

Defined in: backend/src/generated/prisma/index.d.ts:2995

Project findFirstOrThrow

## Type Parameters

### ExtArgs

`ExtArgs` *extends* [`InternalArgs`](../../../runtime/library/type-aliases/InternalArgs.md) = [`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)

## Properties

### cursor?

> `optional` **cursor**: [`ProjectWhereUniqueInput`](ProjectWhereUniqueInput.md)

Defined in: backend/src/generated/prisma/index.d.ts:3023

[Cursor Docs](https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination)

Sets the position for searching for Projects.

***

### distinct?

> `optional` **distinct**: [`ProjectScalarFieldEnum`](ProjectScalarFieldEnum.md) \| [`ProjectScalarFieldEnum`](ProjectScalarFieldEnum.md)[]

Defined in: backend/src/generated/prisma/index.d.ts:3041

[Distinct Docs](https://www.prisma.io/docs/concepts/components/prisma-client/distinct)

Filter by unique combinations of Projects.

***

### include?

> `optional` **include**: [`ProjectInclude`](ProjectInclude.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:3007

Choose, which related nodes to fetch as well

***

### omit?

> `optional` **omit**: [`ProjectOmit`](ProjectOmit.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:3003

Omit specific fields from the Project

***

### orderBy?

> `optional` **orderBy**: [`ProjectOrderByWithRelationInput`](ProjectOrderByWithRelationInput.md) \| [`ProjectOrderByWithRelationInput`](ProjectOrderByWithRelationInput.md)[]

Defined in: backend/src/generated/prisma/index.d.ts:3017

[Sorting Docs](https://www.prisma.io/docs/concepts/components/prisma-client/sorting)

Determine the order of Projects to fetch.

***

### select?

> `optional` **select**: [`ProjectSelect`](ProjectSelect.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:2999

Select specific fields to fetch from the Project

***

### skip?

> `optional` **skip**: `number`

Defined in: backend/src/generated/prisma/index.d.ts:3035

[Pagination Docs](https://www.prisma.io/docs/concepts/components/prisma-client/pagination)

Skip the first `n` Projects.

***

### take?

> `optional` **take**: `number`

Defined in: backend/src/generated/prisma/index.d.ts:3029

[Pagination Docs](https://www.prisma.io/docs/concepts/components/prisma-client/pagination)

Take `±n` Projects from the position of the cursor.

***

### where?

> `optional` **where**: [`ProjectWhereInput`](ProjectWhereInput.md)

Defined in: backend/src/generated/prisma/index.d.ts:3011

Filter, which Project to fetch.
