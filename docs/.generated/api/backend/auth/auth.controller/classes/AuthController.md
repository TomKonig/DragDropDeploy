[**@dragdropdeploy/backend**](../../../README.md)

***

[@dragdropdeploy/backend](../../../README.md) / [auth/auth.controller](../README.md) / AuthController

# Class: AuthController

Defined in: [backend/src/auth/auth.controller.ts:8](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/auth/auth.controller.ts#L8)

## Constructors

### Constructor

> **new AuthController**(`auth`): `AuthController`

Defined in: [backend/src/auth/auth.controller.ts:9](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/auth/auth.controller.ts#L9)

#### Parameters

##### auth

[`AuthService`](../../auth.service/classes/AuthService.md)

#### Returns

`AuthController`

## Methods

### login()

> **login**(`dto`): `Promise`\<\{ `accessToken`: `string`; `expiresIn`: `string`; `tokenType`: `string`; \}\>

Defined in: [backend/src/auth/auth.controller.ts:20](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/auth/auth.controller.ts#L20)

#### Parameters

##### dto

[`LoginDto`](../../dto/login.dto/classes/LoginDto.md)

#### Returns

`Promise`\<\{ `accessToken`: `string`; `expiresIn`: `string`; `tokenType`: `string`; \}\>

***

### me()

> **me**(`req`): `Promise`\<\{ `createdAt`: `Date`; `displayName`: `null` \| `string`; `email`: `string`; `id`: `string`; `isOperator`: `boolean`; `role`: `UserRole`; `updatedAt`: `Date`; \}\>

Defined in: [backend/src/auth/auth.controller.ts:25](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/auth/auth.controller.ts#L25)

#### Parameters

##### req

`any`

#### Returns

`Promise`\<\{ `createdAt`: `Date`; `displayName`: `null` \| `string`; `email`: `string`; `id`: `string`; `isOperator`: `boolean`; `role`: `UserRole`; `updatedAt`: `Date`; \}\>

***

### register()

> **register**(`dto`): `Promise`\<\{ `accessToken`: `string`; `expiresIn`: `string`; `tokenType`: `string`; \}\>

Defined in: [backend/src/auth/auth.controller.ts:13](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/auth/auth.controller.ts#L13)

#### Parameters

##### dto

[`RegisterDto`](../../dto/register.dto/classes/RegisterDto.md)

#### Returns

`Promise`\<\{ `accessToken`: `string`; `expiresIn`: `string`; `tokenType`: `string`; \}\>
