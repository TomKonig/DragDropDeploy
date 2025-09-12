[**@dragdropdeploy/backend**](../../../README.md)

***

[@dragdropdeploy/backend](../../../README.md) / [minify/minify.service](../README.md) / MinifyService

# Class: MinifyService

Defined in: [backend/src/minify/minify.service.ts:27](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/minify/minify.service.ts#L27)

## Constructors

### Constructor

> **new MinifyService**(`prisma`): `MinifyService`

Defined in: [backend/src/minify/minify.service.ts:30](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/minify/minify.service.ts#L30)

#### Parameters

##### prisma

[`PrismaService`](../../../prisma/prisma.service/classes/PrismaService.md)

#### Returns

`MinifyService`

## Methods

### maybeMinifyProject()

> **maybeMinifyProject**(`projectId`, `log`): `Promise`\<`void`\>

Defined in: [backend/src/minify/minify.service.ts:32](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/minify/minify.service.ts#L32)

#### Parameters

##### projectId

`string`

##### log

(`line`) => `void`

#### Returns

`Promise`\<`void`\>
