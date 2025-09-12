[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / PrismaClientOptions

# Interface: PrismaClientOptions

Defined in: backend/src/generated/prisma/index.d.ts:913

## Properties

### datasources?

> `optional` **datasources**: [`Datasources`](../type-aliases/Datasources.md)

Defined in: backend/src/generated/prisma/index.d.ts:917

Overwrites the datasource url from your schema.prisma file

***

### datasourceUrl?

> `optional` **datasourceUrl**: `string`

Defined in: backend/src/generated/prisma/index.d.ts:921

Overwrites the datasource url from your schema.prisma file

***

### errorFormat?

> `optional` **errorFormat**: [`ErrorFormat`](../type-aliases/ErrorFormat.md)

Defined in: backend/src/generated/prisma/index.d.ts:925

#### Default

```ts
"colorless"
```

***

### log?

> `optional` **log**: ([`LogLevel`](../type-aliases/LogLevel.md) \| [`LogDefinition`](../type-aliases/LogDefinition.md))[]

Defined in: backend/src/generated/prisma/index.d.ts:950

#### Example

```
// Shorthand for `emit: 'stdout'`
log: ['query', 'info', 'warn', 'error']

// Emit as events only
log: [
  { emit: 'event', level: 'query' },
  { emit: 'event', level: 'info' },
  { emit: 'event', level: 'warn' }
  { emit: 'event', level: 'error' }
]

/ Emit as events and log to stdout
og: [
 { emit: 'stdout', level: 'query' },
 { emit: 'stdout', level: 'info' },
 { emit: 'stdout', level: 'warn' }
 { emit: 'stdout', level: 'error' }

```
Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).

***

### omit?

> `optional` **omit**: [`GlobalOmitConfig`](../type-aliases/GlobalOmitConfig.md)

Defined in: backend/src/generated/prisma/index.d.ts:975

Global configuration for omitting model fields by default.

#### Example

```
const prisma = new PrismaClient({
  omit: {
    user: {
      password: true
    }
  }
})
```

***

### transactionOptions?

> `optional` **transactionOptions**: `object`

Defined in: backend/src/generated/prisma/index.d.ts:956

The default values for transactionOptions
maxWait ?= 2000
timeout ?= 5000

#### isolationLevel?

> `optional` **isolationLevel**: [`TransactionIsolationLevel`](../type-aliases/TransactionIsolationLevel.md)

#### maxWait?

> `optional` **maxWait**: `number`

#### timeout?

> `optional` **timeout**: `number`
