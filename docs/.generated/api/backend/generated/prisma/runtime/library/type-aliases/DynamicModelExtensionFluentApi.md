[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / DynamicModelExtensionFluentApi

# Type Alias: DynamicModelExtensionFluentApi\<TypeMap, M, P, Null\>

> **DynamicModelExtensionFluentApi**\<`TypeMap`, `M`, `P`, `Null`\> = \{ \[K in keyof TypeMap\["model"\]\[M\]\["payload"\]\["objects"\]\]: (args?: Exact\<A, Path\<TypeMap\["model"\]\[M\]\["operations"\]\[P\]\["args"\]\["select"\], \[K\]\>\>) =\> PrismaPromise\<Path\<DynamicModelExtensionFnResultBase\<TypeMap, M, \{ select: \{ \[P in K\]: A \} \}, P\>, \[K\]\> \| Null\> & DynamicModelExtensionFluentApi\<TypeMap, ((...)\[(...)\]\["payload"\]\["objects"\]\[K\] & \{\})\["name"\], P, Null \| Select\<(...)\[(...)\]\[M\]\["payload"\]\["objects"\]\[K\], null\>\> \}

Defined in: backend/src/generated/prisma/runtime/library.d.ts:925

## Type Parameters

### TypeMap

`TypeMap` *extends* [`TypeMapDef`](TypeMapDef.md)

### M

`M` *extends* `PropertyKey`

### P

`P` *extends* `PropertyKey`

### Null

`Null`
