[**@dragdropdeploy/backend**](../../../../../README.md)

***

[@dragdropdeploy/backend](../../../../../README.md) / [generated/prisma/runtime/library](../README.md) / PayloadToResult

# Type Alias: PayloadToResult\<P, O\>

> **PayloadToResult**\<`P`, `O`\> = `{ [K in keyof O]?: O[K][K] extends any[] ? PayloadToResult<O[K][K][number]>[] : O[K][K] extends object ? PayloadToResult<O[K][K]> : O[K][K] }`

Defined in: backend/src/generated/prisma/runtime/library.d.ts:2594

## Type Parameters

### P

`P`

### O

`O` *extends* [`Record`](Record.md)\<`any`, `any`\> = [`RenameAndNestPayloadKeys`](RenameAndNestPayloadKeys.md)\<`P`\>
