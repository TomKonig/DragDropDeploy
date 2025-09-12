[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / PrismaClientOptions

# Type Alias: PrismaClientOptions

> **PrismaClientOptions** = `object`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:2630

## Properties

### \_\_internal?

> `optional` **\_\_internal**: `object`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:2674

**`Internal`**

You probably don't want to use this. `__internal` is used by internal tooling.

#### configOverride()?

> `optional` **configOverride**: (`config`) => [`GetPrismaClientConfig`](GetPrismaClientConfig.md)

This can be used for testing purposes

##### Parameters

###### config

[`GetPrismaClientConfig`](GetPrismaClientConfig.md)

##### Returns

[`GetPrismaClientConfig`](GetPrismaClientConfig.md)

#### debug?

> `optional` **debug**: `boolean`

#### engine?

> `optional` **engine**: `object`

##### engine.allowTriggerPanic?

> `optional` **allowTriggerPanic**: `boolean`

##### engine.binaryPath?

> `optional` **binaryPath**: `string`

##### engine.cwd?

> `optional` **cwd**: `string`

##### engine.endpoint?

> `optional` **endpoint**: `string`

***

### adapter?

> `optional` **adapter**: [`SqlDriverAdapterFactory`](../interfaces/SqlDriverAdapterFactory.md) \| `null`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:2638

Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale.

***

### datasources?

> `optional` **datasources**: `Datasources`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:2642

Overwrites the datasource url from your schema.prisma file

***

### datasourceUrl?

> `optional` **datasourceUrl**: `string`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:2634

Overwrites the primary datasource url from your schema.prisma file

***

### errorFormat?

> `optional` **errorFormat**: `ErrorFormat`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:2646

#### Default

```ts
"colorless"
```

***

### log?

> `optional` **log**: (`LogLevel` \| `LogDefinition`)[]

Defined in: backend/src/generated/prisma/runtime/library.d.ts:2668

#### Example

```ts
```
// Defaults to stdout
log: ['query', 'info', 'warn']

// Emit as events
log: [
 { emit: 'stdout', level: 'query' },
 { emit: 'stdout', level: 'info' },
 { emit: 'stdout', level: 'warn' }
]
```
Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
```

***

### omit?

> `optional` **omit**: `GlobalOmitOptions`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:2669

***

### transactionOptions?

> `optional` **transactionOptions**: `Transaction_2.Options`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:2652

The default values for Transaction options
maxWait ?= 2000
timeout ?= 5000
