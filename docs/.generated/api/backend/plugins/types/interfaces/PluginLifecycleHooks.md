[**@dragdropdeploy/backend**](../../../README.md)

***

[@dragdropdeploy/backend](../../../README.md) / [plugins/types](../README.md) / PluginLifecycleHooks

# Interface: PluginLifecycleHooks

Defined in: [backend/src/plugins/types.ts:6](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/plugins/types.ts#L6)

## Properties

### name

> **name**: `string`

Defined in: [backend/src/plugins/types.ts:7](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/plugins/types.ts#L7)

***

### version?

> `optional` **version**: `string`

Defined in: [backend/src/plugins/types.ts:8](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/plugins/types.ts#L8)

## Methods

### init()?

> `optional` **init**(`ctx`): `void` \| `Promise`\<`void`\>

Defined in: [backend/src/plugins/types.ts:9](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/plugins/types.ts#L9)

#### Parameters

##### ctx

[`PluginContext`](PluginContext.md)

#### Returns

`void` \| `Promise`\<`void`\>

***

### onProjectDeployed()?

> `optional` **onProjectDeployed**(`ctx`, `payload`): `void` \| `Promise`\<`void`\>

Defined in: [backend/src/plugins/types.ts:11](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/plugins/types.ts#L11)

#### Parameters

##### ctx

[`PluginContext`](PluginContext.md)

##### payload

###### projectId

`string`

###### versionId

`string`

#### Returns

`void` \| `Promise`\<`void`\>

***

### onUserCreated()?

> `optional` **onUserCreated**(`ctx`, `user`): `void` \| `Promise`\<`void`\>

Defined in: [backend/src/plugins/types.ts:10](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/plugins/types.ts#L10)

#### Parameters

##### ctx

[`PluginContext`](PluginContext.md)

##### user

###### email

`string`

###### id

`string`

#### Returns

`void` \| `Promise`\<`void`\>
