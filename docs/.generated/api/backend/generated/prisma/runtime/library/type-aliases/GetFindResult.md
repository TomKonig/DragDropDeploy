[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / GetFindResult

# Type Alias: GetFindResult\<P, A, GlobalOmitOptions\>

> **GetFindResult**\<`P`, `A`, `GlobalOmitOptions`\> = [`Equals`](Equals.md)\<`A`, `any`\> *extends* `1` ? [`DefaultSelection`](DefaultSelection.md)\<`P`, `A`, `GlobalOmitOptions`\> : `A` *extends* `object` & `Record`\<`string`, `unknown`\> \| `object` & `Record`\<`string`, `unknown`\> ? \{ \[K in keyof S \| keyof I as (S & I)\[K\] extends false \| undefined \| Skip \| null ? never : K\]: (S & I)\[K\] extends object ? P extends SelectablePayloadFields\<K, (infer O)\[\]\> ? O extends OperationPayload ? GetFindResult\<O, (...)\[K\], GlobalOmitOptions\>\[\] : never : P extends SelectablePayloadFields\<K, infer O \| null\> ? O extends OperationPayload ? GetFindResult\<O, (...)\[(...)\], GlobalOmitOptions\> \| SelectField\<(...), (...)\> & null : never : K extends "\_count" ? Count\<GetFindResult\<P, (...)\[(...)\], GlobalOmitOptions\>\> : never : P extends SelectablePayloadFields\<K, (infer O)\[\]\> ? O extends OperationPayload ? DefaultSelection\<O, \{\}, GlobalOmitOptions\>\[\] : never : P extends SelectablePayloadFields\<K, infer O \| null\> ? O extends OperationPayload ? DefaultSelection\<O, \{\}, GlobalOmitOptions\> \| SelectField\<(...), (...)\> & null : never : P extends \{ scalars: \{ \[k in K\]: infer O \} \} ? O : K extends "\_count" ? Count\<(...)\[(...)\]\> : never \} & `A` *extends* `object` & `Record`\<`string`, `unknown`\> ? [`DefaultSelection`](DefaultSelection.md)\<`P`, `A` & `object`, `GlobalOmitOptions`\> : `unknown` : [`DefaultSelection`](DefaultSelection.md)\<`P`, `A`, `GlobalOmitOptions`\>

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1487

## Type Parameters

### P

`P` *extends* [`OperationPayload`](OperationPayload.md)

### A

`A`

### GlobalOmitOptions

`GlobalOmitOptions`
