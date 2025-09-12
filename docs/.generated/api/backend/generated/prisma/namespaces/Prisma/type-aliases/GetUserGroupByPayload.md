[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / GetUserGroupByPayload

# Type Alias: GetUserGroupByPayload\<T\>

> **GetUserGroupByPayload**\<`T`\> = [`PrismaPromise`](PrismaPromise.md)\<[`PickEnumerable`](PickEnumerable.md)\<[`UserGroupByOutputType`](UserGroupByOutputType.md), `T`\[`"by"`\]\> & `{ [P in keyof T & keyof UserGroupByOutputType]: P extends "_count" ? T[P] extends boolean ? number : GetScalarType<T[P], UserGroupByOutputType[P]> : GetScalarType<T[P], UserGroupByOutputType[P]> }`[]\>

Defined in: backend/src/generated/prisma/index.d.ts:1282

## Type Parameters

### T

`T` *extends* [`UserGroupByArgs`](UserGroupByArgs.md)
