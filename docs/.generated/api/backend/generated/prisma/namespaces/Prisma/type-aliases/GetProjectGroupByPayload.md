[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma](../../../README.md) / [Prisma](../README.md) / GetProjectGroupByPayload

# Type Alias: GetProjectGroupByPayload\<T\>

> **GetProjectGroupByPayload**\<`T`\> = [`PrismaPromise`](PrismaPromise.md)\<[`PickEnumerable`](PickEnumerable.md)\<[`ProjectGroupByOutputType`](ProjectGroupByOutputType.md), `T`\[`"by"`\]\> & `{ [P in keyof T & keyof ProjectGroupByOutputType]: P extends "_count" ? T[P] extends boolean ? number : GetScalarType<T[P], ProjectGroupByOutputType[P]> : GetScalarType<T[P], ProjectGroupByOutputType[P]> }`[]\>

Defined in: backend/src/generated/prisma/index.d.ts:2386

## Type Parameters

### T

`T` *extends* [`ProjectGroupByArgs`](ProjectGroupByArgs.md)
