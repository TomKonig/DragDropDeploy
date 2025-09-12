[**@dragdropdeploy/backend**](../../../README.md)

***

[@dragdropdeploy/backend](../../../README.md) / [build/build.controller](../README.md) / BuildController

# Class: BuildController

Defined in: [backend/src/build/build.controller.ts:5](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/build/build.controller.ts#L5)

## Constructors

### Constructor

> **new BuildController**(`buildQueue`): `BuildController`

Defined in: [backend/src/build/build.controller.ts:6](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/build/build.controller.ts#L6)

#### Parameters

##### buildQueue

[`BuildQueueService`](../../build.queue/classes/BuildQueueService.md)

#### Returns

`BuildController`

## Methods

### create()

> **create**(`projectId`): `Promise`\<\{ `id`: `any`; `projectId`: `any`; `queued`: `boolean`; `status`: `any`; \}\>

Defined in: [backend/src/build/build.controller.ts:9](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/build/build.controller.ts#L9)

#### Parameters

##### projectId

`string`

#### Returns

`Promise`\<\{ `id`: `any`; `projectId`: `any`; `queued`: `boolean`; `status`: `any`; \}\>

***

### getLogs()

> **getLogs**(`id`, `tail?`): `Promise`\<\{ `id`: `string`; `logs`: `string`; \}\>

Defined in: [backend/src/build/build.controller.ts:34](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/build/build.controller.ts#L34)

#### Parameters

##### id

`string`

##### tail?

`string`

#### Returns

`Promise`\<\{ `id`: `string`; `logs`: `string`; \}\>

***

### getOne()

> **getOne**(`id`): `Promise`\<\{ `artifactPath`: `null` \| `string`; `createdAt`: `Date`; `id`: `string`; `logsPath`: `null` \| `string`; `projectId`: `string`; `status`: `BuildJobStatus`; `updatedAt`: `Date`; `version`: `null` \| `number`; \}\>

Defined in: [backend/src/build/build.controller.ts:16](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/build/build.controller.ts#L16)

#### Parameters

##### id

`string`

#### Returns

`Promise`\<\{ `artifactPath`: `null` \| `string`; `createdAt`: `Date`; `id`: `string`; `logsPath`: `null` \| `string`; `projectId`: `string`; `status`: `BuildJobStatus`; `updatedAt`: `Date`; `version`: `null` \| `number`; \}\>

***

### listForProject()

> **listForProject**(`projectId`, `limit`): `Promise`\<`object`[]\>

Defined in: [backend/src/build/build.controller.ts:24](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/build/build.controller.ts#L24)

#### Parameters

##### projectId

`string`

##### limit

`string` = `'20'`

#### Returns

`Promise`\<`object`[]\>
