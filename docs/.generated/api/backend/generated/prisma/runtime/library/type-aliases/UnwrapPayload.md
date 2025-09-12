[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / UnwrapPayload

# Type Alias: UnwrapPayload\<P\>

> **UnwrapPayload**\<`P`\> = `object` *extends* `P` ? `unknown` : \{ \[K in keyof P\]: P\[K\] extends \{ composites: infer C; scalars: infer S \}\[\] ? (S & UnwrapPayload\<C\>)\[\] : P\[K\] extends \{ composites: infer C; scalars: infer S \} \| null ? S & UnwrapPayload\<C\> \| Select\<P\[K\], null\> : never \}

Defined in: backend/src/generated/prisma/runtime/library.d.ts:3863

## Type Parameters

### P

`P`
