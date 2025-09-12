[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / $ProjectPayload

# Type Alias: $ProjectPayload\<ExtArgs\>

> **$ProjectPayload**\<`ExtArgs`\> = `object`

Defined in: backend/src/generated/prisma/index.d.ts:2450

## Type Parameters

### ExtArgs

`ExtArgs` *extends* [`InternalArgs`](../../../runtime/library/type-aliases/InternalArgs.md) = [`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)

## Properties

### composites

> **composites**: `object`

Defined in: backend/src/generated/prisma/index.d.ts:2463

***

### name

> **name**: `"Project"`

Defined in: backend/src/generated/prisma/index.d.ts:2451

***

### objects

> **objects**: `object`

Defined in: backend/src/generated/prisma/index.d.ts:2452

#### deployments

> **deployments**: [`$DeploymentPayload`]($DeploymentPayload.md)\<`ExtArgs`\>[]

#### owner

> **owner**: [`$UserPayload`]($UserPayload.md)\<`ExtArgs`\>

***

### scalars

> **scalars**: [`GetPayloadResult`](../../../runtime/library/type-aliases/GetPayloadResult.md)\<\{ `createdAt`: `Date`; `id`: `string`; `name`: `string`; `ownerId`: `string`; `updatedAt`: `Date`; \}, `ExtArgs`\[`"result"`\]\[`"project"`\]\>

Defined in: backend/src/generated/prisma/index.d.ts:2456
