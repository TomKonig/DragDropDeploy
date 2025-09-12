[**@dragdropdeploy/backend**](../../../README.md)

***

[@dragdropdeploy/backend](../../../README.md) / [config/settings.service](../README.md) / SettingsService

# Class: SettingsService

Defined in: [backend/src/config/settings.service.ts:11](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/config/settings.service.ts#L11)

## Constructors

### Constructor

> **new SettingsService**(`prisma`): `SettingsService`

Defined in: [backend/src/config/settings.service.ts:13](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/config/settings.service.ts#L13)

#### Parameters

##### prisma

[`PrismaService`](../../../prisma/prisma.service/classes/PrismaService.md)

#### Returns

`SettingsService`

## Methods

### get()

> **get**(`key`): `Promise`\<`any`\>

Defined in: [backend/src/config/settings.service.ts:15](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/config/settings.service.ts#L15)

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`any`\>

***

### getOptional()

> **getOptional**\<`T`\>(`key`, `fallback?`): `Promise`\<`undefined` \| `T`\>

Defined in: [backend/src/config/settings.service.ts:24](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/config/settings.service.ts#L24)

#### Type Parameters

##### T

`T` = `any`

#### Parameters

##### key

`string`

##### fallback?

`T`

#### Returns

`Promise`\<`undefined` \| `T`\>

***

### invalidate()

> **invalidate**(`key`): `void`

Defined in: [backend/src/config/settings.service.ts:45](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/config/settings.service.ts#L45)

#### Parameters

##### key

`string`

#### Returns

`void`

***

### set()

> **set**(`key`, `value`, `type`): `Promise`\<`any`\>

Defined in: [backend/src/config/settings.service.ts:33](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/config/settings.service.ts#L33)

#### Parameters

##### key

`string`

##### value

`any`

##### type

`"STRING"` | `"INT"` | `"BOOL"` | `"JSON"`

#### Returns

`Promise`\<`any`\>
