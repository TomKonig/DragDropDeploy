[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / AllModelsToStringIndex

# Type Alias: AllModelsToStringIndex\<TypeMap, Args, K\>

> **AllModelsToStringIndex**\<`TypeMap`, `Args`, `K`\> = `Args` *extends* `{ [P in K]: { $allModels: infer AllModels } }` ? `{ [P in K]: Record<TypeMap["meta"]["modelProps"], AllModels> }` : `object`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:64

## Type Parameters

### TypeMap

`TypeMap` *extends* [`TypeMapDef`](TypeMapDef.md)

### Args

`Args` *extends* `Record`\<`string`, `any`\>

### K

`K` *extends* `PropertyKey`
