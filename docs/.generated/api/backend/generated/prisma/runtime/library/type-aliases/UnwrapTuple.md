[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / UnwrapTuple

# Type Alias: UnwrapTuple\<Tuple\>

> **UnwrapTuple**\<`Tuple`\> = `` { [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]> } ``

Defined in: backend/src/generated/prisma/runtime/library.d.ts:3875

## Type Parameters

### Tuple

`Tuple` *extends* readonly `unknown`[]
