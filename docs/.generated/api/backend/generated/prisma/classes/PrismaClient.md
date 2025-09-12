[**@dragdropdeploy/backend**](../../../README.md)

***

[@dragdropdeploy/backend](../../../README.md) / [generated/prisma](../README.md) / PrismaClient

# Class: PrismaClient\<ClientOptions, U, ExtArgs\>

Defined in: backend/src/generated/prisma/index.d.ts:66

##  Prisma Client ʲˢ

Type-safe database client for TypeScript & Node.js

## Example

```
const prisma = new PrismaClient()
// Fetch zero or more Users
const users = await prisma.user.findMany()
```

Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).

## Type Parameters

### ClientOptions

`ClientOptions` *extends* [`PrismaClientOptions`](../namespaces/Prisma/interfaces/PrismaClientOptions.md) = [`PrismaClientOptions`](../namespaces/Prisma/interfaces/PrismaClientOptions.md)

### U

`U` = `"log"` *extends* keyof `ClientOptions` ? `ClientOptions`\[`"log"`\] *extends* ([`LogLevel`](../namespaces/Prisma/type-aliases/LogLevel.md) \| [`LogDefinition`](../namespaces/Prisma/type-aliases/LogDefinition.md))[] ? [`GetEvents`](../namespaces/Prisma/type-aliases/GetEvents.md)\<`ClientOptions`\[`"log"`\]\> : `never` : `never`

### ExtArgs

`ExtArgs` *extends* [`InternalArgs`](../runtime/library/type-aliases/InternalArgs.md) = [`DefaultArgs`](../runtime/library/type-aliases/DefaultArgs.md)

## Indexable

\[`K`: `symbol`\]: `object`

## Constructors

### Constructor

> **new PrismaClient**\<`ClientOptions`, `U`, `ExtArgs`\>(`optionsArg?`): `PrismaClient`\<`ClientOptions`, `U`, `ExtArgs`\>

Defined in: backend/src/generated/prisma/index.d.ts:88

##  Prisma Client ʲˢ

Type-safe database client for TypeScript & Node.js

#### Parameters

##### optionsArg?

[`Subset`](../namespaces/Prisma/type-aliases/Subset.md)\<`ClientOptions`, [`PrismaClientOptions`](../namespaces/Prisma/interfaces/PrismaClientOptions.md)\>

#### Returns

`PrismaClient`\<`ClientOptions`, `U`, `ExtArgs`\>

#### Example

```
const prisma = new PrismaClient()
// Fetch zero or more Users
const users = await prisma.user.findMany()
```

Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).

## Properties

### $extends

> **$extends**: [`ExtendsHook`](../runtime/library/interfaces/ExtendsHook.md)\<`"extends"`, [`TypeMapCb`](../namespaces/Prisma/interfaces/TypeMapCb.md)\<`ClientOptions`\>, `ExtArgs`, [`TypeMap`](../namespaces/Prisma/type-aliases/TypeMap.md)\<[`InternalArgs`](../runtime/library/type-aliases/InternalArgs.md) & `ExtArgs`, `ClientOptions` *extends* `object` ? `OmitOptions` : `object`\>\>

Defined in: backend/src/generated/prisma/index.d.ts:166

## Accessors

### deployment

#### Get Signature

> **get** **deployment**(): [`DeploymentDelegate`](../namespaces/Prisma/interfaces/DeploymentDelegate.md)\<`ExtArgs`, `ClientOptions`\>

Defined in: backend/src/generated/prisma/index.d.ts:198

`prisma.deployment`: Exposes CRUD operations for the **Deployment** model.
 * Example usage:
 * ```ts
 * // Fetch zero or more Deployments
 * const deployments = await prisma.deployment.findMany()
 * ```

##### Returns

[`DeploymentDelegate`](../namespaces/Prisma/interfaces/DeploymentDelegate.md)\<`ExtArgs`, `ClientOptions`\>

***

### project

#### Get Signature

> **get** **project**(): [`ProjectDelegate`](../namespaces/Prisma/interfaces/ProjectDelegate.md)\<`ExtArgs`, `ClientOptions`\>

Defined in: backend/src/generated/prisma/index.d.ts:188

`prisma.project`: Exposes CRUD operations for the **Project** model.
 * Example usage:
 * ```ts
 * // Fetch zero or more Projects
 * const projects = await prisma.project.findMany()
 * ```

##### Returns

[`ProjectDelegate`](../namespaces/Prisma/interfaces/ProjectDelegate.md)\<`ExtArgs`, `ClientOptions`\>

***

### user

#### Get Signature

> **get** **user**(): [`UserDelegate`](../namespaces/Prisma/interfaces/UserDelegate.md)\<`ExtArgs`, `ClientOptions`\>

Defined in: backend/src/generated/prisma/index.d.ts:178

`prisma.user`: Exposes CRUD operations for the **User** model.
 * Example usage:
 * ```ts
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```

##### Returns

[`UserDelegate`](../namespaces/Prisma/interfaces/UserDelegate.md)\<`ExtArgs`, `ClientOptions`\>

## Methods

### $connect()

> **$connect**(): `Promise`\<`void`\>

