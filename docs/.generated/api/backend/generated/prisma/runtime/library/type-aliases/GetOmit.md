[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / GetOmit

# Type Alias: GetOmit\<BaseKeys, R, ExtraType\>

> **GetOmit**\<`BaseKeys`, `R`, `ExtraType`\> = \{ \[K in (string extends keyof R ? never : keyof R) \| BaseKeys\]?: boolean \| ExtraType \}

Defined in: backend/src/generated/prisma/runtime/library.d.ts:1513

## Type Parameters

### BaseKeys

`BaseKeys` *extends* `string`

### R

`R` *extends* [`InternalArgs`](InternalArgs.md)\[`"result"`\]\[`string`\]

### ExtraType

`ExtraType` = `never`
