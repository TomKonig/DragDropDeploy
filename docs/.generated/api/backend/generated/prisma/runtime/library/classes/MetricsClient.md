[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / MetricsClient

# Class: MetricsClient

Defined in: backend/src/generated/prisma/runtime/library.d.ts:2327

## Constructors

### Constructor

> **new MetricsClient**(`client`): `MetricsClient`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:2329

#### Parameters

##### client

###### _accelerateEngineConfig

`AccelerateEngineConfig`

###### _activeProvider

`string`

###### _appliedParent

`any`

A fully constructed/applied Client that references the parent
PrismaClient. This is used for Client extensions only.

###### _clientVersion

`string`

###### _connectionPromise?

`Promise`\<`any`\>

###### _createPrismaPromise

`PrismaPromiseFactory`

###### _disconnectionPromise?

`Promise`\<`any`\>

###### _engine

`Engine`

**Remarks**

This is used internally by Policy, do not rename or remove

###### _engineConfig

`EngineConfig`

###### _errorFormat

`ErrorFormat`

###### _extensions

`MergedExtensionsList`

###### _globalOmit?

`GlobalOmitOptions`

###### _originalClient

`any`

###### _previewFeatures

`string`[]

###### _requestHandler

`RequestHandler`

###### _runtimeDataModel

[`RuntimeDataModel`](../type-aliases/RuntimeDataModel.md)

###### _tracingHelper

`TracingHelper`

###### [toStringTag]

`string`

###### $extends

(`this`, `extension`) => \{ \_originalClient: any; \_runtimeDataModel: RuntimeDataModel; \_requestHandler: RequestHandler; \_connectionPromise?: Promise\<any\> \| undefined; ... 34 more ...; readonly \[Symbol.toStringTag\]: string; \}

###### $metrics

`MetricsClient`

###### _createItxClient

###### _executeRequest

###### _hasPreviewFlag

###### _request

###### _transactionWithArray

###### _transactionWithCallback

###### $applyPendingMigrations

###### $connect

###### $disconnect

###### $executeRaw

###### $executeRawInternal

###### $executeRawUnsafe

###### $on

###### $queryRaw

###### $queryRawInternal

###### $queryRawTyped

###### $queryRawUnsafe

###### $runCommandRaw

###### $transaction

#### Returns

`MetricsClient`

## Methods

### json()

> **json**(`options?`): `Promise`\<[`Metrics`](../type-aliases/Metrics.md)\>

Defined in: backend/src/generated/prisma/runtime/library.d.ts:2344

Returns all metrics gathered up to this point in prometheus format.

#### Parameters

##### options?

`MetricsOptions`

#### Returns

`Promise`\<[`Metrics`](../type-aliases/Metrics.md)\>

***

### prometheus()

> **prometheus**(`options?`): `Promise`\<`string`\>

Defined in: backend/src/generated/prisma/runtime/library.d.ts:2337

Returns all metrics gathered up to this point in prometheus format.
Result of this call can be exposed directly to prometheus scraping endpoint

#### Parameters

##### options?

`MetricsOptions`

#### Returns

`Promise`\<`string`\>
