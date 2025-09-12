[**@dragdropdeploy/backend**](../../../README.md)

***

[@dragdropdeploy/backend](../../../README.md) / [prisma/prisma.service](../README.md) / PrismaService

# Class: PrismaService

Defined in: [backend/src/prisma/prisma.service.ts:6](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/prisma/prisma.service.ts#L6)

## Extends

- `PrismaClient`

## Implements

- `OnModuleInit`
- `OnModuleDestroy`

## Indexable

\[`K`: `symbol`\]: `object`

## Constructors

### Constructor

> **new PrismaService**(`optionsArg?`): `PrismaService`

Defined in: backend/node\_modules/.prisma/client/index.d.ts:144

##  Prisma Client ʲˢ

Type-safe database client for TypeScript & Node.js

#### Parameters

##### optionsArg?

`Subset`\<`PrismaClientOptions`, `PrismaClientOptions`\>

#### Returns

`PrismaService`

#### Example

```
const prisma = new PrismaClient()
// Fetch zero or more Users
const users = await prisma.user.findMany()
```

Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).

#### Inherited from

`PrismaClient.constructor`

## Properties

### $extends

> **$extends**: `ExtendsHook`\<`"extends"`, `TypeMapCb`, `DefaultArgs`\>

Defined in: backend/node\_modules/.prisma/client/index.d.ts:228

#### Inherited from

`PrismaClient.$extends`

## Accessors

### buildJob

#### Get Signature

> **get** **buildJob**(): `BuildJobDelegate`\<`ExtArgs`\>

Defined in: backend/node\_modules/.prisma/client/index.d.ts:268

`prisma.buildJob`: Exposes CRUD operations for the **BuildJob** model.
 * Example usage:
 * ```ts
 * // Fetch zero or more BuildJobs
 * const buildJobs = await prisma.buildJob.findMany()
 * ```

##### Returns

`BuildJobDelegate`\<`ExtArgs`\>

#### Inherited from

`PrismaClient.buildJob`

***

### deployment

#### Get Signature

> **get** **deployment**(): `DeploymentDelegate`\<`ExtArgs`\>

Defined in: backend/node\_modules/.prisma/client/index.d.ts:258

`prisma.deployment`: Exposes CRUD operations for the **Deployment** model.
 * Example usage:
 * ```ts
 * // Fetch zero or more Deployments
 * const deployments = await prisma.deployment.findMany()
 * ```

##### Returns

`DeploymentDelegate`\<`ExtArgs`\>

#### Inherited from

`PrismaClient.deployment`

***

### project

#### Get Signature

> **get** **project**(): `ProjectDelegate`\<`ExtArgs`\>

Defined in: backend/node\_modules/.prisma/client/index.d.ts:248

`prisma.project`: Exposes CRUD operations for the **Project** model.
 * Example usage:
 * ```ts
 * // Fetch zero or more Projects
 * const projects = await prisma.project.findMany()
 * ```

##### Returns

`ProjectDelegate`\<`ExtArgs`\>

#### Inherited from

`PrismaClient.project`

***

### projectSetting

#### Get Signature

> **get** **projectSetting**(): `ProjectSettingDelegate`\<`ExtArgs`\>

Defined in: backend/node\_modules/.prisma/client/index.d.ts:288

`prisma.projectSetting`: Exposes CRUD operations for the **ProjectSetting** model.
 * Example usage:
 * ```ts
 * // Fetch zero or more ProjectSettings
 * const projectSettings = await prisma.projectSetting.findMany()
 * ```

##### Returns

`ProjectSettingDelegate`\<`ExtArgs`\>

#### Inherited from

`PrismaClient.projectSetting`

***

### systemSetting

#### Get Signature

> **get** **systemSetting**(): `SystemSettingDelegate`\<`ExtArgs`\>

Defined in: backend/node\_modules/.prisma/client/index.d.ts:278

`prisma.systemSetting`: Exposes CRUD operations for the **SystemSetting** model.
 * Example usage:
 * ```ts
 * // Fetch zero or more SystemSettings
 * const systemSettings = await prisma.systemSetting.findMany()
 * ```

##### Returns

`SystemSettingDelegate`\<`ExtArgs`\>

#### Inherited from

`PrismaClient.systemSetting`

***

### user

#### Get Signature

> **get** **user**(): `UserDelegate`\<`ExtArgs`\>

Defined in: backend/node\_modules/.prisma/client/index.d.ts:238

`prisma.user`: Exposes CRUD operations for the **User** model.
 * Example usage:
 * ```ts
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```

##### Returns

`UserDelegate`\<`ExtArgs`\>

#### Inherited from

`PrismaClient.user`

## Methods

### $connect()

> **$connect**(): `Promise`\<`void`\>

Defined in: backend/node\_modules/.prisma/client/index.d.ts:150

Connect with the database

#### Returns

`Promise`\<`void`\>

#### Inherited from

`PrismaClient.$connect`

***

### $disconnect()

> **$disconnect**(): `Promise`\<`void`\>

Defined in: backend/node\_modules/.prisma/client/index.d.ts:155

Disconnect from the database

#### Returns

`Promise`\<`void`\>

#### Inherited from

`PrismaClient.$disconnect`

***

### $executeRaw()

