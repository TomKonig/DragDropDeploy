[**@dragdropdeploy/backend**](../../../README.md)

***

[@dragdropdeploy/backend](../../../README.md) / [users/users.service](../README.md) / UsersService

# Class: UsersService

Defined in: [backend/src/users/users.service.ts:12](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/users/users.service.ts#L12)

Data-layer service for user retrieval and creation.

Handles bootstrap operator promotion logic for the first user or a
specifically designated bootstrap email (via OPERATOR_BOOTSTRAP_EMAIL).

## Constructors

### Constructor

> **new UsersService**(`prisma`): `UsersService`

Defined in: [backend/src/users/users.service.ts:13](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/users/users.service.ts#L13)

#### Parameters

##### prisma

[`PrismaService`](../../../prisma/prisma.service/classes/PrismaService.md)

#### Returns

`UsersService`

## Methods

### create()

> **create**(`email`, `password`): `Promise`\<\{ `createdAt`: `Date`; `displayName`: `null` \| `string`; `email`: `string`; `id`: `string`; `isOperator`: `boolean`; `role`: `UserRole`; `updatedAt`: `Date`; \}\>

Defined in: [backend/src/users/users.service.ts:41](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/users/users.service.ts#L41)

Create a new user, hashing password and optionally elevating to operator.

Elevation rules:
- If no users exist yet OR
- If OPERATOR_BOOTSTRAP_EMAIL matches the registering email (case-insensitive)

#### Parameters

##### email

`string`

New user email

##### password

`string`

Raw password (bcrypt hashed)

#### Returns

`Promise`\<\{ `createdAt`: `Date`; `displayName`: `null` \| `string`; `email`: `string`; `id`: `string`; `isOperator`: `boolean`; `role`: `UserRole`; `updatedAt`: `Date`; \}\>

Sanitized user projection (no password hash)

***

### findByEmail()

> **findByEmail**(`email`): `Promise`\<`null` \| \{ `createdAt`: `Date`; `displayName`: `null` \| `string`; `email`: `string`; `id`: `string`; `isOperator`: `boolean`; `passwordHash`: `null` \| `string`; `role`: `UserRole`; `updatedAt`: `Date`; \}\>

Defined in: [backend/src/users/users.service.ts:19](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/users/users.service.ts#L19)

Locate a user by email (case-sensitive by default).

#### Parameters

##### email

`string`

User email

#### Returns

`Promise`\<`null` \| \{ `createdAt`: `Date`; `displayName`: `null` \| `string`; `email`: `string`; `id`: `string`; `isOperator`: `boolean`; `passwordHash`: `null` \| `string`; `role`: `UserRole`; `updatedAt`: `Date`; \}\>

***

### findById()

> **findById**(`id`): `Promise`\<`null` \| \{ `createdAt`: `Date`; `displayName`: `null` \| `string`; `email`: `string`; `id`: `string`; `isOperator`: `boolean`; `passwordHash`: `null` \| `string`; `role`: `UserRole`; `updatedAt`: `Date`; \}\>

Defined in: [backend/src/users/users.service.ts:27](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/users/users.service.ts#L27)

Fetch a user by id.

#### Parameters

##### id

`string`

User UUID

#### Returns

`Promise`\<`null` \| \{ `createdAt`: `Date`; `displayName`: `null` \| `string`; `email`: `string`; `id`: `string`; `isOperator`: `boolean`; `passwordHash`: `null` \| `string`; `role`: `UserRole`; `updatedAt`: `Date`; \}\>