Defined in: backend/src/generated/prisma/index.d.ts:94

Connect with the database

#### Returns

`Promise`\<`void`\>

***

### $disconnect()

> **$disconnect**(): `Promise`\<`void`\>

Defined in: backend/src/generated/prisma/index.d.ts:99

Disconnect from the database

#### Returns

`Promise`\<`void`\>

***

### $executeRaw()

> **$executeRaw**\<`T`\>(`query`, ...`values`): [`PrismaPromise`](../namespaces/Prisma/type-aliases/PrismaPromise.md)\<`number`\>

Defined in: backend/src/generated/prisma/index.d.ts:110

Executes a prepared raw query and returns the number of affected rows.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### query

`TemplateStringsArray` | [`Sql`](../runtime/library/classes/Sql.md)

##### values

...`any`[]

#### Returns

[`PrismaPromise`](../namespaces/Prisma/type-aliases/PrismaPromise.md)\<`number`\>

#### Example

```
const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
```

Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).

***

### $executeRawUnsafe()

> **$executeRawUnsafe**\<`T`\>(`query`, ...`values`): [`PrismaPromise`](../namespaces/Prisma/type-aliases/PrismaPromise.md)\<`number`\>

Defined in: backend/src/generated/prisma/index.d.ts:122

Executes a raw query and returns the number of affected rows.
Susceptible to SQL injections, see documentation.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### query

`string`

##### values

...`any`[]

#### Returns

[`PrismaPromise`](../namespaces/Prisma/type-aliases/PrismaPromise.md)\<`number`\>

#### Example

```
const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
```

Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).

***

### $on()

> **$on**\<`V`\>(`eventType`, `callback`): `PrismaClient`

Defined in: backend/src/generated/prisma/index.d.ts:89

#### Type Parameters

##### V

`V`

#### Parameters

##### eventType

`V`

##### callback

(`event`) => `void`

#### Returns

`PrismaClient`

***

### $queryRaw()

> **$queryRaw**\<`T`\>(`query`, ...`values`): [`PrismaPromise`](../namespaces/Prisma/type-aliases/PrismaPromise.md)\<`T`\>

Defined in: backend/src/generated/prisma/index.d.ts:133

Performs a prepared raw query and returns the `SELECT` data.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### query

`TemplateStringsArray` | [`Sql`](../runtime/library/classes/Sql.md)

##### values

...`any`[]

#### Returns

[`PrismaPromise`](../namespaces/Prisma/type-aliases/PrismaPromise.md)\<`T`\>

#### Example

```
const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
```

Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).

***

### $queryRawUnsafe()

> **$queryRawUnsafe**\<`T`\>(`query`, ...`values`): [`PrismaPromise`](../namespaces/Prisma/type-aliases/PrismaPromise.md)\<`T`\>

Defined in: backend/src/generated/prisma/index.d.ts:145

Performs a raw query and returns the `SELECT` data.
Susceptible to SQL injections, see documentation.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### query

`string`

##### values

...`any`[]

#### Returns

[`PrismaPromise`](../namespaces/Prisma/type-aliases/PrismaPromise.md)\<`T`\>

#### Example

```
const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
```

Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).

***

### $transaction()

#### Call Signature

> **$transaction**\<`P`\>(`arg`, `options?`): `Promise`\<[`UnwrapTuple`](../runtime/library/type-aliases/UnwrapTuple.md)\<`P`\>\>

Defined in: backend/src/generated/prisma/index.d.ts:161

Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.

##### Type Parameters

###### P

`P` *extends* [`PrismaPromise`](../namespaces/Prisma/type-aliases/PrismaPromise.md)\<`any`\>[]

##### Parameters

###### arg

\[`...P[]`\]

###### options?

###### isolationLevel?

[`TransactionIsolationLevel`](../namespaces/Prisma/type-aliases/TransactionIsolationLevel.md)

##### Returns

`Promise`\<[`UnwrapTuple`](../runtime/library/type-aliases/UnwrapTuple.md)\<`P`\>\>

##### Example

```
const [george, bob, alice] = await prisma.$transaction([
  prisma.user.create({ data: { name: 'George' } }),
  prisma.user.create({ data: { name: 'Bob' } }),
  prisma.user.create({ data: { name: 'Alice' } }),
])
```

Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).

#### Call Signature

> **$transaction**\<`R`\>(`fn`, `options?`): `Promise`\<`R`\>

Defined in: backend/src/generated/prisma/index.d.ts:163

Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.

##### Type Parameters

###### R

`R`

##### Parameters

###### fn

(`prisma`) => `Promise`\<`R`\>

###### options?

###### isolationLevel?

[`TransactionIsolationLevel`](../namespaces/Prisma/type-aliases/TransactionIsolationLevel.md)

###### maxWait?

`number`

###### timeout?

`number`

##### Returns

`Promise`\<`R`\>

##### Example

```
const [george, bob, alice] = await prisma.$transaction([
  prisma.user.create({ data: { name: 'George' } }),
  prisma.user.create({ data: { name: 'Bob' } }),
  prisma.user.create({ data: { name: 'Alice' } }),
])
```

Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
