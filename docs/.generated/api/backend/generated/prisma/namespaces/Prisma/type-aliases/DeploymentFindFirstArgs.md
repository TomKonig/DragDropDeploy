[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / DeploymentFindFirstArgs

# Type Alias: DeploymentFindFirstArgs\<ExtArgs\>

> **DeploymentFindFirstArgs**\<`ExtArgs`\> = `object`

Defined in: backend/src/generated/prisma/index.d.ts:4072

Deployment findFirst

## Type Parameters

### ExtArgs

`ExtArgs` *extends* [`InternalArgs`](../../../runtime/library/type-aliases/InternalArgs.md) = [`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)

## Properties

### cursor?

> `optional` **cursor**: [`DeploymentWhereUniqueInput`](DeploymentWhereUniqueInput.md)

Defined in: backend/src/generated/prisma/index.d.ts:4100

[Cursor Docs](https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination)

Sets the position for searching for Deployments.

***

### distinct?

> `optional` **distinct**: [`DeploymentScalarFieldEnum`](DeploymentScalarFieldEnum.md) \| [`DeploymentScalarFieldEnum`](DeploymentScalarFieldEnum.md)[]

Defined in: backend/src/generated/prisma/index.d.ts:4118

[Distinct Docs](https://www.prisma.io/docs/concepts/components/prisma-client/distinct)

Filter by unique combinations of Deployments.

***

### include?

> `optional` **include**: [`DeploymentInclude`](DeploymentInclude.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:4084

Choose, which related nodes to fetch as well

***

### omit?

> `optional` **omit**: [`DeploymentOmit`](DeploymentOmit.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:4080

Omit specific fields from the Deployment

***

### orderBy?

> `optional` **orderBy**: [`DeploymentOrderByWithRelationInput`](DeploymentOrderByWithRelationInput.md) \| [`DeploymentOrderByWithRelationInput`](DeploymentOrderByWithRelationInput.md)[]

Defined in: backend/src/generated/prisma/index.d.ts:4094

[Sorting Docs](https://www.prisma.io/docs/concepts/components/prisma-client/sorting)

Determine the order of Deployments to fetch.

***

### select?

> `optional` **select**: [`DeploymentSelect`](DeploymentSelect.md)\<`ExtArgs`\> \| `null`

Defined in: backend/src/generated/prisma/index.d.ts:4076

Select specific fields to fetch from the Deployment

***

### skip?

> `optional` **skip**: `number`

Defined in: backend/src/generated/prisma/index.d.ts:4112

[Pagination Docs](https://www.prisma.io/docs/concepts/components/prisma-client/pagination)

Skip the first `n` Deployments.

***

### take?

> `optional` **take**: `number`

Defined in: backend/src/generated/prisma/index.d.ts:4106

[Pagination Docs](https://www.prisma.io/docs/concepts/components/prisma-client/pagination)

Take `±n` Deployments from the position of the cursor.

***

### where?

> `optional` **where**: [`DeploymentWhereInput`](DeploymentWhereInput.md)

Defined in: backend/src/generated/prisma/index.d.ts:4088

Filter, which Deployment to fetch.
