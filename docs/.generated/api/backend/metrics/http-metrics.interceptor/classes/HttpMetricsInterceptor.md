[**@dragdropdeploy/backend**](../../../README.md)

***

[@dragdropdeploy/backend](../../../README.md) / [metrics/http-metrics.interceptor](../README.md) / HttpMetricsInterceptor

# Class: HttpMetricsInterceptor

Defined in: [backend/src/metrics/http-metrics.interceptor.ts:6](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/metrics/http-metrics.interceptor.ts#L6)

## Implements

- `NestInterceptor`

## Constructors

### Constructor

> **new HttpMetricsInterceptor**(`metrics`): `HttpMetricsInterceptor`

Defined in: [backend/src/metrics/http-metrics.interceptor.ts:7](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/metrics/http-metrics.interceptor.ts#L7)

#### Parameters

##### metrics

[`MetricsService`](../../metrics.service/classes/MetricsService.md)

#### Returns

`HttpMetricsInterceptor`

## Methods

### intercept()

> **intercept**(`context`, `next`): `Observable`\<`any`\>

Defined in: [backend/src/metrics/http-metrics.interceptor.ts:8](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/metrics/http-metrics.interceptor.ts#L8)

Method to implement a custom interceptor.

#### Parameters

##### context

`ExecutionContext`

an `ExecutionContext` object providing methods to access the
route handler and class about to be invoked.

##### next

`CallHandler`

a reference to the `CallHandler`, which provides access to an
`Observable` representing the response stream from the route handler.

#### Returns

`Observable`\<`any`\>

#### Implementation of

`NestInterceptor.intercept`
