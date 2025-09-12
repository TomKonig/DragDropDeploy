[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / ApplyOmit

# Type Alias: ApplyOmit\<T, OmitConfig\>

> **ApplyOmit**\<`T`, `OmitConfig`\> = [`Compute`](Compute.md)\<`{ [K in keyof T as OmitValue<OmitConfig, K> extends true ? never : K]: T[K] }`\>

Defined in: backend/src/generated/prisma/runtime/library.d.ts:76

## Type Parameters

### T

`T`

### OmitConfig

`OmitConfig`
