[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / $DeploymentPayload

# Type Alias: $DeploymentPayload\<ExtArgs\>

> **$DeploymentPayload**\<`ExtArgs`\> = `object`

Defined in: backend/src/generated/prisma/index.d.ts:3573

## Type Parameters

### ExtArgs

`ExtArgs` *extends* [`InternalArgs`](../../../runtime/library/type-aliases/InternalArgs.md) = [`DefaultArgs`](../../../runtime/library/type-aliases/DefaultArgs.md)

## Properties

### composites

> **composites**: `object`

Defined in: backend/src/generated/prisma/index.d.ts:3589

***

### name

> **name**: `"Deployment"`

Defined in: backend/src/generated/prisma/index.d.ts:3574

***

### objects

> **objects**: `object`

Defined in: backend/src/generated/prisma/index.d.ts:3575

#### project

> **project**: [`$ProjectPayload`]($ProjectPayload.md)\<`ExtArgs`\>

#### user

> **user**: [`$UserPayload`]($UserPayload.md)\<`ExtArgs`\> \| `null`

***

### scalars

> **scalars**: [`GetPayloadResult`](../../../runtime/library/type-aliases/GetPayloadResult.md)\<\{ `buildLogsUrl`: `string` \| `null`; `commitHash`: `string` \| `null`; `createdAt`: `Date`; `id`: `string`; `imageTag`: `string` \| `null`; `projectId`: `string`; `status`: [`DeployStatus`](../../$Enums/type-aliases/DeployStatus.md); `userId`: `string` \| `null`; \}, `ExtArgs`\[`"result"`\]\[`"deployment"`\]\>

Defined in: backend/src/generated/prisma/index.d.ts:3579
