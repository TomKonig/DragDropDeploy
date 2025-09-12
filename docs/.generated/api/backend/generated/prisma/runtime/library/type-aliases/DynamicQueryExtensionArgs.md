[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / DynamicQueryExtensionArgs

# Type Alias: DynamicQueryExtensionArgs\<Q_, TypeMap\>

> **DynamicQueryExtensionArgs**\<`Q_`, `TypeMap`\> = \{ \[K in keyof Q\_\]: K extends "$allOperations" ? (args: \{ args: any; model?: string; operation: string; query: (args: any) =\> PrismaPromise\<any\> \}) =\> Promise\<any\> : K extends "$allModels" ? \{ \[P in keyof Q\_\[K\] \| keyof TypeMap\["model"\]\[keyof TypeMap\["model"\]\]\["operations"\] \| "$allOperations"\]?: P extends "$allOperations" ? DynamicQueryExtensionCb\<TypeMap, "model", keyof TypeMap\["model"\], keyof TypeMap\["model"\]\[keyof (...)\[(...)\]\]\["operations"\]\> : P extends keyof TypeMap\["model"\]\[keyof (...)\[(...)\]\]\["operations"\] ? DynamicQueryExtensionCb\<TypeMap, "model", keyof TypeMap\["model"\], P\> : never \} : K extends TypeMap\["meta"\]\["modelProps"\] ? \{ \[P in keyof Q\_\[K\] \| keyof TypeMap\["model"\]\[ModelKey\<TypeMap, K\>\]\["operations"\] \| "$allOperations"\]?: P extends "$allOperations" ? DynamicQueryExtensionCb\<TypeMap, "model", ModelKey\<TypeMap, K\>, keyof (...)\[(...)\]\[ModelKey\<(...), (...)\>\]\["operations"\]\> : P extends keyof (...)\[(...)\]\[ModelKey\<(...), (...)\>\]\["operations"\] ? DynamicQueryExtensionCb\<TypeMap, "model", ModelKey\<TypeMap, K\>, P\> : never \} : K extends keyof TypeMap\["other"\]\["operations"\] ? DynamicQueryExtensionCb\<\[TypeMap\], 0, "other", K\> : never \}

Defined in: backend/src/generated/prisma/runtime/library.d.ts:954

Query

## Type Parameters

### Q_

`Q_`

### TypeMap

`TypeMap` *extends* [`TypeMapDef`](TypeMapDef.md)
