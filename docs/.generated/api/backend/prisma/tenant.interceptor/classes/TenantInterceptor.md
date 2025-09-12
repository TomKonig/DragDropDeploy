[**@dragdropdeploy/backend**](../../../README.md)

***

[@dragdropdeploy/backend](../../../README.md) / [prisma/tenant.interceptor](../README.md) / TenantInterceptor

# Class: TenantInterceptor

Defined in: [backend/src/prisma/tenant.interceptor.ts:14](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/prisma/tenant.interceptor.ts#L14)

## Implements

- `NestInterceptor`

## Constructors

### Constructor

> **new TenantInterceptor**(): `TenantInterceptor`

#### Returns

`TenantInterceptor`

## Methods

### intercept()

> **intercept**(`context`, `next`): `Observable`\<`any`\>

Defined in: [backend/src/prisma/tenant.interceptor.ts:15](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/prisma/tenant.interceptor.ts#L15)

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
