[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / RenameAndNestPayloadKeys

# Type Alias: RenameAndNestPayloadKeys\<P\>

> **RenameAndNestPayloadKeys**\<`P`\> = \{ \[K in keyof P as K extends "scalars" \| "objects" \| "composites" ? keyof P\[K\] : never\]: P\[K\] \}

Defined in: backend/src/generated/prisma/runtime/library.d.ts:3127

## Type Parameters

### P

`P`
