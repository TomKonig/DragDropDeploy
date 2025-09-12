[**@dragdropdeploy/backend**](../../../README.md)

***

[@dragdropdeploy/backend](../../../README.md) / [projects/projects.controller](../README.md) / ProjectsController

# Class: ProjectsController

Defined in: [backend/src/projects/projects.controller.ts:7](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/projects/projects.controller.ts#L7)

## Constructors

### Constructor

> **new ProjectsController**(`projects`): `ProjectsController`

Defined in: [backend/src/projects/projects.controller.ts:8](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/projects/projects.controller.ts#L8)

#### Parameters

##### projects

[`ProjectsService`](../../projects.service/classes/ProjectsService.md)

#### Returns

`ProjectsController`

## Methods

### create()

> **create**(`req`, `dto`): `Promise`\<\{ `createdAt`: `Date`; `domain`: `null` \| `string`; `id`: `string`; `name`: `string`; `ownerId`: `string`; `updatedAt`: `Date`; \}\>

Defined in: [backend/src/projects/projects.controller.ts:11](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/projects/projects.controller.ts#L11)

#### Parameters

##### req

`any`

##### dto

[`CreateProjectDto`](../../dto/create-project.dto/classes/CreateProjectDto.md)

#### Returns

`Promise`\<\{ `createdAt`: `Date`; `domain`: `null` \| `string`; `id`: `string`; `name`: `string`; `ownerId`: `string`; `updatedAt`: `Date`; \}\>

***

### delete()

> **delete**(`req`, `id`): `Promise`\<\{ `deleted`: `boolean`; \}\>

Defined in: [backend/src/projects/projects.controller.ts:31](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/projects/projects.controller.ts#L31)

#### Parameters

##### req

`any`

##### id

`string`

#### Returns

`Promise`\<\{ `deleted`: `boolean`; \}\>

***

### get()

> **get**(`req`, `id`): `Promise`\<`object` & `object`\>

Defined in: [backend/src/projects/projects.controller.ts:21](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/projects/projects.controller.ts#L21)

#### Parameters

##### req

`any`

##### id

`string`

#### Returns

`Promise`\<`object` & `object`\>

***

### list()

> **list**(`req`): `Promise`\<`object` & `object`[]\>

Defined in: [backend/src/projects/projects.controller.ts:16](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/projects/projects.controller.ts#L16)

#### Parameters

##### req

`any`

#### Returns

`Promise`\<`object` & `object`[]\>

***

### update()

> **update**(`req`, `id`, `dto`): `Promise`\<`object` & `object`\>

Defined in: [backend/src/projects/projects.controller.ts:26](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/projects/projects.controller.ts#L26)

#### Parameters

##### req

`any`

##### id

`string`

##### dto

[`UpdateProjectDto`](../../dto/update-project.dto/classes/UpdateProjectDto.md)

#### Returns

`Promise`\<`object` & `object`\>
