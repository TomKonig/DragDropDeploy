[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / GetAggregateResult

# Type Alias: GetAggregateResult\<P, A\>

> **GetAggregateResult**\<`P`, `A`\> = \{ \[K in keyof A as K extends Aggregate ? K : never\]: K extends "\_count" ? A\[K\] extends true ? number : Count\<A\[K\]\> : \{ \[J in keyof A\[K\] & string\]: P\["scalars"\]\[J\] \| null \} \}

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1469

## Type Parameters

### P

`P` *extends* [`OperationPayload`](OperationPayload.md)

### A

`A`
