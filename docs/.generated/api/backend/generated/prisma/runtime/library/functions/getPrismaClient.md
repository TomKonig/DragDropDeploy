[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / getPrismaClient

# Function: getPrismaClient()

> **getPrismaClient**(`config`): (`optionsArg?`) => `object`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1527

## Parameters

### config

[`GetPrismaClientConfig`](../type-aliases/GetPrismaClientConfig.md)

## Returns

> **new getPrismaClient**(`optionsArg?`): `object`

### Parameters

#### optionsArg?

[`PrismaClientOptions`](../type-aliases/PrismaClientOptions.md)

### Returns

#### \_accelerateEngineConfig

> **\_accelerateEngineConfig**: `AccelerateEngineConfig`

#### \_activeProvider

> **\_activeProvider**: `string`

#### \_appliedParent

> **\_appliedParent**: `any`

A fully constructed/applied Client that references the parent
PrismaClient. This is used for Client extensions only.

#### \_clientVersion

> **\_clientVersion**: `string`

#### \_connectionPromise?

> `optional` **\_connectionPromise**: `Promise`\<`any`\>

#### \_createPrismaPromise

> **\_createPrismaPromise**: `PrismaPromiseFactory`

#### \_disconnectionPromise?

> `optional` **\_disconnectionPromise**: `Promise`\<`any`\>

#### \_engine

> **\_engine**: `Engine`

##### Remarks

This is used internally by Policy, do not rename or remove

#### \_engineConfig

> **\_engineConfig**: `EngineConfig`

#### \_errorFormat

> **\_errorFormat**: `ErrorFormat`

#### \_extensions

> **\_extensions**: `MergedExtensionsList`

#### \_globalOmit?

> `optional` **\_globalOmit**: `GlobalOmitOptions`

#### \_originalClient

> **\_originalClient**: `any`

#### \_previewFeatures

> **\_previewFeatures**: `string`[]

#### \_requestHandler

> **\_requestHandler**: `RequestHandler`

#### \_runtimeDataModel

> **\_runtimeDataModel**: [`RuntimeDataModel`](../type-aliases/RuntimeDataModel.md)

#### \_tracingHelper

> **\_tracingHelper**: `TracingHelper`

#### \[toStringTag\]

> `readonly` **\[toStringTag\]**: `string`

#### $extends()

> **$extends**: (`this`, `extension`) => \{ \_originalClient: any; \_runtimeDataModel: RuntimeDataModel; \_requestHandler: RequestHandler; \_connectionPromise?: Promise\<any\> \| undefined; ... 34 more ...; readonly \[Symbol.toStringTag\]: string; \}

##### Parameters

###### this

\{ \_originalClient: any; \_runtimeDataModel: RuntimeDataModel; \_requestHandler: RequestHandler; \_connectionPromise?: Promise\<any\> \| undefined; ... 34 more ...; readonly \[Symbol.toStringTag\]: string; \}

###### extension

[`ExtensionArgs`](../type-aliases/ExtensionArgs.md) | (`client`) => \{ \_originalClient: any; \_runtimeDataModel: RuntimeDataModel; \_requestHandler: RequestHandler; \_connectionPromise?: Promise\<any\> \| undefined; ... 34 more ...; readonly \[Symbol.toStringTag\]: string; \}

##### Returns

\{ \_originalClient: any; \_runtimeDataModel: RuntimeDataModel; \_requestHandler: RequestHandler; \_connectionPromise?: Promise\<any\> \| undefined; ... 34 more ...; readonly \[Symbol.toStringTag\]: string; \}

#### $metrics

> **$metrics**: [`MetricsClient`](../classes/MetricsClient.md)

#### \_createItxClient()

> **\_createItxClient**(`transaction`): \{ \_originalClient: any; \_runtimeDataModel: RuntimeDataModel; \_requestHandler: RequestHandler; \_connectionPromise?: Promise\<any\> \| undefined; ... 34 more ...; readonly \[Symbol.toStringTag\]: string; \}

##### Parameters

###### transaction

`PrismaPromiseInteractiveTransaction`

##### Returns

\{ \_originalClient: any; \_runtimeDataModel: RuntimeDataModel; \_requestHandler: RequestHandler; \_connectionPromise?: Promise\<any\> \| undefined; ... 34 more ...; readonly \[Symbol.toStringTag\]: string; \}

#### \_executeRequest()

> **\_executeRequest**(`__namedParameters`): `Promise`\<`any`\>

##### Parameters

###### \_\_namedParameters

`InternalRequestParams`

##### Returns

`Promise`\<`any`\>

#### \_hasPreviewFlag()

> **\_hasPreviewFlag**(`feature`): `boolean`

Shortcut for checking a preview flag

##### Parameters

###### feature

`string`

preview flag

##### Returns

`boolean`

#### \_request()

> **\_request**(`internalParams`): `Promise`\<`any`\>

Runs the middlewares over params before executing a request

##### Parameters

###### internalParams

`InternalRequestParams`

##### Returns

`Promise`\<`any`\>

#### \_transactionWithArray()

> **\_transactionWithArray**(`__namedParameters`): `Promise`\<`any`\>

Execute a batch of requests in a transaction

##### Parameters

###### \_\_namedParameters

###### options?

`BatchTransactionOptions`

###### promises

`PrismaPromise_2`\<`any`, `any`\>[]

##### Returns

`Promise`\<`any`\>

#### \_transactionWithCallback()

> **\_transactionWithCallback**(`__namedParameters`): `Promise`\<`unknown`\>

Perform a long-running transaction

##### Parameters

###### \_\_namedParameters

###### callback

(`client`) => `Promise`\<`unknown`\>

###### options?

`Options`

##### Returns

`Promise`\<`unknown`\>

#### $applyPendingMigrations()

> **$applyPendingMigrations**(): `Promise`\<`void`\>

##### Returns

`Promise`\<`void`\>

#### $connect()

> **$connect**(): `Promise`\<`void`\>

##### Returns

`Promise`\<`void`\>

#### $disconnect()

> **$disconnect**(): `Promise`\<`void`\>

Disconnect from the database

##### Returns

`Promise`\<`void`\>

#### $executeRaw()

> **$executeRaw**(`query`, ...`values`): `PrismaPromise_2`\<`unknown`, `any`\>

Executes a raw query provided through a safe tag function

##### Parameters

###### query

`TemplateStringsArray` | [`Sql`](../classes/Sql.md)

###### values

...`any`[]

##### Returns

`PrismaPromise_2`\<`unknown`, `any`\>

##### See

https://github.com/prisma/prisma/issues/7142

#### $executeRawInternal()

> **$executeRawInternal**(`transaction`, `clientMethod`, `args`, `middlewareArgsMapper?`): `Promise`\<`number`\>

Executes a raw query and always returns a number

##### Parameters

###### transaction

`undefined` | `PrismaPromiseTransaction`\<`unknown`\>

###### clientMethod

`string`

###### args

[`RawQueryArgs`](../type-aliases/RawQueryArgs.md)

###### middlewareArgsMapper?

`MiddlewareArgsMapper`\<`unknown`, `unknown`\>

##### Returns

`Promise`\<`number`\>

#### $executeRawUnsafe()

> **$executeRawUnsafe**(`query`, ...`values`): `PrismaPromise_2`\<`unknown`, `any`\>

Unsafe counterpart of `$executeRaw` that is susceptible to SQL injections

##### Parameters

###### query

`string`

###### values

...`unknown`[]

##### Returns

`PrismaPromise_2`\<`unknown`, `any`\>

##### See

https://github.com/prisma/prisma/issues/7142

#### $on()

> **$on**\<`E`\>(`eventType`, `callback`): `any`

##### Type Parameters

###### E

`E` *extends* `ExtendedEventType`

##### Parameters

###### eventType

`E`

###### callback

`EventCallback`\<`E`\>

##### Returns

`any`

#### $queryRaw()

> **$queryRaw**(`query`, ...`values`): `PrismaPromise_2`\<`unknown`, `any`\>

Executes a raw query provided through a safe tag function

##### Parameters

###### query

`TemplateStringsArray` | [`Sql`](../classes/Sql.md)

###### values

...`any`[]

##### Returns

`PrismaPromise_2`\<`unknown`, `any`\>

##### See

https://github.com/prisma/prisma/issues/7142

#### $queryRawInternal()

> **$queryRawInternal**(`transaction`, `clientMethod`, `args`, `middlewareArgsMapper?`): `Promise`\<`any`\>

Executes a raw query and returns selected data

##### Parameters

###### transaction

`undefined` | `PrismaPromiseTransaction`\<`unknown`\>

###### clientMethod

`string`

###### args

[`RawQueryArgs`](../type-aliases/RawQueryArgs.md)

###### middlewareArgsMapper?

`MiddlewareArgsMapper`\<`unknown`, `unknown`\>

##### Returns

`Promise`\<`any`\>

#### $queryRawTyped()

> **$queryRawTyped**(`typedSql`): `PrismaPromise_2`\<`unknown`, `any`\>

Counterpart to $queryRaw, that returns strongly typed results

##### Parameters

###### typedSql

[`UnknownTypedSql`](../type-aliases/UnknownTypedSql.md)

##### Returns

`PrismaPromise_2`\<`unknown`, `any`\>

#### $queryRawUnsafe()

> **$queryRawUnsafe**(`query`, ...`values`): `PrismaPromise_2`\<`unknown`, `any`\>

Unsafe counterpart of `$queryRaw` that is susceptible to SQL injections

##### Parameters

###### query

`string`

###### values

...`unknown`[]

##### Returns

`PrismaPromise_2`\<`unknown`, `any`\>

##### See

https://github.com/prisma/prisma/issues/7142

#### $runCommandRaw()

> **$runCommandRaw**(`command`): `PrismaPromise_2`\<`unknown`, `any`\>

Executes a raw command only for MongoDB

##### Parameters

###### command

`Record`\<`string`, [`JsInputValue`](../type-aliases/JsInputValue.md)\>

##### Returns

`PrismaPromise_2`\<`unknown`, `any`\>

#### $transaction()

> **$transaction**(`input`, `options?`): `Promise`\<`any`\>

Execute queries within a transaction

##### Parameters

###### input

`any`

a callback or a query list

###### options?

`any`

to set timeouts (callback)

##### Returns

`Promise`\<`any`\>
