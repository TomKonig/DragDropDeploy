[**@dragdropdeploy/backend**](../../../README.md)

***

[@dragdropdeploy/backend](../../../README.md) / [auth/rate-limit.middleware](../README.md) / RateLimitMiddleware

# Class: RateLimitMiddleware

Defined in: [backend/src/auth/rate-limit.middleware.ts:10](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/auth/rate-limit.middleware.ts#L10)

## Implements

- `NestMiddleware`

## Constructors

### Constructor

> **new RateLimitMiddleware**(): `RateLimitMiddleware`

Defined in: [backend/src/auth/rate-limit.middleware.ts:17](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/auth/rate-limit.middleware.ts#L17)

#### Returns

`RateLimitMiddleware`

## Methods

### dispose()

> **dispose**(): `void`

Defined in: [backend/src/auth/rate-limit.middleware.ts:34](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/auth/rate-limit.middleware.ts#L34)

#### Returns

`void`

***

### use()

> **use**(`req`, `res`, `next`): `void`

Defined in: [backend/src/auth/rate-limit.middleware.ts:38](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/auth/rate-limit.middleware.ts#L38)

#### Parameters

##### req

`Request`

##### res

`Response`

##### next

`NextFunction`

#### Returns

`void`

#### Implementation of

`NestMiddleware.use`
