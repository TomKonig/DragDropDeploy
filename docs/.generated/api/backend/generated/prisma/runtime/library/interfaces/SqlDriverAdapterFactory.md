[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / SqlDriverAdapterFactory

# Interface: SqlDriverAdapterFactory

Defined in: backend/src/generated/prisma/runtime/library.d.ts:3678

## Extends

- `DriverAdapterFactory`\<`SqlQuery`, `SqlResultSet`\>

## Properties

### adapterName

> `readonly` **adapterName**: `"@prisma/adapter-planetscale"` \| `"@prisma/adapter-neon"` \| `"@prisma/adapter-libsql"` \| `"@prisma/adapter-better-sqlite3"` \| `"@prisma/adapter-d1"` \| `"@prisma/adapter-pg"` \| `"@prisma/adapter-mssql"` \| `"@prisma/adapter-mariadb"` \| `string` & `object`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:59

#### Inherited from

`DriverAdapterFactory.adapterName`

***

### provider

> `readonly` **provider**: `Provider`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:58

#### Inherited from

`DriverAdapterFactory.provider`

## Methods

### connect()

> **connect**(): `Promise`\<`SqlDriverAdapter`\>

Defined in: backend/src/generated/prisma/runtime/library.d.ts:3679

Instantiate a driver adapter.

#### Returns

`Promise`\<`SqlDriverAdapter`\>

#### Overrides

`DriverAdapterFactory.connect`
