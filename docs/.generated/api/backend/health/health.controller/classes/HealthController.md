[**@dragdropdeploy/backend**](../../../README.md)

***

[@dragdropdeploy/backend](../../../README.md) / [health/health.controller](../README.md) / HealthController

# Class: HealthController

Defined in: [backend/src/health/health.controller.ts:6](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/health/health.controller.ts#L6)

## Constructors

### Constructor

> **new HealthController**(): `HealthController`

#### Returns

`HealthController`

## Methods

### internal()

> **internal**(): `object`

Defined in: [backend/src/health/health.controller.ts:17](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/health/health.controller.ts#L17)

#### Returns

`object`

##### memory

> **memory**: `MemoryUsage`

##### status

> **status**: `string` = `'ok'`

##### timestamp

> **timestamp**: `string`

##### uptimeSeconds

> **uptimeSeconds**: `number`

***

### public()

> **public**(): `object`

Defined in: [backend/src/health/health.controller.ts:10](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/health/health.controller.ts#L10)

#### Returns

`object`

##### status

> **status**: `string` = `'ok'`

##### timestamp

> **timestamp**: `string`
