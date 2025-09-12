[**@dragdropdeploy/backend**](../../../README.md)

***

[@dragdropdeploy/backend](../../../README.md) / [build/build.queue](../README.md) / BuildQueueService

# Class: BuildQueueService

Defined in: [backend/src/build/build.queue.ts:12](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/build/build.queue.ts#L12)

## Implements

- `OnModuleDestroy`
- `OnModuleInit`

## Constructors

### Constructor

> **new BuildQueueService**(`prisma`, `executor`, `deployments`): `BuildQueueService`

Defined in: [backend/src/build/build.queue.ts:21](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/build/build.queue.ts#L21)

#### Parameters

##### prisma

[`PrismaService`](../../../prisma/prisma.service/classes/PrismaService.md)

##### executor

[`BuildExecutorService`](../../build.executor/classes/BuildExecutorService.md)

##### deployments

[`DeploymentsService`](../../../deployments/deployments.service/classes/DeploymentsService.md)

#### Returns

`BuildQueueService`

## Methods

### enqueue()

> **enqueue**(`projectId`): `Promise`\<`any`\>

Defined in: [backend/src/build/build.queue.ts:105](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/build/build.queue.ts#L105)

Enqueue a build. Without Redis yet, simulate PENDING -> RUNNING -> SUCCESS.

#### Parameters

##### projectId

`string`

#### Returns

`Promise`\<`any`\>

***

### getJob()

> **getJob**(`id`): `Promise`\<`null` \| \{ `artifactPath`: `null` \| `string`; `createdAt`: `Date`; `id`: `string`; `logsPath`: `null` \| `string`; `projectId`: `string`; `status`: `BuildJobStatus`; `updatedAt`: `Date`; `version`: `null` \| `number`; \}\>

Defined in: [backend/src/build/build.queue.ts:176](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/build/build.queue.ts#L176)

#### Parameters

##### id

`string`

#### Returns

`Promise`\<`null` \| \{ `artifactPath`: `null` \| `string`; `createdAt`: `Date`; `id`: `string`; `logsPath`: `null` \| `string`; `projectId`: `string`; `status`: `BuildJobStatus`; `updatedAt`: `Date`; `version`: `null` \| `number`; \}\>

***

### getLogs()

> **getLogs**(`buildId`, `tail?`): `Promise`\<`string`\>

Defined in: [backend/src/build/build.queue.ts:188](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/build/build.queue.ts#L188)

#### Parameters

##### buildId

`string`

##### tail?

`number`

#### Returns

`Promise`\<`string`\>

***

### listProjectBuilds()

> **listProjectBuilds**(`projectId`, `limit`): `Promise`\<`object`[]\>

Defined in: [backend/src/build/build.queue.ts:180](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/build/build.queue.ts#L180)

#### Parameters

##### projectId

`string`

##### limit

`number`

#### Returns

`Promise`\<`object`[]\>

***

### onModuleDestroy()

> **onModuleDestroy**(): `Promise`\<`void`\>

Defined in: [backend/src/build/build.queue.ts:225](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/build/build.queue.ts#L225)

#### Returns

`Promise`\<`void`\>

#### Implementation of

`OnModuleDestroy.onModuleDestroy`

***

### onModuleInit()

> **onModuleInit**(): `Promise`\<`void`\>

Defined in: [backend/src/build/build.queue.ts:29](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/build/build.queue.ts#L29)

#### Returns

`Promise`\<`void`\>

#### Implementation of

`OnModuleInit.onModuleInit`
