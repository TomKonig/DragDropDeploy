[**@dragdropdeploy/backend**](../../../README.md)

***

[@dragdropdeploy/backend](../../../README.md) / [auth/auth.service](../README.md) / AuthService

# Class: AuthService

Defined in: [backend/src/auth/auth.service.ts:20](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/auth/auth.service.ts#L20)

Authentication and token issuance service.

Responsibilities:
- User registration (first user bootstrap to operator handled in UsersService)
- Credential validation and JWT access token creation
- Lightweight user profile retrieval (without password hash)

Notes:
- Refresh tokens are not yet implemented; callers must re-auth after expiry.
- Emits a best-effort plugin hook on user creation; failures are swallowed to avoid blocking auth flow.

## Constructors

### Constructor

> **new AuthService**(`users`, `jwt`): `AuthService`

Defined in: [backend/src/auth/auth.service.ts:21](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/auth/auth.service.ts#L21)

#### Parameters

##### users

[`UsersService`](../../../users/users.service/classes/UsersService.md)

##### jwt

`JwtService`

#### Returns

`AuthService`

## Methods

### login()

> **login**(`email`, `password`): `Promise`\<\{ `accessToken`: `string`; `expiresIn`: `string`; `tokenType`: `string`; \}\>

Defined in: [backend/src/auth/auth.service.ts:48](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/auth/auth.service.ts#L48)

Validate credentials and issue an access token.

#### Parameters

##### email

`string`

User email

##### password

`string`

Raw password for comparison

#### Returns

`Promise`\<\{ `accessToken`: `string`; `expiresIn`: `string`; `tokenType`: `string`; \}\>

Access token response including expiry metadata

#### Throws

UnauthorizedException on invalid credentials

***

### me()

> **me**(`userId`): `Promise`\<\{ `createdAt`: `Date`; `displayName`: `null` \| `string`; `email`: `string`; `id`: `string`; `isOperator`: `boolean`; `role`: `UserRole`; `updatedAt`: `Date`; \}\>

Defined in: [backend/src/auth/auth.service.ts:62](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/auth/auth.service.ts#L62)

Retrieve a sanitized user profile (excludes password hash).

#### Parameters

##### userId

`string`

Authenticated subject identifier (UUID)

#### Returns

`Promise`\<\{ `createdAt`: `Date`; `displayName`: `null` \| `string`; `email`: `string`; `id`: `string`; `isOperator`: `boolean`; `role`: `UserRole`; `updatedAt`: `Date`; \}\>

#### Throws

UnauthorizedException if user not found (treat as stale token)

***

### register()

> **register**(`email`, `password`): `Promise`\<\{ `accessToken`: `string`; `expiresIn`: `string`; `tokenType`: `string`; \}\>

Defined in: [backend/src/auth/auth.service.ts:31](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/auth/auth.service.ts#L31)

Register a new user by email + password.

#### Parameters

##### email

`string`

Unique user email

##### password

`string`

Raw password (will be hashed in UsersService)

#### Returns

`Promise`\<\{ `accessToken`: `string`; `expiresIn`: `string`; `tokenType`: `string`; \}\>

Access token response for immediate authentication

#### Throws

ConflictException if email already exists
