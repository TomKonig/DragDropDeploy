[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / ProjectFindFirstArgs

# Type Alias: ProjectFindFirstArgs\<ExtArgs\>

> **ProjectFindFirstArgs**\<`ExtArgs`\> = `object`

Defined in: backend/src/generated/prisma/index.d.ts:2943

Project findFirst

## Type Parameters

### ExtArgs

`ExtArgs` *extends* [`InternalArgs`](../../../runtime/library/type-aliases/InternalArgs.md) = [`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)

## Properties

### cursor?

> `optional` **cursor**: [`ProjectWhereUniqueInput`](ProjectWhereUniqueInput.md)

Defined in: backend/src/generated/prisma/index.d.ts:2971

[Cursor Docs](https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination)

Sets the position for searching for Projects.

***

### distinct?

> `optional` **distinct**: [`ProjectScalarFieldEnum`](ProjectScalarFieldEnum.md) \| [`ProjectScalarFieldEnum`](ProjectScalarFieldEnum.md)[]

Defined in: backend/src/generated/prisma/index.d.ts:2989

[Distinct Docs](https://www.prisma.io/docs/concepts/components/prisma-client/distinct)

Filter by unique combinations of Projects.

***

### include?

> `optional` **include**: [`ProjectInclude`](ProjectInclude.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:2955

Choose, which related nodes to fetch as well

***

### omit?

> `optional` **omit**: [`ProjectOmit`](ProjectOmit.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:2951

Omit specific fields from the Project

***

### orderBy?

> `optional` **orderBy**: [`ProjectOrderByWithRelationInput`](ProjectOrderByWithRelationInput.md) \| [`ProjectOrderByWithRelationInput`](ProjectOrderByWithRelationInput.md)[]

Defined in: backend/src/generated/prisma/index.d.ts:2965

[Sorting Docs](https://www.prisma.io/docs/concepts/components/prisma-client/sorting)

Determine the order of Projects to fetch.

***

### select?

> `optional` **select**: [`ProjectSelect`](ProjectSelect.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:2947

Select specific fields to fetch from the Project

***

### skip?

> `optional` **skip**: `number`

Defined in: backend/src/generated/prisma/index.d.ts:2983

[Pagination Docs](https://www.prisma.io/docs/concepts/components/prisma-client/pagination)

Skip the first `n` Projects.

***

### take?

> `optional` **take**: `number`

Defined in: backend/src/generated/prisma/index.d.ts:2977

[Pagination Docs](https://www.prisma.io/docs/concepts/components/prisma-client/pagination)

Take `±n` Projects from the position of the cursor.

***

### where?

> `optional` **where**: [`ProjectWhereInput`](ProjectWhereInput.md)

Defined in: backend/src/generated/prisma/index.d.ts:2959

Filter, which Project to fetch.
