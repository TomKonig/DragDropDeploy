[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / $UserPayload

# Type Alias: $UserPayload\<ExtArgs\>

> **$UserPayload**\<`ExtArgs`\> = `object`

Defined in: backend/src/generated/prisma/index.d.ts:1344

## Type Parameters

### ExtArgs

`ExtArgs` *extends* [`InternalArgs`](../../../runtime/library/type-aliases/InternalArgs.md) = [`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)

## Properties

### composites

> **composites**: `object`

Defined in: backend/src/generated/prisma/index.d.ts:1358

***

### name

> **name**: `"User"`

Defined in: backend/src/generated/prisma/index.d.ts:1345

***

### objects

> **objects**: `object`

Defined in: backend/src/generated/prisma/index.d.ts:1346

#### deployments

> **deployments**: [`$DeploymentPayload`]($DeploymentPayload.md)\<`ExtArgs`\>[]

#### projects

> **projects**: [`$ProjectPayload`]($ProjectPayload.md)\<`ExtArgs`\>[]

***

### scalars

> **scalars**: [`GetPayloadResult`](../../../runtime/library/type-aliases/GetPayloadResult.md)\<\{ `createdAt`: `Date`; `displayName`: `string` \| `null`; `email`: `string`; `id`: `string`; `isOperator`: `boolean`; `updatedAt`: `Date`; \}, `ExtArgs`\[`"result"`\]\[`"user"`\]\>

Defined in: backend/src/generated/prisma/index.d.ts:1350
