[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / Result

# Type Alias: Result\<T, A, F\>

> **Result**\<`T`, `A`, `F`\> = `T` *extends* `object` ? [`GetResult`](GetResult.md)\<`T`\[`symbol`\]\[`"types"`\]\[`"payload"`\], `A`, `F`\> : [`GetResult`](GetResult.md)\<\{ `composites`: \{ \}; `name`: `""`; `objects`: \{ \}; `scalars`: \{ \}; \}, \{ \}, `F`\>

Defined in: backend/src/generated/prisma/runtime/library.d.ts:3209

## Type Parameters

### T

`T`

### A

`A`

### F

`F` *extends* [`Operation`](Operation.md)
