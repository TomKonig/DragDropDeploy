[**@dragdropdeploy/backend**](../../../README.md)

***

[@dragdropdeploy/backend](../../../README.md) / [deployments/deployments.service](../README.md) / DeploymentsService

# Class: DeploymentsService

Defined in: [backend/src/deployments/deployments.service.ts:9](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/deployments/deployments.service.ts#L9)

## Constructors

### Constructor

> **new DeploymentsService**(`prisma`): `DeploymentsService`

Defined in: [backend/src/deployments/deployments.service.ts:10](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/deployments/deployments.service.ts#L10)

#### Parameters

##### prisma

[`PrismaService`](../../../prisma/prisma.service/classes/PrismaService.md)

#### Returns

`DeploymentsService`

## Methods

### activateDeployment()

> **activateDeployment**(`deploymentId`): `Promise`\<\{ `activePath`: `string`; `id`: `string`; \}\>

Defined in: [backend/src/deployments/deployments.service.ts:78](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/deployments/deployments.service.ts#L78)

Activate a deployment after successful build. Marks previous ACTIVE deployments INACTIVE (same project) and updates symlink.

#### Parameters

##### deploymentId

`string`

#### Returns

`Promise`\<\{ `activePath`: `string`; `id`: `string`; \}\>

***

### createPending()

> **createPending**(`projectId`): `Promise`\<\{ `artifactPath`: `null` \| `string`; `buildJobId`: `null` \| `string`; `buildLogsUrl`: `null` \| `string`; `commitHash`: `null` \| `string`; `createdAt`: `Date`; `id`: `string`; `imageTag`: `null` \| `string`; `projectId`: `string`; `status`: `DeployStatus`; `userId`: `null` \| `string`; \}\>

Defined in: [backend/src/deployments/deployments.service.ts:12](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/deployments/deployments.service.ts#L12)

#### Parameters

##### projectId

`string`

#### Returns

`Promise`\<\{ `artifactPath`: `null` \| `string`; `buildJobId`: `null` \| `string`; `buildLogsUrl`: `null` \| `string`; `commitHash`: `null` \| `string`; `createdAt`: `Date`; `id`: `string`; `imageTag`: `null` \| `string`; `projectId`: `string`; `status`: `DeployStatus`; `userId`: `null` \| `string`; \}\>

***

### createWithArtifact()

> **createWithArtifact**(`projectId`, `stagedPath`): `Promise`\<\{ `artifactPath`: `null` \| `string`; `buildJobId`: `null` \| `string`; `buildLogsUrl`: `null` \| `string`; `commitHash`: `null` \| `string`; `createdAt`: `Date`; `id`: `string`; `imageTag`: `null` \| `string`; `projectId`: `string`; `status`: `DeployStatus`; `userId`: `null` \| `string`; \}\>

Defined in: [backend/src/deployments/deployments.service.ts:24](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/deployments/deployments.service.ts#L24)

Persist a staged (temp) directory produced by the upload extraction into the artifacts root
and create a pending deployment that references it.

#### Parameters

##### projectId

`string`

##### stagedPath

`string`

#### Returns

`Promise`\<\{ `artifactPath`: `null` \| `string`; `buildJobId`: `null` \| `string`; `buildLogsUrl`: `null` \| `string`; `commitHash`: `null` \| `string`; `createdAt`: `Date`; `id`: `string`; `imageTag`: `null` \| `string`; `projectId`: `string`; `status`: `DeployStatus`; `userId`: `null` \| `string`; \}\>

***

### getActiveArtifactPath()

> **getActiveArtifactPath**(`projectId`): `Promise`\<`null` \| `string`\>

Defined in: [backend/src/deployments/deployments.service.ts:104](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/deployments/deployments.service.ts#L104)

#### Parameters

##### projectId

`string`

#### Returns

`Promise`\<`null` \| `string`\>

***

### rollback()

> **rollback**(`projectId`, `targetDeploymentId?`): `Promise`\<\{ `activePath`: `string`; `id`: `string`; \}\>

Defined in: [backend/src/deployments/deployments.service.ts:116](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/deployments/deployments.service.ts#L116)

#### Parameters

##### projectId

`string`

##### targetDeploymentId?

`string`

#### Returns

`Promise`\<\{ `activePath`: `string`; `id`: `string`; \}\>
