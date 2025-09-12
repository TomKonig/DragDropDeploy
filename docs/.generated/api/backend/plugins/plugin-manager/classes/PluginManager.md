[**@dragdropdeploy/backend**](../../../README.md)

***

[@dragdropdeploy/backend](../../../README.md) / [plugins/plugin-manager](../README.md) / PluginManager

# Class: PluginManager

Defined in: [backend/src/plugins/plugin-manager.ts:4](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/plugins/plugin-manager.ts#L4)

## Constructors

### Constructor

> **new PluginManager**(): `PluginManager`

#### Returns

`PluginManager`

## Methods

### emitProjectDeployed()

> **emitProjectDeployed**(`payload`): `Promise`\<`void`\>

Defined in: [backend/src/plugins/plugin-manager.ts:32](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/plugins/plugin-manager.ts#L32)

#### Parameters

##### payload

###### projectId

`string`

###### versionId

`string`

#### Returns

`Promise`\<`void`\>

***

### emitUserCreated()

> **emitUserCreated**(`user`): `Promise`\<`void`\>

Defined in: [backend/src/plugins/plugin-manager.ts:23](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/plugins/plugin-manager.ts#L23)

#### Parameters

##### user

###### email

`string`

###### id

`string`

#### Returns

`Promise`\<`void`\>

***

### initAll()

> **initAll**(): `Promise`\<`void`\>

Defined in: [backend/src/plugins/plugin-manager.ts:12](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/plugins/plugin-manager.ts#L12)

#### Returns

`Promise`\<`void`\>

***

### register()

> **register**(`plugin`): `void`

Defined in: [backend/src/plugins/plugin-manager.ts:8](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/plugins/plugin-manager.ts#L8)

#### Parameters

##### plugin

[`PluginLifecycleHooks`](../../types/interfaces/PluginLifecycleHooks.md)

#### Returns

`void`
