[**@dragdropdeploy/backend**](../../../README.md)

***

[@dragdropdeploy/backend](../../../README.md) / [auth/rate-limit.guard](../README.md) / RateLimitGuard

# Class: RateLimitGuard

Defined in: [backend/src/auth/rate-limit.guard.ts:10](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/auth/rate-limit.guard.ts#L10)

## Implements

- `CanActivate`

## Constructors

### Constructor

> **new RateLimitGuard**(): `RateLimitGuard`

#### Returns

`RateLimitGuard`

## Methods

### canActivate()

> **canActivate**(`context`): `boolean`

Defined in: [backend/src/auth/rate-limit.guard.ts:15](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/auth/rate-limit.guard.ts#L15)

#### Parameters

##### context

`ExecutionContext`

Current execution context. Provides access to details about
the current request pipeline.

#### Returns

`boolean`

Value indicating whether or not the current request is allowed to
proceed.

#### Implementation of

`CanActivate.canActivate`
