[**@dragdropdeploy/backend**](../../../README.md)

***

[@dragdropdeploy/backend](../../../README.md) / [projects/projects.service](../README.md) / ProjectsService

# Class: ProjectsService

Defined in: [backend/src/projects/projects.service.ts:5](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/projects/projects.service.ts#L5)

## Constructors

### Constructor

> **new ProjectsService**(`prisma`): `ProjectsService`

Defined in: [backend/src/projects/projects.service.ts:6](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/projects/projects.service.ts#L6)

#### Parameters

##### prisma

[`PrismaService`](../../../prisma/prisma.service/classes/PrismaService.md)

#### Returns

`ProjectsService`

## Methods

### create()

> **create**(`ownerId`, `name`, `domain?`): `Promise`\<\{ `createdAt`: `Date`; `domain`: `null` \| `string`; `id`: `string`; `name`: `string`; `ownerId`: `string`; `updatedAt`: `Date`; \}\>

Defined in: [backend/src/projects/projects.service.ts:8](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/projects/projects.service.ts#L8)

#### Parameters

##### ownerId

`string`

##### name

`string`

##### domain?

`string`

#### Returns

`Promise`\<\{ `createdAt`: `Date`; `domain`: `null` \| `string`; `id`: `string`; `name`: `string`; `ownerId`: `string`; `updatedAt`: `Date`; \}\>

***

### findAllForUser()

> **findAllForUser**(`userId`): `Promise`\<`object` & `object`[]\>

Defined in: [backend/src/projects/projects.service.ts:19](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/projects/projects.service.ts#L19)

#### Parameters

##### userId

`string`

#### Returns

`Promise`\<`object` & `object`[]\>

***

### findOneOwned()

> **findOneOwned**(`userId`, `id`): `Promise`\<`object` & `object`\>

Defined in: [backend/src/projects/projects.service.ts:23](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/projects/projects.service.ts#L23)

#### Parameters

##### userId

`string`

##### id

`string`

#### Returns

`Promise`\<`object` & `object`\>

***

### remove()

> **remove**(`userId`, `id`): `Promise`\<\{ `deleted`: `boolean`; \}\>

Defined in: [backend/src/projects/projects.service.ts:64](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/projects/projects.service.ts#L64)

#### Parameters

##### userId

`string`

##### id

`string`

#### Returns

`Promise`\<\{ `deleted`: `boolean`; \}\>

***

### update()

> **update**(`userId`, `id`, `data`): `Promise`\<`object` & `object`\>

Defined in: [backend/src/projects/projects.service.ts:29](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/projects/projects.service.ts#L29)

#### Parameters

##### userId

`string`

##### id

`string`

##### data

###### buildFlags?

`string`[]

###### domain?

`string`

###### name?

`string`

###### optOutMinify?

`boolean`

#### Returns

`Promise`\<`object` & `object`\>
