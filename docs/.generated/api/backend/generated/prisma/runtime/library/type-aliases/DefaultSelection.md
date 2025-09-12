[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / DefaultSelection

# Type Alias: DefaultSelection\<Payload, Args, GlobalOmitOptions\>

> **DefaultSelection**\<`Payload`, `Args`, `GlobalOmitOptions`\> = `Args` *extends* `object` ? [`ApplyOmit`](ApplyOmit.md)\<[`UnwrapPayload`](UnwrapPayload.md)\<\{ `default`: `Payload`; \}\>\[`"default"`\], [`PatchFlat`](PatchFlat.md)\<`LocalOmit`, [`ExtractGlobalOmit`](ExtractGlobalOmit.md)\<`GlobalOmitOptions`, `Uncapitalize`\<`Payload`\[`"name"`\]\>\>\>\> : [`ApplyOmit`](ApplyOmit.md)\<[`UnwrapPayload`](UnwrapPayload.md)\<\{ `default`: `Payload`; \}\>\[`"default"`\], [`ExtractGlobalOmit`](ExtractGlobalOmit.md)\<`GlobalOmitOptions`, `Uncapitalize`\<`Payload`\[`"name"`\]\>\>\>

Defined in: backend/src/generated/prisma/runtime/library.d.ts:708

## Type Parameters

### Payload

`Payload` *extends* [`OperationPayload`](OperationPayload.md)

### Args

`Args` = \{ \}

### GlobalOmitOptions

`GlobalOmitOptions` = \{ \}
