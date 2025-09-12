[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / SelectField

# Type Alias: SelectField\<P, K\>

> **SelectField**\<`P`, `K`\> = `P` *extends* `object` ? `P`\[`"objects"`\]\[`K`\] : `P` *extends* `object` ? `P`\[`"composites"`\]\[`K`\] : `never`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:3357

## Type Parameters

### P

`P` *extends* [`SelectablePayloadFields`](SelectablePayloadFields.md)\<`any`, `any`\>

### K

`K` *extends* `PropertyKey`
