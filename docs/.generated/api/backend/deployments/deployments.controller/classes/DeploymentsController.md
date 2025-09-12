[**@dragdropdeploy/backend**](../../../README.md)

***

[@dragdropdeploy/backend](../../../README.md) / [deployments/deployments.controller](../README.md) / DeploymentsController

# Class: DeploymentsController

Defined in: [backend/src/deployments/deployments.controller.ts:19](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/deployments/deployments.controller.ts#L19)

## Constructors

### Constructor

> **new DeploymentsController**(`extraction`, `deployments`): `DeploymentsController`

Defined in: [backend/src/deployments/deployments.controller.ts:20](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/deployments/deployments.controller.ts#L20)

#### Parameters

##### extraction

[`UploadExtractionService`](../../upload-extraction.service/classes/UploadExtractionService.md)

##### deployments

[`DeploymentsService`](../../deployments.service/classes/DeploymentsService.md)

#### Returns

`DeploymentsController`

## Methods

### activate()

> **activate**(`id`): `Promise`\<\{ `activePath`: `string`; `deploymentId`: `string`; \}\>

Defined in: [backend/src/deployments/deployments.controller.ts:41](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/deployments/deployments.controller.ts#L41)

#### Parameters

##### id

`string`

#### Returns

`Promise`\<\{ `activePath`: `string`; `deploymentId`: `string`; \}\>

***

### rollback()

> **rollback**(`projectId`, `targetDeploymentId?`): `Promise`\<\{ `activePath`: `string`; `deploymentId`: `string`; \}\>

Defined in: [backend/src/deployments/deployments.controller.ts:75](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/deployments/deployments.controller.ts#L75)

#### Parameters

##### projectId

`string`

##### targetDeploymentId?

`string`

#### Returns

`Promise`\<\{ `activePath`: `string`; `deploymentId`: `string`; \}\>

***

### serve()

> **serve**(`projectId`, `res`): `Promise`\<`void` \| `Response`\<`any`, `Record`\<`string`, `any`\>\>\>

Defined in: [backend/src/deployments/deployments.controller.ts:48](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/deployments/deployments.controller.ts#L48)

#### Parameters

##### projectId

`string`

##### res

`Response`

#### Returns

`Promise`\<`void` \| `Response`\<`any`, `Record`\<`string`, `any`\>\>\>

***

### uploadArchive()

> **uploadArchive**(`file`, `projectId`): `Promise`\<`UploadResponse`\>

Defined in: [backend/src/deployments/deployments.controller.ts:25](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/deployments/deployments.controller.ts#L25)

#### Parameters

##### file

`File`

##### projectId

`string`

#### Returns

`Promise`\<`UploadResponse`\>
