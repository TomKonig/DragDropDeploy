[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / GetGroupByResult

# Type Alias: GetGroupByResult\<P, A\>

> **GetGroupByResult**\<`P`, `A`\> = `A` *extends* `object` ? [`GetAggregateResult`](GetAggregateResult.md)\<`P`, `A`\> & `{ [K in A["by"][number]]: P["scalars"][K] }`[] : `A` *extends* `object` ? [`GetAggregateResult`](GetAggregateResult.md)\<`P`, `A`\> & `{ [K in A["by"]]: P["scalars"][K] }`[] : `object`[]

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1503

## Type Parameters

### P

`P` *extends* [`OperationPayload`](OperationPayload.md)

### A

`A`
