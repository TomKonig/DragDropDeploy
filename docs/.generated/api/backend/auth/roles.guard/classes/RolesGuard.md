[**@dragdropdeploy/backend**](../../../README.md)

***

[@dragdropdeploy/backend](../../../README.md) / [auth/roles.guard](../README.md) / RolesGuard

# Class: RolesGuard

Defined in: [backend/src/auth/roles.guard.ts:6](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/auth/roles.guard.ts#L6)

## Implements

- `CanActivate`

## Constructors

### Constructor

> **new RolesGuard**(`reflector`): `RolesGuard`

Defined in: [backend/src/auth/roles.guard.ts:7](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/auth/roles.guard.ts#L7)

#### Parameters

##### reflector

`Reflector`

#### Returns

`RolesGuard`

## Methods

### canActivate()

> **canActivate**(`context`): `boolean`

Defined in: [backend/src/auth/roles.guard.ts:9](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/auth/roles.guard.ts#L9)

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