> **$executeRaw**\<`T`\>(`query`, ...`values`): `PrismaPromise`\<`number`\>

Defined in: backend/node\_modules/.prisma/client/index.d.ts:173

Executes a prepared raw query and returns the number of affected rows.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### query

`TemplateStringsArray` | `Sql`

##### values

...`any`[]

#### Returns

`PrismaPromise`\<`number`\>

#### Example

```
const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
```

Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).

#### Inherited from

`PrismaClient.$executeRaw`

***

### $executeRawUnsafe()

> **$executeRawUnsafe**\<`T`\>(`query`, ...`values`): `PrismaPromise`\<`number`\>

Defined in: backend/node\_modules/.prisma/client/index.d.ts:185

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

`PrismaPromise`\<`number`\>

#### Example

```
const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
```

Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).

#### Inherited from

`PrismaClient.$executeRawUnsafe`

***

### $on()

> **$on**\<`V`\>(`eventType`, `callback`): `void`

Defined in: backend/node\_modules/.prisma/client/index.d.ts:145

#### Type Parameters

##### V

`V` *extends* `never`

#### Parameters

##### eventType

`V`

##### callback

(`event`) => `void`

#### Returns

`void`

#### Inherited from

`PrismaClient.$on`

***

### $queryRaw()

> **$queryRaw**\<`T`\>(`query`, ...`values`): `PrismaPromise`\<`T`\>

Defined in: backend/node\_modules/.prisma/client/index.d.ts:196

Performs a prepared raw query and returns the `SELECT` data.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### query

`TemplateStringsArray` | `Sql`

##### values

...`any`[]

#### Returns

`PrismaPromise`\<`T`\>

#### Example

```
const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
```

Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).

#### Inherited from

`PrismaClient.$queryRaw`

***

### $queryRawUnsafe()

> **$queryRawUnsafe**\<`T`\>(`query`, ...`values`): `PrismaPromise`\<`T`\>

Defined in: backend/node\_modules/.prisma/client/index.d.ts:208

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

`PrismaPromise`\<`T`\>

#### Example

```
const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
```

Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).

#### Inherited from

`PrismaClient.$queryRawUnsafe`

***

### $transaction()

#### Call Signature

> **$transaction**\<`P`\>(`arg`, `options?`): `Promise`\<`UnwrapTuple`\<`P`\>\>

Defined in: backend/node\_modules/.prisma/client/index.d.ts:223

Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.

##### Type Parameters

###### P

`P` *extends* `PrismaPromise`\<`any`\>[]

##### Parameters

###### arg

\[`...P[]`\]

###### options?

###### isolationLevel?

`TransactionIsolationLevel`

##### Returns

`Promise`\<`UnwrapTuple`\<`P`\>\>

##### Example

```
const [george, bob, alice] = await prisma.$transaction([
  prisma.user.create({ data: { name: 'George' } }),
  prisma.user.create({ data: { name: 'Bob' } }),
  prisma.user.create({ data: { name: 'Alice' } }),
])
```

Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).

##### Inherited from

`PrismaClient.$transaction`

#### Call Signature

> **$transaction**\<`R`\>(`fn`, `options?`): `Promise`\<`R`\>

Defined in: backend/node\_modules/.prisma/client/index.d.ts:225

Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.

##### Type Parameters

###### R

`R`

##### Parameters

###### fn

(`prisma`) => `Promise`\<`R`\>

###### options?

###### isolationLevel?

`TransactionIsolationLevel`

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

##### Inherited from

`PrismaClient.$transaction`

***

### ~~$use()~~

> **$use**(`cb`): `void`

Defined in: backend/node\_modules/.prisma/client/index.d.ts:162

Add a middleware

#### Parameters

##### cb

`Middleware`

#### Returns

`void`

#### Deprecated

since 4.16.0. For new code, prefer client extensions instead.

#### See

https://pris.ly/d/extensions

#### Inherited from

`PrismaClient.$use`

***

### enableShutdownHooks()

> **enableShutdownHooks**(`app`): `Promise`\<`void`\>

Defined in: [backend/src/prisma/prisma.service.ts:19](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/prisma/prisma.service.ts#L19)

#### Parameters

##### app

`INestApplication`

#### Returns

`Promise`\<`void`\>

***

### onModuleDestroy()

> **onModuleDestroy**(): `Promise`\<`void`\>

Defined in: [backend/src/prisma/prisma.service.ts:25](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/prisma/prisma.service.ts#L25)

#### Returns

`Promise`\<`void`\>

#### Implementation of

`OnModuleDestroy.onModuleDestroy`

***

### onModuleInit()

> **onModuleInit**(): `Promise`\<`void`\>

Defined in: [backend/src/prisma/prisma.service.ts:7](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/prisma/prisma.service.ts#L7)

#### Returns

`Promise`\<`void`\>

#### Implementation of

`OnModuleInit.onModuleInit`

***

### setTenantContext()

> **setTenantContext**(): `Promise`\<`void`\>

Defined in: [backend/src/prisma/prisma.service.ts:31](https://github.com/TomKonig/DragDropDeploy/blob/34bfcba72927c691f3e74d05ff86899c58e78bdc/backend/src/prisma/prisma.service.ts#L31)

#### Returns

`Promise`\<`void`\>
