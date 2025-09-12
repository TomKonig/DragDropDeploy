[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / GetPrismaClientConfig

# Type Alias: GetPrismaClientConfig

> **GetPrismaClientConfig** = `object`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1667

Config that is stored into the generated client. When the generated client is
loaded, this same config is passed to [getPrismaClient](../functions/getPrismaClient.md) which creates a
closure with that config around a non-instantiated [[PrismaClient]].

## Properties

### activeProvider

> **activeProvider**: `ActiveConnectorType`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1679

***

### ciName?

> `optional` **ciName**: `string`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1721

Information about the CI where the Prisma Client has been generated. The
name of the CI environment is stored at generation time because CI
information is not always available at runtime. Moreover, the edge client
has no notion of environment variables, so this works around that.

#### Remarks

used to error for Vercel/Netlify for schema caching issues

***

### clientVersion

> **clientVersion**: `string`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1676

***

### compilerWasm?

> `optional` **compilerWasm**: `CompilerWasmLoadingConfig`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1737

***

### copyEngine?

> `optional` **copyEngine**: `boolean`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1732

A boolean that is `false` when the client was generated with --no-engine. At
runtime, this means the client will be bound to be using the Data Proxy.

***

### datasourceNames

> **datasourceNames**: `string`[]

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1678

***

### dirname

> **dirname**: `string`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1675

***

### engineVersion

> **engineVersion**: `string`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1677

***

### engineWasm?

> `optional` **engineWasm**: `EngineWasmLoadingConfig`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1736

Optional wasm loading configuration

***

### generator?

> `optional` **generator**: `GeneratorConfig`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1669

***

### injectableEdgeEnv()?

> `optional` **injectableEdgeEnv**: () => `LoadedEnv`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1691

A special env object just for the data proxy edge runtime.
Allows bundlers to inject their own env variables (Vercel).
Allows platforms to declare global variables as env (Workers).

#### Returns

`LoadedEnv`

#### Remarks

only used for the purpose of data proxy

***

### inlineDatasources

> **inlineDatasources**: `{ [name in string]: { url: EnvValue } }`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1698

The contents of the datasource url saved in a string.
This can either be an env var name or connection string.
It is needed by the client to connect to the Data Proxy.

#### Remarks

only used for the purpose of data proxy

***

### inlineSchema

> **inlineSchema**: `string`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1684

The contents of the schema encoded into a string

#### Remarks

only used for the purpose of data proxy

***

### inlineSchemaHash

> **inlineSchemaHash**: `string`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1707

The string hash that was produced for a given schema

#### Remarks

only used for the purpose of data proxy

***

### isBundled?

> `optional` **isBundled**: `boolean`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1727

Information about whether we have not found a schema.prisma file in the
default location, and that we fell back to finding the schema.prisma file
in the current working directory. This usually means it has been bundled.

***

### postinstall?

> `optional` **postinstall**: `boolean`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1713

A marker to indicate that the client was not generated via `prisma
generate` but was generated via `generate --postinstall` script instead.

#### Remarks

used to error for Vercel/Netlify for schema caching issues

***

### relativeEnvPaths?

> `optional` **relativeEnvPaths**: `object`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1670

#### rootEnvPath?

> `optional` **rootEnvPath**: `string` \| `null`

#### schemaEnvPath?

> `optional` **schemaEnvPath**: `string` \| `null`

***

### relativePath

> **relativePath**: `string`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1674

***

### runtimeDataModel

> **runtimeDataModel**: [`RuntimeDataModel`](RuntimeDataModel.md)

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1668
