[**@dragdropdeploy/backend**](../../../README.md)

***

[@dragdropdeploy/backend](../../../README.md) / [status/status.controller](../README.md) / StatusController

# Class: StatusController

Defined in: [backend/src/status/status.controller.ts:6](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/status/status.controller.ts#L6)

## Constructors

### Constructor

> **new StatusController**(`prisma`): `StatusController`

Defined in: [backend/src/status/status.controller.ts:7](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/status/status.controller.ts#L7)

#### Parameters

##### prisma

[`PrismaService`](../../../prisma/prisma.service/classes/PrismaService.md)

#### Returns

`StatusController`

## Methods

### status()

> **status**(): `Promise`\<\{ `dbOk`: `boolean`; `node`: `string`; `service`: `string`; `timestamp`: `string`; `version`: `string`; \}\>

Defined in: [backend/src/status/status.controller.ts:11](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/status/status.controller.ts#L11)

#### Returns

`Promise`\<\{ `dbOk`: `boolean`; `node`: `string`; `service`: `string`; `timestamp`: `string`; `version`: `string`; \}\>
