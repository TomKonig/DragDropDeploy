[**@dragdropdeploy/backend**](../../../README.md)

***

[@dragdropdeploy/backend](../../../README.md) / [auth/jwt.strategy](../README.md) / JwtStrategy

# Class: JwtStrategy

Defined in: [backend/src/auth/jwt.strategy.ts:6](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/auth/jwt.strategy.ts#L6)

## Extends

- `Strategy`\<`this`\>

## Constructors

### Constructor

> **new JwtStrategy**(): `JwtStrategy`

Defined in: [backend/src/auth/jwt.strategy.ts:7](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/auth/jwt.strategy.ts#L7)

#### Returns

`JwtStrategy`

#### Overrides

`PassportStrategy(Strategy).constructor`

## Properties

### name

> **name**: `string`

Defined in: node\_modules/@types/passport-jwt/index.d.ts:13

#### Inherited from

`PassportStrategy(Strategy).name`

## Methods

### authenticate()

> **authenticate**(`req`, `options?`): `void`

Defined in: node\_modules/@types/passport-strategy/index.d.ts:20

Performs authentication for the request.
Note: Virtual function - re-implement in the strategy.

#### Parameters

##### req

`Request`

The request to authenticate.

##### options?

`any`

Options passed to the strategy.

#### Returns

`void`

#### Inherited from

`PassportStrategy(Strategy).authenticate`

***

### error()

> **error**(`err`): `void`

Defined in: node\_modules/@types/passport-strategy/index.d.ts:90

Internal error while performing authentication.

Strategies should call this function when an internal error occurs
during the process of performing authentication; for example, if the
user directory is not available.

#### Parameters

##### err

`Error`

#### Returns

`void`

#### Api

public

#### Inherited from

`PassportStrategy(Strategy).error`

***

### fail()

#### Call Signature

> **fail**(`challenge`, `status`): `void`

Defined in: node\_modules/@types/passport-strategy/index.d.ts:54

Fail authentication, with optional `challenge` and `status`, defaulting
to 401.

Strategies should call this function to fail an authentication attempt.

##### Parameters

###### challenge

`any`

(Can also be an object with 'message' and 'type' fields).

###### status

`number`

##### Returns

`void`

##### Api

public

##### Inherited from

`PassportStrategy(Strategy).fail`

#### Call Signature

> **fail**(`status`): `void`

Defined in: node\_modules/@types/passport-strategy/index.d.ts:55

Fail authentication, with optional `challenge` and `status`, defaulting
to 401.

Strategies should call this function to fail an authentication attempt.

##### Parameters

###### status

`number`

##### Returns

`void`

##### Api

public

##### Inherited from

`PassportStrategy(Strategy).fail`

***

### pass()

> **pass**(): `void`

Defined in: node\_modules/@types/passport-strategy/index.d.ts:78

Pass without making a success or fail decision.

Under most circumstances, Strategies should not need to call this
function.  It exists primarily to allow previous authentication state
to be restored, for example from an HTTP session.

#### Returns

`void`

#### Api

public

#### Inherited from

`PassportStrategy(Strategy).pass`

***

### redirect()

> **redirect**(`url`, `status?`): `void`

Defined in: node\_modules/@types/passport-strategy/index.d.ts:67

Redirect to `url` with optional `status`, defaulting to 302.

Strategies should call this function to redirect the user (via their
user agent) to a third-party website for authentication.

#### Parameters

##### url

`string`

##### status?

`number`

#### Returns

`void`

#### Api

public

#### Inherited from

`PassportStrategy(Strategy).redirect`

***

### success()

> **success**(`user`, `info?`): `void`

Defined in: node\_modules/@types/passport-strategy/index.d.ts:42

Authenticate `user`, with optional `info`.

Strategies should call this function to successfully authenticate a
user.  `user` should be an object supplied by the application after it
has been given an opportunity to verify credentials.  `info` is an
optional argument containing additional user information.  This is
useful for third-party authentication strategies to pass profile
details.

#### Parameters

##### user

`any`

##### info?

`any`

#### Returns

`void`

#### Api

public

#### Inherited from

`PassportStrategy(Strategy).success`

***

### validate()

> **validate**(`payload`): `Promise`\<`any`\>

Defined in: [backend/src/auth/jwt.strategy.ts:15](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/auth/jwt.strategy.ts#L15)

#### Parameters

##### payload

`any`

#### Returns

`Promise`\<`any`\>
