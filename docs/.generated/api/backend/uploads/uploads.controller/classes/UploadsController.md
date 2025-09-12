[**@dragdropdeploy/backend**](../../../README.md)

***

[@dragdropdeploy/backend](../../../README.md) / [uploads/uploads.controller](../README.md) / UploadsController

# Class: UploadsController

Defined in: [backend/src/uploads/uploads.controller.ts:7](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/uploads/uploads.controller.ts#L7)

## Constructors

### Constructor

> **new UploadsController**(`projects`, `prisma`): `UploadsController`

Defined in: [backend/src/uploads/uploads.controller.ts:8](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/uploads/uploads.controller.ts#L8)

#### Parameters

##### projects

[`ProjectsService`](../../../projects/projects.service/classes/ProjectsService.md)

##### prisma

[`PrismaService`](../../../prisma/prisma.service/classes/PrismaService.md)

#### Returns

`UploadsController`

## Methods

### upload()

> **upload**(`req`, `id`, `file?`): `Promise`\<\{ `deploymentId`: `string`; `mimeType`: `any`; `originalName`: `any`; `projectId`: `string`; `size`: `any`; `status`: `DeployStatus`; \}\>

Defined in: [backend/src/uploads/uploads.controller.ts:12](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/uploads/uploads.controller.ts#L12)

#### Parameters

##### req

`any`

##### id

`string`

##### file?

`any`

#### Returns

`Promise`\<\{ `deploymentId`: `string`; `mimeType`: `any`; `originalName`: `any`; `projectId`: `string`; `size`: `any`; `status`: `DeployStatus`; \}\>
