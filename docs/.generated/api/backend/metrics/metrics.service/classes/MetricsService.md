[**@dragdropdeploy/backend**](../../../README.md)

***

[@dragdropdeploy/backend](../../../README.md) / [metrics/metrics.service](../README.md) / MetricsService

# Class: MetricsService

Defined in: [backend/src/metrics/metrics.service.ts:5](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/metrics/metrics.service.ts#L5)

## Implements

- `OnModuleInit`

## Constructors

### Constructor

> **new MetricsService**(): `MetricsService`

#### Returns

`MetricsService`

## Properties

### activeBuildsGauge

> `readonly` **activeBuildsGauge**: `Gauge`\<`string`\>

Defined in: [backend/src/metrics/metrics.service.ts:36](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/metrics/metrics.service.ts#L36)

***

### buildDurationHistogram

> `readonly` **buildDurationHistogram**: `Histogram`\<`string`\>

Defined in: [backend/src/metrics/metrics.service.ts:29](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/metrics/metrics.service.ts#L29)

***

### buildStartedCounter

> `readonly` **buildStartedCounter**: `Counter`\<`string`\>

Defined in: [backend/src/metrics/metrics.service.ts:16](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/metrics/metrics.service.ts#L16)

***

### buildStartedPerProjectCounter

> `readonly` **buildStartedPerProjectCounter**: `Counter`\<`"project_id"`\>

Defined in: [backend/src/metrics/metrics.service.ts:22](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/metrics/metrics.service.ts#L22)

***

### httpRequestCounter

> `readonly` **httpRequestCounter**: `Counter`\<`"route"` \| `"status"` \| `"method"`\>

Defined in: [backend/src/metrics/metrics.service.ts:9](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/metrics/metrics.service.ts#L9)

## Methods

### getRegistry()

> **getRegistry**(): `Registry`\<`"text/plain; version=0.0.4; charset=utf-8"`\>

Defined in: [backend/src/metrics/metrics.service.ts:46](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/metrics/metrics.service.ts#L46)

#### Returns

`Registry`\<`"text/plain; version=0.0.4; charset=utf-8"`\>

***

### onModuleInit()

> **onModuleInit**(): `void`

Defined in: [backend/src/metrics/metrics.service.ts:42](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/metrics/metrics.service.ts#L42)

#### Returns

`void`

#### Implementation of

`OnModuleInit.onModuleInit`

***

### recordProjectBuildStart()

> **recordProjectBuildStart**(`projectId`): `void`

Defined in: [backend/src/metrics/metrics.service.ts:50](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/metrics/metrics.service.ts#L50)

#### Parameters

##### projectId

`string`

#### Returns

`void`
